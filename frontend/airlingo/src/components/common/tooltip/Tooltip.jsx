import styled from "@emotion/styled";
import { useState } from "react";

const positionCombination = {
    left: {
        top: {
            down: `
        left: 0;
        top: -100%;
        transform: translate(calc(-100% - 10px),0); 
      `,
            up: `
        left: 0;
        bottom: 100%;
        transform: translate(calc(-100% - 10px),-100%); 
      `,
        },
        bottom: {
            down: `
        left : 0;
        top : 0%;
        transform: translate(calc(-100% - 10px),0%); 
      `,
            up: `
        left : 0;
        bottom: 0%;
        transform: translate(calc(-100% - 10px),-100%);
      `,
        },
    },
    right: {
        top: {
            down: `
        right : -100%;
        bottom : 100%;
        transform: translate(calc(10px),0%);
      `,
            up: `
        right : -100%;
        bottom : 100%;
        transform: translate(calc(10px),-100%);
      `,
        },
        bottom: {
            down: `
        right : -100%;
        bottom : 0;
        transform: translate(calc(10px),0%);
      `,
            up: `
         right : -100%;
        bottom : 0;
        transform: translate(calc(10px),-100%);
      `,
        },
    },
};

function Tooltip({ position, children }) {
    const { horizontal, vertical, direction } = position;
    const [hover, setHover] = useState(true);
    const handleMouseOver = () => setHover(true);
    const handleMouseOut = () => setHover(false);
    return (
        <TooltipContainer>
            <TooltipTrigger onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                ?
            </TooltipTrigger>
            <TooltipBox
                isHover={hover}
                horizontal={horizontal}
                vertical={vertical}
                direction={direction}
            >
                {children}
            </TooltipBox>
        </TooltipContainer>
    );
}

const TooltipContainer = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
`;
const TooltipTrigger = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #000;
    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const TooltipBox = styled.div`
    position: relative;
    width: fit-content;
    background-color: red;
    transition: opacity 0.5s;
    opacity: ${({ isHover }) => (isHover ? "1" : "0")};
    ${({ horizontal, vertical, direction }) => positionCombination[horizontal][vertical][direction]}
    visibility: ${({ isHover }) => (isHover ? "visible" : "hidden")};
`;
export default Tooltip;
