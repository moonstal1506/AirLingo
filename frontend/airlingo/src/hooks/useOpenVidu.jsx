/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import { useDispatch, useSelector } from "react-redux";
import { addChatList, selectMeeting } from "@/features/Meeting/MeetingSlice";
import { selectUser } from "@/features/User/UserSlice";
import languageCodeConfig from "@/config/languageCodeConfig";

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

    const dispatch = useDispatch();
    const { userNickname } = useSelector(selectUser);
    const { myData } = useSelector(selectMeeting);

    async function joinSession() {
        const cameraSession = OV.current.initSession();
        const screenSession = shareOV.current.initSession();
        cameraSession.on("streamCreated", (event) => {
            if (event.stream.typeOfVideo === "CAMERA") {
                const subscriber = cameraSession.subscribe(event.stream, undefined);
                setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
                cameraSession.subscribeToSpeechToText(
                    event.stream,
                    languageCodeConfig.find((cur) => cur.languageId === myData.userStudyLanguageId)
                        .languageCode,
                );
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

        cameraSession.on("speechToTextMessage", (event) => {
            const currentUserNickname = JSON.parse(event.connection.data).clientData;
            if (event.reason === "recognized") {
                dispatch(
                    addChatList({
                        chat: {
                            isMe: currentUserNickname === userNickname,
                            text: event.text,
                        },
                    }),
                );
            }
        });

        cameraSession.on("streamDestroyed", (event) => {
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
