/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
// import { useDispatch } from "react-redux";
import { useState } from "react";
import ScriptEditor from "@/components/ScriptEditor";
import { TextButton } from "@/components/common/button";

function ScriptFeedback({ publisher, subscribers }) {
    const [text, setText] = useState("<p>1234</p>");

    const handleChange = (e) => {
        setText(e);
    };
    const handleClick = () => {
        console.log(text);
    };

    return (
        <ExampleContainer>
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
                    <div>수환</div>
                </VideoFrame>
                {subscribers ? (
                    subscribers.map((subscriber) => (
                        <VideoFrame key={subscriber.stream.streamId}>
                            <video
                                ref={(node) => node && subscriber.addVideoElement(node)}
                                autoPlay
                                width="500px"
                            />
                            <div>수환</div>
                        </VideoFrame>
                    ))
                ) : (
                    <VideoFrame>
                        <PlacholderBox>카메라를 로딩하고 있습니다.</PlacholderBox>
                        <div>수환</div>
                    </VideoFrame>
                )}
            </HeaderContainer>
            <FeedbackContainer>
                <ScriptEditor onChange={handleChange} text={text} />
                <TextButton
                    type="button"
                    shape="positive-curved-large"
                    onClick={handleClick}
                    text="피드백 끝내기"
                />
            </FeedbackContainer>
        </ExampleContainer>
    );
}

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
`;

const ExampleContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: gray;
`;
export default ScriptFeedback;
