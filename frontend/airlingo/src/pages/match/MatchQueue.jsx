/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
// import { useLocation } from "react-router-dom";
import stomp from "stompjs";
import SockJS from "sockjs-client";
import EngKorTodayExpressionArr from "@/config/TodayExpressionConfig";
import MatchQueueImg from "@/assets/imgs/match-queue-img.jpg";
import { ReactComponent as RightArrowIcon } from "@/assets/imgs/icons/right-arrow-icon.svg";
import { ReactComponent as LeftArrowIcon } from "@/assets/imgs/icons/left-arrow-icon.svg";
import { postMatching } from "@/api";
import { useRouter } from "@/hooks";

function MatchQueue() {
    const [expressionIdx, setExpressionIdx] = useState(0);
    const [time, setTime] = useState(0);
    const { routeTo } = useRouter();
    // const location = useLocation();
    // console.log(setTime, location);

    const matchingFunc = useCallback(async (stompClient, userId, studyLanguageId, premium) => {
        // 연결을 시작합니다.
        stompClient.connect({}, async (frame) => {
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
            console.log("connected: ", frame);
            // /user/{nickname}/queue/matchingData
            stompClient.subscribe("/queue/matchingData/user1", (matchingResult) => {
                // 데이터 받기 성공
                console.log(matchingResult);
                // routeTo("/matchresult");
            });
        });
    }, []);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8081/ws");
        const stompClient = stomp.over(socket);
        matchingFunc(stompClient, 1, 2, false);
        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
            stompClient.disconnect(() => {
                console.log("Stomp client disconnected.");
            });
        };
    }, []);

    function formatTime() {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes < 10 ? "0" : ""}${minutes}:${
            remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    }

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
    return (
        <MatchQueueContainer>
            <MatchQueueTitle>탑승 수속 중입니다.</MatchQueueTitle>
            <MatchQueueCommonBox>
                <MatchQueueImgWrapper src={MatchQueueImg} alt="matchqueueimg" />
                <MatchQueueTimerBox>
                    <MatchQueueText>대기시간</MatchQueueText>
                    <MatchQueueTimeText>{formatTime()}</MatchQueueTimeText>
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
