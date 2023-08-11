/* eslint-disable react/no-array-index-key */
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";
import ProfileBar from "@/components/profileBar";
import { selectUser } from "@/features/User/UserSlice";

function MeetingScript() {
    const { chatList, otherUser } = useSelector(selectMeeting);
    const { userNickname, userImgUrl } = useSelector(selectUser);

    return (
        <ScriptContainer>
            {chatList &&
                chatList.length > 0 &&
                chatList.map(({ isMe, text }, idx) => (
                    <ChatBox key={idx}>
                        <ProfileBar
                            imgSize="tiny"
                            imgSrc={isMe ? userImgUrl : otherUser.userImgUrl}
                            nickname={isMe ? userNickname : otherUser.userNickname}
                            textColor="#000"
                        />
                        <ChatTextWrapper>{text}</ChatTextWrapper>
                    </ChatBox>
                ))}
        </ScriptContainer>
    );
}

const ScriptContainer = styled.div`
    padding-top: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;

const ChatBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: start;
    width: 95%;
    gap: 10px;
`;

const ChatTextWrapper = styled.div`
    border-radius: 10px;
    border: 1px solid #000;
    width: 100%;
    min-height: 65px;
    padding: 10px 20px;
    align-items: center;
    box-sizing: border-box;
    color: #000;
    font-size: 25px;
    font-weight: 400;
    line-height: normal;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export default MeetingScript;
