/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import { useSelector } from "react-redux";
import { ScriptSlideMenu } from "@/components/common/slideMenu";
import theme from "@/assets/styles/Theme";
import { FabButton } from "@/components/common/button";
import * as Icons from "@/assets/imgs/icons";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";
import { useRouter } from "@/hooks";

// ----------------------------------------------------------------------------------------------------

const { primary1 } = theme.colors;
const contentGroupData = [
    { Content: () => <div>Content1</div>, Icon: Icons.ScriptIcon },
    { Content: () => <div>Content2</div>, Icon: Icons.DictionaryIcon },
    { Content: () => <div>Content3</div>, Icon: Icons.TranslatorIcon },
];

// ----------------------------------------------------------------------------------------------------

function Meeting() {
    const [session, setSession] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [topic, setTopic] = useState("프리토킹");
    const [isActiveMic, setIsActiveMic] = useState(false);
    const [isActiveVideo, setIsActiveVideo] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [isActiveSlide, setIsActiveSlide] = useState(false);
    const { openViduToken } = useSelector(selectMeeting);
    const { routeTo } = useRouter();

    console.log(setTopic);
    useEffect(() => {
        if (!openViduToken) routeTo("/");
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

        curSession.on("exception", (exception) => {
            console.warn(exception);
        });

        curSession
            .connect(openViduToken, {
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
            .catch((error) => {
                console.error("Error Connecting to OpenVidu", error);
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

    const handleClickSlideButton = () => {
        setIsActiveSlide((prev) => !prev);
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
                        <PlacholderBox>카메라를 로딩하고 있습니다.</PlacholderBox>
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
                        <PlacholderBox>카메라를 로딩하고 있습니다.</PlacholderBox>
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
            <TopicContainer>
                <TopicHeader>현재 대화 주제</TopicHeader>
                <TopicContent>{topic}</TopicContent>
            </TopicContainer>
            <ButtonMenu isActiveSlide={isActiveSlide}>
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
            <ScriptSlideMenu
                contentGroup={contentGroupData}
                onClick={handleClickSlideButton}
                slideOpen={isActiveSlide}
            />
        </MeetingContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

const MeetingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: ${primary1};
    font-family: "Pretendard";
`;

const VideoContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    margin: 10px 0;
`;

const VideoFrame = styled.div`
    width: 500px;
`;

const PlacholderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    width: 500px;
    height: 281.25px;
    background-color: black;
    border-radius: 20px;
    color: white;
`;

const TopicContainer = styled.div`
    display: flex;
    width: 1010px;
    height: 300px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25) inset;
    gap: 5px;
`;

const TopicHeader = styled.div`
    font-weight: 300;
    font-size: 30px;
`;

const TopicContent = styled.div`
    font-weight: 700;
    font-size: 50px;
`;

const ButtonMenu = styled.div`
    height: fit-content;
    position: fixed;
    bottom: 0;
    right: ${({ isActiveSlide }) => (isActiveSlide ? "500px" : "300px")};
    transition: right 0.3s ease-in-out;
    margin-bottom: 20px;
    display: flex;
    flex-shrink: 0;
    gap: 20px;
    z-index: 1000;
`;

// ----------------------------------------------------------------------------------------------------

export default Meeting;
