/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";
import isKeyInObj from "@/utils/common";
import { TextButton } from "@/components/common/button";

// ----------------------------------------------------------------------------------------------------

function FreeTalk({ publisher, subscribers, sharePublisher, shareSubscribers, onClick }) {
    const { isShareOn, meetingData } = useSelector(selectMeeting);
    return (
        <>
            <VideoContainer>
                <VideoFrame>
                    {publisher ? (
                        <video
                            ref={(node) => node && publisher.addVideoElement(node)}
                            autoPlay
                            width="500px"
                            style={{ display: isShareOn ? "none" : "block" }}
                        />
                    ) : (
                        <PlaceholderBox>카메라를 로딩하고 있습니다.</PlaceholderBox>
                    )}
                    {isShareOn && sharePublisher && (
                        <video
                            ref={(node) => node && sharePublisher.addVideoElement(node)}
                            autoPlay
                            width="500px"
                            style={{ display: isShareOn ? "block" : "none" }}
                        />
                    )}
                </VideoFrame>
                {subscribers.length > 0 && (
                    <VideoFrame key={subscribers[0].stream.streamId}>
                        <video
                            ref={(cameraNode) =>
                                cameraNode && subscribers[0].addVideoElement(cameraNode)
                            }
                            autoPlay
                            width="500px"
                            style={{ display: shareSubscribers.length === 0 ? "block" : "none" }}
                        />
                        {shareSubscribers.length > 0 && (
                            <VideoFrame key={shareSubscribers[0].stream.streamId}>
                                <video
                                    ref={(screenNode) =>
                                        screenNode &&
                                        shareSubscribers[0].addVideoElement(screenNode)
                                    }
                                    autoPlay
                                    width="500px"
                                    style={{
                                        display: shareSubscribers.length > 0 ? "block" : "none",
                                    }}
                                />
                            </VideoFrame>
                        )}
                    </VideoFrame>
                )}
            </VideoContainer>
            <TopicContainer>
                <TopicHeader>현재 대화 주제</TopicHeader>
                <TopicContent>
                    {meetingData && isKeyInObj(meetingData, "currentCard")
                        ? meetingData.currentCard.subject
                        : "프리토킹"}
                </TopicContent>
                {meetingData && isKeyInObj(meetingData, "currentCard") && (
                    <TextButton
                        shape="positive-curved-large"
                        type="button"
                        onClick={onClick}
                        text="스크립트 피드백"
                    />
                )}
            </TopicContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

const VideoContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    margin: 10px 0;
`;

const VideoFrame = styled.div`
    width: 500px;
`;

const PlaceholderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    width: 500px;
    height: 375px;
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
    position: relative;
    z-index: 10;
`;

const TopicHeader = styled.div`
    font-weight: 300;
    font-size: 30px;
`;

const TopicContent = styled.div`
    font-weight: 700;
    font-size: 50px;
`;

// ----------------------------------------------------------------------------------------------------

export default FreeTalk;
