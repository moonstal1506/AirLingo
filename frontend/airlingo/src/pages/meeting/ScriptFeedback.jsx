/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
// import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useSelector } from "react-redux";
import ScriptEditor from "@/components/ScriptEditor";
import { TextButton } from "@/components/common/button";
import { selectUser } from "@/features/User/UserSlice";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";

function ScriptFeedback({ sessionId, publisher, subscribers, scriptData }) {
    const quillRef = useRef(null);
    const { userNickname } = useSelector(selectUser);
    const { otherUser } = useSelector(selectMeeting);

    const handleClick = () => {
        const currentText = quillRef.current.getText().trim();
        if (!currentText) {
            alert("스크립트를 제대로 고쳐주세요.");
            return;
        }

        console.log(currentText, currentText.split("\n"));
    };

    const makeDefaultElement = () => {
        if (scriptData.length === 0) return "<p>Network Error! please re-login!</p>";
        return scriptData.sentenceResponseDtoList
            .map(({ speaker, sentence }) => `<p>${speaker}</p><p>${sentence}</p><p><br/></p>`)
            .join("");
    };

    return (
        <MeetingContainer>
            <HeaderContainer>
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
                    <div>{userNickname}(나)</div>
                </VideoFrame>
                <HeaderMiddleBox>
                    <TitleWrapper>스크립트 피드백</TitleWrapper>
                    <SubTitleWrapper>
                        제공된 스크립트에 대해 이야기하거나, <br />
                        녹음 파일을 들으면서 스크립트를 수정해 보세요!
                    </SubTitleWrapper>
                </HeaderMiddleBox>
                {subscribers.length > 0 && (
                    <VideoFrame key={subscribers[0].stream.streamId}>
                        <video
                            ref={(node) => node && subscribers[0].addVideoElement(node)}
                            autoPlay
                            width="500px"
                        />
                        <div>{otherUser.userNickname}(상대방)</div>
                    </VideoFrame>
                )}
            </HeaderContainer>
            <FeedbackContainer>
                <ScriptEditor quillRef={quillRef} defaultEl={makeDefaultElement()} id={sessionId} />
                <TextButton
                    type="button"
                    shape="positive-curved-large"
                    onClick={handleClick}
                    text="피드백 끝내기"
                />
            </FeedbackContainer>
        </MeetingContainer>
    );
}

const TitleWrapper = styled.span`
    color: #000;
    text-align: center;
    font-size: 40px;
    font-weight: 800;
    line-height: 44px; /* 110% */
`;
const SubTitleWrapper = styled.span`
    color: #000;
    text-align: center;
    font-size: 25px;
    font-weight: 400;
    line-height: 30px;
`;

const HeaderMiddleBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 18px;
`;

const VideoFrame = styled.div`
    width: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    video {
        width: 350px;
        height: 197px;
    }
    gap: 10px;

    color: #000;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    line-height: normal;
`;
const MeetingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: ${(props) => props.theme.colors.primary1};
`;

const HeaderContainer = styled.div`
    width: 1250px;
    height: 237px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const PlacholderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    width: 350px;
    height: 197px;
    background-color: black;
    border-radius: 20px;
    color: white;
`;

const FeedbackContainer = styled.div`
    margin-top: 13px;
    display: flex;
    width: 1250px;
    height: 550px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25) inset;
    z-index: 500;
`;

export default ScriptFeedback;
