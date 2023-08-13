/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/User/UserSlice";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";

// ----------------------------------------------------------------------------------------------------

function WhiteBoard({ publisher, subscribers }) {
    const { userNickname } = useSelector(selectUser);
    const { otherUser } = useSelector(selectMeeting);

    return (
        <HeaderContainer>
            <VideoFrame>
                {publisher ? (
                    <video
                        ref={(node) => node && publisher.addVideoElement(node)}
                        autoPlay
                        width="500px"
                    />
                ) : (
                    <PlaceholderBox>카메라를 로딩하고 있습니다.</PlaceholderBox>
                )}
                <div>{userNickname}(나)</div>
            </VideoFrame>
            <HeaderMiddleBox>
                <TitleWrapper>화이트보드 페이지</TitleWrapper>
                <SubTitleWrapper>화이트 보드 페이지입니다!!!!!</SubTitleWrapper>
            </HeaderMiddleBox>

            <VideoFrame>
                {subscribers ? (
                    <video
                        ref={(node) => node && subscribers[0].addVideoElement(node)}
                        autoPlay
                        width="500px"
                    />
                ) : (
                    <PlaceholderBox>카메라를 로딩하고 있습니다.</PlaceholderBox>
                )}
                <div>{otherUser.userNickname}(상대방)</div>
            </VideoFrame>
        </HeaderContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

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

const HeaderContainer = styled.div`
    width: 1250px;
    height: 237px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const PlaceholderBox = styled.div`
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

// ----------------------------------------------------------------------------------------------------

export default WhiteBoard;
