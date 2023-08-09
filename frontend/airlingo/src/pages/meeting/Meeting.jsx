/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useOpenVidu, useChat } from "@/hooks";
import {
    getCard,
    postOpenviduToken,
    postEvaluate,
    postStartRecording,
    postStopRecording,
    postReport,
} from "@/api";
import theme from "@/assets/styles/Theme";
import * as Icons from "@/assets/icons";
import {
    CardModal,
    CardRequestModal,
    EvaluateModal,
    FeedbackRequestModal,
    FeedbackStartModal,
    ReportConfimModal,
    ReportModal,
    ResponseWaitModal,
} from "@/components/modal/meeting";
import ChatList from "@/components/chatList/ChatList";
import { ChatSlideMenu, ScriptSlideMenu } from "@/components/common/slideMenu";
import { TextButton, FabButton, SliderButton } from "@/components/common/button";
import {
    AddDidReport,
    AddMeetingData,
    selectMeeting,
    AddRecordingId,
    AddScriptData,
    removeRecordingId,
} from "@/features/Meeting/MeetingSlice";
import { selectUser } from "@/features/User/UserSlice";
import MeetingDictionary from "./MeetingDictionary";
import FreeTalk from "./FreeTalk";

// ----------------------------------------------------------------------------------------------------

const { primary1 } = theme.colors;
const contentGroupData = [
    { Content: () => <div>Content1</div>, Icon: Icons.ScriptIcon },
    {
        Content: () => <MeetingDictionary sourceLanguage={selectUser.userNativeLanguage} />,
        Icon: Icons.DictionaryIcon,
    },
    { Content: () => <div>Content3</div>, Icon: Icons.TranslatorIcon },
];

// ----------------------------------------------------------------------------------------------------

