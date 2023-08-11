/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import stomp from "stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import { addSessionId, addOtherUser, addStudyId } from "@/features/Meeting/MeetingSlice";
import EngKorTodayExpressionArr from "@/config/TodayExpressionConfig";
import MatchQueueImg from "@/assets/imgs/match-queue-img.jpg";
import { ReactComponent as RightArrowIcon } from "@/assets/icons/right-arrow-icon.svg";
import { ReactComponent as LeftArrowIcon } from "@/assets/icons/left-arrow-icon.svg";
import { postMatching, cancelMatching } from "@/api";
import { useRouter } from "@/hooks";
import { selectUser } from "@/features/User/UserSlice";
import { formatTime } from "@/utils/format";
import MatchingFailModal from "@/components/modal/match/MatchingFailModal";
import { TextButton } from "@/components/common/button";

function MatchQueue() {
    const { VITE_SOCKET_URL } = import.meta.env;
    const dispatch = useDispatch();
    const { routeTo } = useRouter();
    const location = useLocation();
    const { userNickname, userId } = useSelector(selectUser);
    const [expressionIdx, setExpressionIdx] = useState(0);
    const [time, setTime] = useState(0);
    const [openMatchingFailModal, setOpenMatchingFailModal] = useState(false);
    // const socket = new SockJS(VITE_SOCKET_URL);
    // const stompClient = stomp.over(socket);
    const socketRef = useRef(null);
    const stompClientRef = useRef(null);
    const interval = useRef(null);

    async function matchingRequestFunc() {
        const { studyLanguageId, premium } = location.state;
        console.log("매칭 시도!");
        await postMatching({
            responseFunc: {
                400: () => {
                    routeTo("/notfound");
                },
            },
            data: {
                userId,
                studyLanguageId,
                premium,
            },
        });
    }

    const matchingFunc = useCallback(async () => {
        console.log("스톰프 연결 전");

        stompClientRef.current.connect({}, async () => {
            console.log("스톰프 연결 시작 후");
            matchingRequestFunc();

            stompClientRef.current.subscribe(
                `/queue/matchingData/${userNickname}`,
                (matchingResult) => {
                    console.log(matchingResult);
                    if (matchingResult.body === "FAIL") {
                        console.log("매칭실패");
                        setOpenMatchingFailModal(true);
                        return;
                    }

                    const { sessionId, studyId, matchingResponseDto } = JSON.parse(
                        matchingResult.body,
                    );

                    dispatch(AddSessionId({ sessionId }));
                    dispatch(AddStudyId({ studyId }));
                    dispatch(
                        AddOtherUser({
                            otherUser:
                                matchingResponseDto[
                                    Object.keys(matchingResponseDto).filter(
                                        (key) =>
                                            matchingResponseDto[key].userNickname !== userNickname,
                                    )
                                ],
                        }),
                    );
                    clearInterval(interval.current);
                    stompClientRef.current.disconnect(() => {
                        console.log("Stomp client disconnected.");
                    });
                    routeTo("/matchresult");
                },
            );
        });
    }, []);

    async function cancelMatchingFunc() {
        await cancelMatching({
            responseFunc: {
                200: () => {
                    console.log("매칭 취소 성공");
                    routeTo("/matchhome");
                },
                400: () => {
                    console.log("매칭 취소 실패");
                },
            },
            data: { userId },
        });
    }

    useEffect(() => {
        console.log("초기화 시작!");
        // 비허용 접근
        if (
            !location.state ||
            !("studyLanguageId" in location.state) ||
            !("premium" in location.state) ||
            !userNickname ||
            !userId
        ) {
            routeTo("/");
            return () => {};
        }

        console.log("소켓설정");
        // 소켓 설정
        socketRef.current = new SockJS(VITE_SOCKET_URL);
        stompClientRef.current = stomp.over(socketRef.current);
        matchingFunc();

        // 타이머 설정
        interval.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => {
            console.log("초기화 완료");
        };
    }, []);

    const handleClickPrevButton = () => {
        setExpressionIdx((prev) =>
            expressionIdx === 0 ? EngKorTodayExpressionArr.length - 1 : prev - 1,
        );
    };
    const handleClickNextButton = () => {
        setExpressionIdx((prev) =>
            expressionIdx === EngKorTodayExpressionArr.length - 1 ? 0 : prev + 1,
        );
    };

    const handleClickOpenMatchingConfirm = (agree) => {
        if (agree) {
            console.log("매칭 계속 진행");
            matchingRequestFunc();
        } else {
            console.log("매칭 정지");
            routeTo("/matchhome");
        }

        // 피드백 요청 확인 창을 닫는다.
        setOpenMatchingFailModal(false);
    };
    return (
        <MatchQueueContainer>
            <MatchingFailModal
                isOpen={openMatchingFailModal}
                onClickAgree={() => handleClickOpenMatchingConfirm(true)}
                onClickDisAgree={() => handleClickOpenMatchingConfirm(false)}
            />
            <MatchQueueTitle>탑승 수속 중입니다.</MatchQueueTitle>
            <MatchQueueCommonBox>
                <MatchQueueImgWrapper src={MatchQueueImg} alt="matchqueueimg" />
                <MatchQueueTimerBox>
                    <MatchQueueText>대기시간</MatchQueueText>
                    <MatchQueueTimeText>{formatTime(time)}</MatchQueueTimeText>
                </MatchQueueTimerBox>
            </MatchQueueCommonBox>
            <MatchQueueDownBox>
                <LeftArrowIcon onClick={handleClickPrevButton} />
                <MatchQueueCommonBox>
                    <TodayExpressionContentTitle>오늘의 표현</TodayExpressionContentTitle>
                    <TodayExpressionContentBox>
                        <TodayExpressionOriginalText>
                            {EngKorTodayExpressionArr[expressionIdx].originalText}
                        </TodayExpressionOriginalText>
                        <TodayExpressionInterpretText>
                            {EngKorTodayExpressionArr[expressionIdx].interpretText}
                        </TodayExpressionInterpretText>
                    </TodayExpressionContentBox>
                </MatchQueueCommonBox>
                <RightArrowIcon onClick={handleClickNextButton} />
            </MatchQueueDownBox>
            <TextButton
                type="button"
                text="매칭 취소"
                shape="positive-curved"
                onClick={() => cancelMatchingFunc()}
            />
        </MatchQueueContainer>
    );
}

const MatchQueueContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
`;

const MatchQueueTitle = styled.span`
    color: #000;
    text-align: center;
    font-size: 45px;
    font-style: normal;
    font-weight: 800;
    line-height: 44px;
`;

const MatchQueueCommonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`;

const MatchQueueImgWrapper = styled.img`
    overflow: hidden;
    border-radius: 20px;
    width: 600px;
    height: 350px;
    justify-content: center;
    align-items: center;
`;

const MatchQueueText = styled.span`
    color: #000;
    font-size: 30px;
    font-weight: 400;
    line-height: normal;
`;

const MatchQueueTimeText = styled.span`
    color: #000;
    font-size: 30px;
    font-weight: 700;
    line-height: normal;
`;

const MatchQueueTimerBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;

const MatchQueueDownBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    svg {
        cursor: pointer;
    }
`;

const TodayExpressionContentTitle = styled.span`
    color: #000;
    font-size: 25px;
    font-weight: 800;
    line-height: normal;
`;

const TodayExpressionContentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const TodayExpressionOriginalText = styled.span`
    color: #000;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
`;
const TodayExpressionInterpretText = styled.span`
    color: rgba(0, 0, 0, 0.5);
    font-size: 15px;
    font-weight: 400;
    line-height: normal;
`;

export default MatchQueue;
