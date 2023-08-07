import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useState } from "react";
import { ReactComponent as ScriptIcon } from "@/assets/icons/script-icon.svg";

function ScriptSliderMenu({ contentGroup, onClick, slideOpen }) {
    const [slideIdx, setSlideIdx] = useState(0);
    const CurrentContent = contentGroup[slideIdx].Content;

    const handleClickButton = (e) => {
        const closestButton = e.target.closest("button");
        if (!closestButton || !closestButton.id || slideIdx === +closestButton.id) return;
        setSlideIdx(+closestButton.id);
    };

    return (
        <SlideMenuContainer>
            <SlideButtonWrapper slideOpen={slideOpen} onClick={onClick}>
                <ScriptIcon />
                스크립트
            </SlideButtonWrapper>
            <MenuContainer slideOpen={slideOpen}>
                <MenuHeaderButtonBox onClick={handleClickButton}>
                    {contentGroup.map((CurContent, idx) => (
                        <MenuHeaderButtonWrapper key={CurContent.Icon.name} id={idx}>
                            <CurContent.Icon width="30px" height="30px" />
                        </MenuHeaderButtonWrapper>
                    ))}
                </MenuHeaderButtonBox>
                <MenuContentBox>
                    <CurrentContent />
                </MenuContentBox>
            </MenuContainer>
        </SlideMenuContainer>
    );
}

ScriptSliderMenu.propTypes = {
    contentGroup: PropTypes.arrayOf(
        PropTypes.shape({
            Content: PropTypes.node.isRequired,
            Icon: PropTypes.elementType.isRequired,
        }),
    ).isRequired,
    onClick: PropTypes.func.isRequired,
    slideOpen: PropTypes.bool.isRequired,
};

const SlideMenuContainer = styled.div`
    width: 540px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100vh;
`;

const MenuContainer = styled.div`
    width: 420px;
    top: 0;
    right: -100%;
    height: 100%;
    position: relative;
    transition: transform 0.3s ease-in-out;
    transform: translate(${({ slideOpen }) => (slideOpen ? "calc(-420px)" : "0")}, 0%);
    background-color: #fff;

    display: flex;
    flex-direction: column;
`;

const MenuHeaderButtonWrapper = styled.button`
    cursor: pointer;
    height: 60px;
    flex: 1;
    border: black 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const MenuHeaderButtonBox = styled.div`
    width: 420px;
    display: flex;
`;

const MenuContentBox = styled.div`
    flex: 1;
    width: 420px;
`;

const SlideButtonWrapper = styled.button`
    cursor: pointer;
    width: 120px;
    height: 100px;
    border-radius: 20px 0px 0px 20px;
    background: #fff;
    border: none;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
    z-index: 999;
    top: calc(60px);
    right: 0;
    position: absolute;
    transition: transform 0.3s ease-in-out;
    transform: translate(${({ slideOpen }) => (!slideOpen ? "0" : "calc(-420px)")}, 0%);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

export default ScriptSliderMenu;
