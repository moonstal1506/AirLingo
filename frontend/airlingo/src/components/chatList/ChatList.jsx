import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Profile from "../common/profile";

function ChatList({ data, onClick }) {
    const defaultImageUrl = `https://airlingobucket.s3.ap-northeast-2.amazonaws.com/%EC%82%AC%EC%9A%A9%EC%9E%90.png`;
    const handleClickListItem = (e) => {
        const currentList = e.target.closest("li");
        if (!currentList || onClick === null) return;

        onClick(currentList.key);
    };
    return (
        <ChatListContainer>
            <ChatListBox onClick={handleClickListItem}>
                {data.map(({ roomId, userImgUrl, userNickname, content }) => (
                    <ChatListItem key={`${roomId}_${userNickname}`}>
                        <ProfileWrapper>
                            <ProfileBarCustom>
                                <Profile size="tiny" src={userImgUrl || defaultImageUrl} />
                                {userNickname}
                            </ProfileBarCustom>
                        </ProfileWrapper>
                        <ChatTextWrapper>{content}</ChatTextWrapper>
                    </ChatListItem>
                ))}
            </ChatListBox>
        </ChatListContainer>
    );
}

ChatList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            imgSrc: PropTypes.string.isRequired,
            nickname: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
            text: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onClick: PropTypes.func,
};

ChatList.defaultProps = {
    onClick: null,
};

const ChatListContainer = styled.div`
    width: 90%;
    height: 320px;
    padding: 15px;
    border-radius: 20px;
    border: 1px solid #000;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
    gap: 10px;
    flex-shrink: 0;
    overflow-y: auto;
`;
const ChatListBox = styled.ul`
    display: flex;
    justify-content: start;
    gap: 10px;
    width: 100%;
    flex-direction: column;
`;

const ChatListItem = styled.div`
    width: 100%;
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    box-sizing: border-box;
`;
const ProfileWrapper = styled.div`
    border-radius: 10px;
    border: 1px solid #000;
    display: flex;
    width: 30%;
    height: 65px;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
`;
const ChatTextWrapper = styled.div`
    border-radius: 10px;
    border: 1px solid #000;
    width: 100%;
    height: 65px;
    padding: 10px 20px;
    align-items: center;
    box-sizing: border-box;
    color: #000;
    font-size: 25px;
    font-weight: 400;
    line-height: normal;
`;

const ProfileBarCustom = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export default ChatList;
