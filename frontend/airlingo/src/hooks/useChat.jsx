/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import stomp from "stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { postCreateChatRoom } from "@/api";
import { selectUser } from "@/features/User/UserSlice";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";
import useRouter from "./useRouter";

function useChat() {
    const { routeTo } = useRouter();
    const { VITE_CHAT_SOCKET_URL } = import.meta.env;
    const stompCilent = useRef({});
    const [message, setMessage] = useState("");
    const [chatMessage, setChatMessages] = useState([]);
    const { sessionId } = useSelector(selectMeeting);
    const { userNickname, userImgUrl } = useSelector(selectUser);

    /* ------------------ chat ------------------ */
    function onConnected() {
        console.log(`개인 구독 !!${sessionId}`);
        // user 개인 구독
        stompCilent.current.subscribe(`/sub/chat/room/${sessionId}`, function (curMessage) {
            setChatMessages((curMessages) => [...curMessages, JSON.parse(curMessage.body)]);
            console.log(curMessage.body);
        });
    }

    function connect() {
        const socket = new SockJS(VITE_CHAT_SOCKET_URL);
        stompCilent.current = stomp.over(socket);
        console.log(stompCilent);
        console.log(stompCilent.current);
        stompCilent.current.connect({}, () => {
            setTimeout(function () {
                onConnected();
            }, 500);
        });
        console.log(stompCilent.current.connected);
    }

    const ChangeMessages = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        await stompCilent.current.send(
            "/pub/chat/message",
            {},
            JSON.stringify({
                roomId: sessionId,
                userNickname,
                content: message,
                userImgUrl,
            }),
        );
        setMessage("");
    };

    const createChatRoom = async () => {
        await postCreateChatRoom({
            responseFunc: {
                200: (response) => {
                    console.log("채팅방 생성 성공!");
                    console.log(response.data);
                },
                400: () => {
                    console.log("실패!");
                },
            },
            data: sessionId,
            routeTo,
        });

        connect();
    };

    useEffect(() => {
        createChatRoom();
    }, []);

    return { message, sendMessage, chatMessage, ChangeMessages };
}

export default useChat;
