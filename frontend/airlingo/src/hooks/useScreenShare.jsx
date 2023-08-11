/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { OpenVidu } from "openvidu-browser";

// ----------------------------------------------------------------------------------------------------

const useScreenShare = () => {
    const screenOV = useRef(new OpenVidu());
    const [screenSession, setScreenSession] = useState(null); // Initial value changed to null
    const [screenPublisher, setScreenPublisher] = useState(null);
    const [screenSubscribers, setScreenSubscribers] = useState([]);

    async function joinSession() {
        const curSession = screenOV.current.initSession();
        curSession.on("streamCreated", (event) => {
            const screenSubscriber = curSession.subscribe(event.stream, undefined);
            setScreenSubscribers((prevScreenSubscribers) => [
                ...prevScreenSubscribers,
                screenSubscriber,
            ]);
        });
        curSession.on("streamDestroyed", (event) => {
            console.log("스트림 삭제 이벤트", screenSubscribers, event.stream.streamId);
            setScreenSubscribers((prevScreenSubscribers) =>
                prevScreenSubscribers.filter(
                    (sub) => sub.stream.streamId !== event.stream.streamId,
                ),
            );
        });
        curSession.on("exception", (exception) => {
            console.warn(exception);
        });
        setScreenSession(curSession);
    }
    useEffect(() => {
        joinSession();
        return () => {
            if (screenSession) screenSession.disconnect();
        };
    }, []);

    return {
        screenOV,
        screenSession,
        setScreenSession,
        screenPublisher,
        setScreenPublisher,
        screenSubscribers,
        setScreenSubscribers,
    };
};

// ----------------------------------------------------------------------------------------------------

export default useScreenShare;
