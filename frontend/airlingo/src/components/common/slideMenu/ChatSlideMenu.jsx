import PropTypes from "prop-types";
import styled from "@emotion/styled";

function ChatSlideMenu({ isOpen, children }) {
    return (
        <SlideMenuContainer>
            <MenuContainer isOpen={isOpen}>{children}</MenuContainer>
        </SlideMenuContainer>
    );
}

ChatSlideMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

const SlideMenuContainer = styled.div`
    width: 100vw;
    height: 460px;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
`;

const MenuContainer = styled.div`
    width: 100%;
    height: 450px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;
    transform: translate(0, ${({ isOpen }) => (isOpen ? `0` : `calc(450px)`)});
    background: #fff;
    box-shadow: 0px -5px 5px 0px rgba(0, 0, 0, 0.25);
`;

export default ChatSlideMenu;
