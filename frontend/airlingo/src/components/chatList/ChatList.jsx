import styled from "@emotion/styled";
import PropTypes from "prop-types";
import ProfileBar from "../profileBar";

function ChatList({ data, onClick }) {
    const handleClickListItem = (e) => {
        const currentList = e.target.closest("li");
        if (!currentList || onClick === null) return;

        onClick(currentList.key);
    };
    return (
        <ChatListContainer>
            <ChatListBox onClick={handleClickListItem}>
                {data.map(({ id, imgSrc, nickname, text }) => (
                    <ChatListItem key={`${id}_${nickname}`}>
                        <ProfileWrapper>
                            <ProfileBar imgSize="tiny" imgSrc={imgSrc} nickname={nickname} />
                        </ProfileWrapper>
                        <ChatTextWrapper>{text}</ChatTextWrapper>
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
    width: 80%;
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

export default ChatList;
