/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { OpenVidu } from "openvidu-browser";

const useOpenVidu = () => {
    const OV = useRef(new OpenVidu());
    const [session, setSession] = useState(null); // Initial value changed to null
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);

    async function joinSession() {
        const curSession = OV.current.initSession();

        curSession.on("streamCreated", (event) => {
            const subscriber = curSession.subscribe(event.stream, undefined);
            setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
            curSession.subscribeToSpeechToText(event.stream, "ko-KR");
        });

        curSession.on("speechToTextMessage", (event) => {
            console.log(`STT ${event}`);
            console.log(`커넥션 아이디 : ${event.connection.connectionId}`);
            if (event.reason === "recognizing") {
                console.log(`User ${event.connection.connectionId} is speaking: ${event.text}`);
            } else if (event.reason === "recognized") {
                console.log(`User ${event.connection.connectionId} spoke: ${event.text}`);
            }
        });

        curSession.on("streamDestroyed", (event) => {
            console.log("스트림 삭제 이벤트", subscribers, event.stream.streamId);
            setSubscribers((prevSubscribers) =>
                prevSubscribers.filter((sub) => sub.stream.streamId !== event.stream.streamId),
            );
        });

        curSession.on("exception", (exception) => {
            console.warn(exception);
        });

        setSession(curSession);
    }

    useEffect(() => {
        joinSession();
        return () => {
            if (session) session.disconnect();
        };
    }, []);

    return {
        OV,
        session,
        setSession,
        publisher,
        setPublisher,
        subscribers,
        setSubscribers,
    };
};

export default useOpenVidu;
