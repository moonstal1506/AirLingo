import styled from "@emotion/styled";
import { useState } from "react";

function Tooltip({ position, children }) {
    const [hover, setHover] = useState(false);
    const handleMouseOverButton = () => setHover(true);
    const handleMouseOutButton = () => setHover(false);
    return (
        <TooltipContainer>
            <TooltipTrigger onMouseOver={handleMouseOverButton} onMouseOut={handleMouseOutButton}>
                ?
            </TooltipTrigger>
            <TooltipBox isHover={hover} position={position}>
                {children}
            </TooltipBox>
        </TooltipContainer>
    );
}

const TooltipContainer = styled.div`
    position: relative;
`;
const TooltipTrigger = styled.div`
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
    width: 300px;
    height: 500px;
    background-color: red;
    ${({ isHover }) => `display : ${isHover ? "flex" : "none"};`}
    position : absolute;
    ${({ position }) => {
        const { horizontal, vertical, direction } = position;
        if (horizontal === "left" && vertical === "top" && direction === "down") {
            return `
                left: 0;
                top: 0;
                transform: translate(-100%,0); 
            `;
        }
        if (horizontal === "left" && vertical === "top" && direction === "up") {
            return `
                left: 0;
                bottom: 100%;
                transform: translate(-100%,0); 
            `;
        }
        if (horizontal === "left" && vertical === "bottom" && direction === "down") {
            return `
                left: 0;
                top: 100%;
                transform: translate(-100%,0); 
            `;
        }
        if (horizontal === "left" && vertical === "bottom" && direction === "up") {
            return `
                left : 0;
                bottom: 0;
                transform: translate(-100%,0%);
            `;
        }
        if (horizontal === "right" && vertical === "top" && direction === "up") {
            return `
                left : 100%;
                bottom : 100%;
                transform: translate(0%,0%);
            `;
        }
        if (horizontal === "right" && vertical === "top" && direction === "down") {
            return `
                left : 100%;
                top : 0;
                transform: translate(0%,0%);
            `;
        }
        if (horizontal === "right" && vertical === "bottom" && direction === "up") {
            return `
                left : 100%;
                bottom : 0;
                transform: translate(0%,0%);
            `;
        }
        if (horizontal === "right" && vertical === "bottom" && direction === "down") {
            return `
                left : 100%;
                top : 100;
                transform: translate(0%,0%);
            `;
        }
        return "";
    }}
`;
export default Tooltip;
