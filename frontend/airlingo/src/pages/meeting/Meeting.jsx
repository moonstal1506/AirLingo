/* eslint-disable jsx-a11y/media-has-caption */
// import PropTypes from "prop-types";
import styled from "@emotion/styled";
// import { ScriptSlideMenu } from "@/components/common/slideMenu";
import { useEffect, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import theme from "@/assets/styles/Theme";
import { FabButton } from "@/components/common/button";
import * as Icons from "@/assets/imgs/icons";

// ----------------------------------------------------------------------------------------------------

const { primary1 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function Meeting() {
    // const [sessionId, setSessionId] = useState("SessionA");
    const [session, setSession] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [isActiveMic, setIsActiveMic] = useState(false);
    const [isActiveVideo, setIsActiveVideo] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        const TOKEN = "ws://localhost:4443?sessionId=ses_NPLONj8Vp3&token=tok_EkUbx3XJKihShd3o";

        const OV = new OpenVidu();
        const curSession = OV.initSession();
        setSession(curSession);

        curSession.on("streamCreated", (event) => {
            const subscriber = session.subscribe(event.stream, undefined);
            setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
        });

        curSession.on("streamDestroyed", (event) => {
            setSubscribers((prevSubscribers) =>
                prevSubscribers.filter((sub) => sub.stream.streamId !== event.stream.streamId),
            );
        });

        curSession.on("exception", () => {
            // console.warn(exception);
        });

        curSession
            .connect(TOKEN, {
                clientData: "Crassula",
            })
            .then(() => {
                setPublisher(
                    OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: undefined,
                        publishAudio: true,
                        publishVideo: true,
                        resolution: "1280x720",
                        frameRate: 60,
                        insertMode: "APPEND",
                        mirror: "false",
                    }),
                );
            })
            .catch(() => {
                // console.error("Error Connecting to OpenVidu", error);
            });

        return () => {
            if (session) session.disconnect();
        };
    }, [subscribers, publisher, session]);

    const handleMicClick = () => {
        setIsActiveMic((prevState) => !prevState);
        console.log("Microphone");
    };

    const handleVideoClick = () => {
        setIsActiveVideo((prevState) => !prevState);
        console.log("Video");
    };

    const handleChatClick = () => {
        setActiveButton((prevButtonName) => {
            if (prevButtonName === "Chat") return null;
            return "Chat";
        });
        console.log("Chat");
    };

    const handleBoardClick = () => {
        setActiveButton((prevButtonName) => {
            if (prevButtonName === "Board") return null;
            return "Board";
        });
        console.log("Board");
    };

    const handleShareClick = () => {
        setActiveButton((prevButtonName) => {
            if (prevButtonName === "Share") return null;
            return "Share";
        });
        console.log("Share");
    };

    const handleCardClick = () => {
        setActiveButton((prevButtonName) => {
            if (prevButtonName === "Card") return null;
            return "Card";
        });
        console.log("Card");
    };

    const handleReportClick = () => {
        setActiveButton((prevButtonName) => {
            if (prevButtonName === "Report") return null;
            return "Report";
        });
        console.log("Report");
    };

    const handleExitClick = () => {
        setActiveButton((prevButtonName) => {
            if (prevButtonName === "Exit") return null;
            return "Exit";
        });
        console.log("Exit");
    };

    const buttonList = [
        {
            buttonName: "Microphone",
            icon: isActiveMic ? Icons.MicOffIcon : Icons.MicOnIcon,
            onClick: handleMicClick,
            category: isActiveMic ? "active" : "white",
            iconColor: isActiveMic ? "white" : "black",
        },
        {
            buttonName: "Video",
            icon: isActiveVideo ? Icons.VideoOffIcon : Icons.VideoOnIcon,
            onClick: handleVideoClick,
            category: isActiveVideo ? "active" : "white",
            iconColor: isActiveVideo ? "white" : "black",
        },
        {
            buttonName: "Chat",
            icon: Icons.ChatIcon,
            onClick: handleChatClick,
            category: activeButton === "Chat" ? "active" : "white",
            iconColor: activeButton === "Chat" ? "white" : "black",
        },
        {
            buttonName: "Board",
            icon: Icons.BoardIcon,
            onClick: handleBoardClick,
            category: activeButton === "Board" ? "active" : "white",
            iconColor: activeButton === "Board" ? "white" : "black",
        },
        {
            buttonName: "Share",
            icon: Icons.ShareIcon,
            onClick: handleShareClick,
            category: activeButton === "Share" ? "active" : "white",
            iconColor: activeButton === "Share" ? "white" : "black",
        },
        {
            buttonName: "Card",
            icon: Icons.CardIcon,
            onClick: handleCardClick,
            category: activeButton === "Card" ? "active" : "white",
            iconColor: activeButton === "Card" ? "white" : "black",
        },
        {
            buttonName: "Report",
            icon: Icons.ReportIcon,
            onClick: handleReportClick,
            category: activeButton === "Report" ? "active" : "red",
            iconColor: "white",
        },
        {
            buttonName: "Exit",
            icon: Icons.ExitIcon,
            onClick: handleExitClick,
            category: activeButton === "Exit" ? "active" : "red",
            iconColor: "white",
        },
    ];

    return (
        <MeetingContainer>
            <VideoContainer>
                <VideoFrame>
                    {publisher ? (
                        <video
                            ref={(node) => node && publisher.addVideoElement(node)}
                            autoPlay
                            width="500px"
                        />
                    ) : (
                        "카메라 로딩 중..."
                    )}
                </VideoFrame>
                <VideoFrame>
                    {publisher ? (
                        <video
                            ref={(node) => node && publisher.addVideoElement(node)}
                            autoPlay
                            width="500px"
                            height="100%"
                        />
                    ) : (
                        "카메라 로딩 중..."
                    )}
                </VideoFrame>
                {subscribers.map((subscriber) => (
                    <VideoFrame key={subscriber.stream.streamId}>
                        <video
                            ref={(node) => node && subscriber.addVideoElement(node)}
                            autoPlay
                            width="500px"
                        />
                    </VideoFrame>
                ))}
            </VideoContainer>
            <ButtonMenu>
                {buttonList.map(({ buttonName, icon, onClick, category, iconColor }) => (
                    <FabButton
                        key={buttonName}
                        icon={icon}
                        onClick={onClick}
                        category={category}
                        iconColor={iconColor}
                    />
                ))}
            </ButtonMenu>
        </MeetingContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

const MeetingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${primary1};
`;

const VideoContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 20px;
`;

const VideoFrame = styled.div`
    width: 500px;
`;

const ButtonMenu = styled.div`
    height: fit-content;
    position: fixed;
    bottom: 0;
    margin-bottom: 20px;
    display: flex;
    flex-shrink: 0;
    gap: 20px;
`;

// ----------------------------------------------------------------------------------------------------

export default Meeting;
