/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { OpenVidu } from "openvidu-browser";

// ----------------------------------------------------------------------------------------------------

const useOpenVidu = () => {
    // 카메라
    const OV = useRef(new OpenVidu());
    const [session, setSession] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [subscribers, setSubscribers] = useState([]);

    // 화면 공유
    const shareOV = useRef(new OpenVidu());
    const [shareSession, setShareSession] = useState(null);
    const [sharePublisher, setSharePublisher] = useState(null);
    const [shareSubscribers, setShareSubscribers] = useState([]);

    async function joinSession() {
        const cameraSession = OV.current.initSession();
        const screenSession = shareOV.current.initSession();
        cameraSession.on("streamCreated", (event) => {
            if (event.stream.typeOfVideo === "CAMERA") {
                const subscriber = cameraSession.subscribe(event.stream, undefined);
                setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
                // curSession.subscribeToSpeechToText(event.stream, "ko-KR");
            }
        });

        screenSession.on("streamCreated", (event) => {
            if (event.stream.typeOfVideo === "SCREEN") {
                const screenSubscriber = screenSession.subscribe(event.stream, undefined);
                setShareSubscribers((prevShareSubscribers) => [
                    ...prevShareSubscribers,
                    screenSubscriber,
                ]);
            }
        });

        // curSession.on("speechToTextMessage", (event) => {
        //     console.log(`STT ${event}`);
        //     console.log(`커넥션 아이디 : ${event.connection.connectionId}`);
        //     if (event.reason === "recognizing") {
        //         console.log(`User ${event.connection.connectionId} is speaking: ${event.text}`);
        //     } else if (event.reason === "recognized") {
        //         console.log(`User ${event.connection.connectionId} spoke: ${event.text}`);
        //     }
        // });

        cameraSession.on("streamDestroyed", (event) => {
            console.log("스트림 삭제 이벤트", subscribers, event.stream.streamId);
            setSubscribers((prevSubscribers) =>
                prevSubscribers.filter((sub) => sub.stream.streamId !== event.stream.streamId),
            );
        });

        cameraSession.on("exception", (exception) => {
            console.warn(exception);
        });

        setSession(cameraSession);
        setShareSession(screenSession);
    }

    useEffect(() => {
        joinSession();
        return () => {
            if (session) session.disconnect();
            if (shareSession) shareSession.disconnect();
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
        shareOV,
        shareSession,
        setShareSession,
        sharePublisher,
        setSharePublisher,
        shareSubscribers,
        setShareSubscribers,
    };
};

// ----------------------------------------------------------------------------------------------------

export default useOpenVidu;
