import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useState } from "react";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { faintgray } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function ScriptSliderMenu({ contentGroup, slideOpen }) {
    const [slideIdx, setSlideIdx] = useState(0);
    const CurrentContent = contentGroup[slideIdx].Content;

    const handleClickButton = (e) => {
        const closestButton = e.target.closest("button");
        if (!closestButton || !closestButton.id || slideIdx === +closestButton.id) return;
        setSlideIdx(+closestButton.id);
    };

    return (
        <SlideMenuContainer>
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
    slideOpen: PropTypes.bool.isRequired,
};

const SlideMenuContainer = styled.div`
    overflow: hidden;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100vh;
    z-index: 1000;
`;

const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 0;
    right: -100%;
    width: 420px;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    transform: translate(${({ slideOpen }) => (slideOpen ? "calc(-420px)" : "0")}, 0%);
    background-color: white;
    border-left: 3px solid ${faintgray};
`;

const MenuHeaderButtonWrapper = styled.button`
    display: flex;
    cursor: pointer;
    height: 60px;
    flex: 1;
    border: black 1px solid;
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

export default ScriptSliderMenu;
