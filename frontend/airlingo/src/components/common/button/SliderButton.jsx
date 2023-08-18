import { css } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary4 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

const openButtonStyles = css`
    span:nth-child(1) {
        top: 18px;
        width: 0%;
        left: 50%;
    }
    span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }
    span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
    }
`;

// ----------------------------------------------------------------------------------------------------

function SliderButton({ isOpen, onClick }) {
    return (
        <ButtonBox className={isOpen ? "open" : ""} onClick={onClick}>
            <span />
            <span />
            <span />
            <span />
        </ButtonBox>
    );
}

SliderButton.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const ButtonBox = styled.div`
    width: 60px;
    height: 45px;
    position: relative;
    margin: 50px auto;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
    span {
        display: block;
        position: absolute;
        height: 9px;
        width: 100%;
        background: ${primary4};
        border-radius: 9px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.25s ease-in-out;
        -moz-transition: 0.25s ease-in-out;
        -o-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;
    }
    span:nth-child(1) {
        top: 0px;
    }
    span:nth-child(2),
    span:nth-child(3) {
        top: 18px;
    }
    span:nth-child(4) {
        top: 36px;
    }
    &.open {
        ${openButtonStyles}
    }
`;

// ----------------------------------------------------------------------------------------------------

export default SliderButton;