function Meeting() {
    // redux Area...
    const dispatch = useDispatch();
    const { sessionId, meetingData, didReport, otherUser, studyId, recordingId, screenMode } =
        useSelector(selectMeeting);
    const { userId, userNickname } = useSelector(selectUser);

    // hooks Area...
    const { routeTo } = useRouter();
    const { OV, session, publisher, setPublisher, subscribers } = useOpenVidu();
    const { message, sendMessage, chatMessage, ChangeMessages } = useChat();
    // Active States...
    const [activeButton, setActiveButton] = useState(null);
    const [isActiveMic, setIsActiveMic] = useState(false);
    const [isActiveVideo, setIsActiveVideo] = useState(false);
    const [isActiveSlide, setIsActiveSlide] = useState(false);
    const [isActiveChatSlide, setIsActiveChatSlide] = useState(false);

    // Modal States...
    const [openResponseWaitModal, setOpenResponseWaitModal] = useState(false);
    const [openCardModal, setOpenCardModal] = useState(false); // 카드 모달의 on/off
    const [openCardRequestModal, setOpenCardRequestModal] = useState(false); // 상대방이 선택한 대주제를 허용할지 묻는 모달 on/off
    const [openReportModal, setOpenReportModal] = useState(false); // 신고 모달의 on/off
    const [openReportConfirmModal, setOpenReportConfirmModal] = useState(false);
    const [openFeedbackStartModal, setOpenFeedbackStartModal] = useState(false);
    const [openFeedbackRequestModal, setOpenFeedbackRequestModal] = useState(false);
    const [openEvaluateModal, setOpenEvaluateModal] = useState(false);

    // Data States...
    const [requestCardCode, setRequestCardCode] = useState("");

    // 세션 연결 함수
    async function connectSession() {
        if (!session) return;
        const response = await postOpenviduToken({
            responseFunc: {
                200: () => console.log("get Token Success"),
                400: () => console.log("get Token Fail"),
            },
            data: { sessionId },
        });

        session
            .connect(response.data.data, {
                clientData: userNickname,
            })
            .then(async () => {
                const publisher = await OV.current.initPublisherAsync(undefined, {
                    audioSource: undefined,
                    videoSource: undefined,
                    publishAudio: true,
                    publishVideo: true,
                    resolution: "1280x720",
                    frameRate: 60,
                    insertMode: "APPEND",
                    mirror: "false",
                });
                session.publish(publisher);
                setPublisher(publisher);

                if (session) {
                    session.on("signal", (event) => {
                        const { data, type } = event;
                        const typeArr = type.split(":");
                        const processSignal = async () => {
                            switch (typeArr[1]) {
                                case "cardcode-select-request":
                                    setOpenCardRequestModal(true);
                                    setRequestCardCode(data);
                                    break;

                                case "cardcode-select-response":
                                    console.log("카드 선택에 대한 답을 받았다!", publisher);

                                    const jsonData = JSON.parse(data);
                                    if (jsonData.agree && publisher) {
                                        dispatch(
                                            AddMeetingData({
                                                meetingData: {
                                                    ...meetingData,
                                                    currentCardCode: jsonData.currentCardCode,
                                                    currentCard: jsonData.currentCard,
                                                },
                                            }),
                                        );

                                        console.log("OpenResponseWaitModal 닫기!!!", publisher);
                                        setOpenResponseWaitModal(false);

                                        const res = await postStartRecording({
                                            responseFunc: {
                                                200: (response) => {
                                                    console.log(response.data.data);
                                                    dispatch(
                                                        AddRecordingId({
                                                            recordingId: response.data.data.id,
                                                        }),
                                                    );
                                                },
                                            },
                                            data: { sessionId },
                                        });
                                        console.log(
                                            res,
                                            recordingId,
                                            "서버에서 레코딩 아이디 받아왔는데??",
                                        );
                                    } else {
                                        console.log(
                                            "상대가 내 카드 코드 선택에 동의하지 않았습니다",
                                        );
                                    }
                                    // }
                                    break;

                                case "feedback-start-request":
                                    // 1. 응답 모달창을 열어준다.
                                    setOpenFeedbackRequestModal(true);
                                    break;

                                case "feedback-start-response":
                                    console.log("여기까지 오긴 왔긴 했어", meetingData);
                                    setOpenFeedbackStartModal(false);
                                    const curJsonData = JSON.parse(data);
                                    console.log(
                                        curJsonData,
                                        recordingId,
                                        "이제 보낼건데, 한번 보낼 수 있는지 확인!",
                                    );
                                    if (curJsonData.agree) {
                                        console.log("레코딩 ID를 통해 녹음본 받기");
                                        const res = await postStopRecording({
                                            responseFunc: {
                                                200: (response) => {
                                                    dispatch(
                                                        AddScriptData({
                                                            scriptData: response.data.data,
                                                        }),
                                                    );
                                                },
                                            },
                                            data: {
                                                recordingId: sessionId,
                                            },
                                        });
                                        console.log(res.data.data);
                                        dispatch(removeRecordingId()); // 쓴 Recording Id는 삭제하기!
                                    } else {
                                        console.log("거절 또는 당신은 요청을 보낸 사람입니다.");
                                    }

                                    break;

                                default:
                                    console.log("없는 이벤트타입입니다.");
                            }
                        };
                        processSignal();
                    });
                }
            })
            .catch((error) => {
                console.error("Error Connecting to OpenVidu", error);
            });
    }

    useEffect(() => {
        if (session) {
            console.log(session, "  세션이 연결된다구!!!");
            connectSession();
        }
    }, [session]);

    // 마이크 ON/OFF 메서드
    const handleMicClick = () => {
        setIsActiveMic((prevState) => !prevState);
        console.log(`Microphone : ${isActiveMic}`);
        publisher.publishAudio(isActiveMic);
    };

    // 비디오 ON/OFF 메서드
    const handleVideoClick = () => {
        setIsActiveVideo((prevState) => !prevState);
        console.log(`Video : ${isActiveVideo}`);
        publisher.publishVideo(isActiveVideo);
    };

    const handleChatClick = () => {
        setIsActiveChatSlide((prev) => !prev);
        console.log("hi");
        setActiveButton((prevButtonName) => {
            if (prevButtonName === "Chat") return null;
            return "Chat";
        });
        console.log("ChatSlide");
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

        // 1. 카드를 보여준다. 그러기 위해서는 상태를 on/off 해야한다.
        setOpenCardModal((prev) => !prev);
    };

    const handleReportClick = () => {
        // 1. 현재 사용자가, 상대방을 이미 신고한 전적이 있는지 확인한다.
        if (didReport) {
            setActiveButton((prevButtonName) => {
                if (prevButtonName === "Report") return null;
                return "Report";
            });
        }

        setOpenReportModal((prev) => !prev);
    };

    const handleExitClick = () => {
        setActiveButton((prevButtonName) => {
            if (prevButtonName === "Exit") return null;
            return "Exit";
        });

        // 평가하기 모달을 띄워줘야 한다.
        setOpenEvaluateModal(true);
        console.log("Exit");
    };

    const handleClickSlideButton = () => {
        setIsActiveSlide((prev) => !prev);
    };

    const handleClickTopicCard = (e) => {
        const closestCard = e.target.closest("button");
        if (!closestCard) return;

        // 1. 현재 카드를 인지했고, 해당 카드에서 정보를 가져온다.
        const cardCode = closestCard.id;
        // 2. 가져온 정보를 통해서 상대방에게 현재 대주제로 할 것인지 고르라고 한다.
        session.signal({
            data: cardCode,
            to: [subscribers[0].stream.connection],
            type: "cardcode-select-request",
        });
        // 3. 일단 현재 카드 선택 창은 닫는다.
        handleCardClick();

        // 4. 또한, 상대방의 응답을 받을 때까지 대기하는 모달 창을 띄워줘야 한다.
        setOpenResponseWaitModal(true);
    };

    const handleClickCardRequestAgree = async () => {
        // 상대방이 정한 대화 대주제에 동의할 때 발생되는 이벤트
        // 1. 해당 대화 대주제에 대한 세부 주제를 얻기 위한 요청을 보낸다.
        await getCard({
            responseFunc: {
                200: (response) => {
                    // 정상 요청 성공의 경우, redux store 안에다가 {현재 선택한 카드 대주제, 대주제에 따른 소주제} 를 저장한다.
                    dispatch(
                        AddMeetingData({
                            meetingData: {
                                ...meetingData,
                                currentCardCode: requestCardCode,
                                currentCard: response.data.data,
                            },
                        }),
                    );
                    // 상대방도 저장할 수 있도록, 내가 스토어에 저장한 것과 동일한 데이터를 보내준다.
                    console.log(subscribers);
                    session.signal({
                        data: JSON.stringify({
                            agree: true,
                            currentCardCode: requestCardCode,
                            currentCard: response.data.data,
                        }),
                        to: [subscribers[0].stream.connection],
                        type: "cardcode-select-response",
                    });
                },
            },
            data: {
                cardCode: requestCardCode,
                languageCode: "KOR",
            },
        });
        setOpenCardRequestModal(false);
    };

    const handleClickReportUser = async (reportState, reportText) => {
        await postReport({
            responseFunc: {
                200: () => {
                    console.log("신고 성공!");
                    // 2. 신고 모달의 상태를 변경한다.
                    setOpenReportModal((prev) => !prev);
                    setOpenReportConfirmModal(true);
                },
            },
            data: {
                reportItemId: reportState.id,
                userId,
                description: reportText,
            },
        });
        dispatch(AddDidReport(true));
    };

    const handleClickOpenFeedbackConfirm = (agree) => {
        // 상대방에게 피드백 시착에 따른 동의/거절 여부를 보내준다.
        session.signal({
            data: JSON.stringify({ agree }),
            to: [],
            type: "feedback-start-response",
        });

        // 피드백 요청 확인 창을 닫는다.
        setOpenFeedbackRequestModal(false);
    };

    const handleClickOpenFeedbackStart = async () => {
        // 피드백 시작을 요청하는 창을 연다.
        setOpenFeedbackStartModal(true);

        // 상대방에게 피드백 시작을 요청한다.
        session.signal({
            data: "",
            to: [subscribers[0].stream.connection],
            type: "feedback-start-request",
        });
    };

    const handleClickEvaluateUser = async (rating, selectedGrade) => {
        // gradeId : 실력점수, rating : 매너점수

        await postEvaluate({
            responseFunc: {
                200: () => {
                    session.disconnect();
                    routeTo("/matchhome", { replace: false });
                },
            },
            data: {
                userId: otherUser.userId,
                gradeId: selectedGrade.id,
                languageId: otherUser.userStudyLanguageId,
                studyId,
                rating,
            },
        });
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
            <CardModal isOpen={openCardModal} onClick={handleClickTopicCard} />
            <CardRequestModal
                isOpen={openCardRequestModal}
                cardCode={requestCardCode}
                onClickAgree={handleClickCardRequestAgree}
                onClickDisAgree={() => setOpenCardRequestModal(false)}
            />
            <ResponseWaitModal isOpen={openResponseWaitModal} />
            <ReportModal
                isOpen={openReportModal}
                onClickAgree={handleClickReportUser}
                onClickDisAgree={() => setOpenReportModal(false)}
            />
            <ReportConfimModal
                isOpen={openReportConfirmModal}
                onClickAgree={() => setOpenReportConfirmModal(false)}
            />
            <FeedbackStartModal isOpen={openFeedbackStartModal} />
            <FeedbackRequestModal
                isOpen={openFeedbackRequestModal}
                onClickAgree={() => handleClickOpenFeedbackConfirm(true)}
                onClickDisAgree={() => handleClickOpenFeedbackConfirm(false)}
            />
            <EvaluateModal
                isOpen={openEvaluateModal}
                onClickAgree={handleClickEvaluateUser}
                onClickDisAgree={() => setOpenEvaluateModal(false)}
            />

            {(() => {
                switch (screenMode) {
                    case "FreeTalk":
                        return (
                            <FreeTalk
                                publisher={publisher}
                                subscribers={subscribers}
                                onClick={handleClickOpenFeedbackStart}
                            />
                        );
                    case "KeywordTalk":
                        return <div />;
                    case "Script":
                        return <div />;
                    case "lost":
                        return <div />;
                    default:
                        return null;
                }
            })()}

            <SliderButtonWrapper isOpen={isActiveSlide}>
                <SliderButton isOpen={isActiveSlide} onClick={handleClickSlideButton} />
            </SliderButtonWrapper>

            <ButtonMenu isActiveChatSlide={isActiveChatSlide}>
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
            <ScriptSlideMenu contentGroup={contentGroupData} slideOpen={isActiveSlide} />
            <ChatSlideMenu isOpen={isActiveChatSlide}>
                <ChatBox>
                    <ChatList data={chatMessage} />
                    <ChatInputWrapper onSubmit={sendMessage}>
                        <ChatInput
                            value={message}
                            onChange={ChangeMessages}
                            placeholder="대화 상대방에게 채팅을 보내보세요!"
                        />
                        <TextButton
                            type="submit"
                            value="보내기"
                            shape="positive-chat"
                            text="보내기"
                        />
                    </ChatInputWrapper>
                </ChatBox>
            </ChatSlideMenu>
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
`;

const SliderButtonWrapper = styled.div`
    position: fixed;
    top: -4%;
    right: ${({ isOpen }) => (isOpen ? "28%" : "1%")};
    transition: 0.3s ease-in-out;
    z-index: 1500;
`;

const ButtonMenu = styled.div`
    position: fixed;
    display: flex;
    height: fit-content;
    flex-shrink: 0;
    left: 50%;
    bottom: ${({ isActiveChatSlide }) => (isActiveChatSlide ? "460px" : "0px")};
    transition: 0.3s ease-in-out;
    margin-bottom: 20px;
    gap: 20px;
    z-index: 501;
    transform: translate(-50%, 0);
`;

const ChatBox = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 25px;
`;

const ChatInputWrapper = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 90%;
`;

const ChatInput = styled.input`
    width: 90%;
    border: none;
    font-size: 25px;
    line-height: normal;
    border-radius: 10px;
    border: 1px solid #000;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size: 25px;
    font-weight: 400;
    line-height: normal;
`;

// ----------------------------------------------------------------------------------------------------

export default Meeting;
