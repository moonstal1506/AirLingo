import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "@/assets/styles/Theme";
import combineShape from "@/utils/style";

// ----------------------------------------------------------------------------------------------------

const { primary4, primary7, warning, faintgray } = theme.colors;
const shapeStyle = {
    positive: `
        background-color: ${primary4};
        border: none;
        color: white;
        &:hover {
            background-color: ${primary7};
            transition: ease-out 0.35s;
        }
    `,
    negative: `
        background-color: #FFFFFF;
        border: 3px solid ${primary4};
        color: ${primary4};
        &:hover {
            background-color: ${primary4};
            color: white;
            transition: ease-out 0.35s;
        }
    `,
    warning: `
        background-color: ${warning};
        border: none;
        color: white;
        &:hover {
            background-color: black;
            transition: ease-out 0.35s;
        }
    `,
    disabled: `
        background-color: ${faintgray};
        border: none;
        border-radius: 20px;
        color: white;
        cursor: default;
    `,
    large: `
        min-width : 200px;
    `,
    signup: `
        min-width : 200px;
        border-radius:10px;
    `,
    word: `
    min-width : 120px;
    border-radius:10px;
    `,
    script: `
    min-width : 160px;
    border-radius:10px;
    `,
    prev: `
    width: 25px;
    height: 25px;
    border-radius:10px;
    `,
    normal: `
        min-width: 150px;
        border-radius: 10px;
    `,
    curved: `
        min-width: 150px;
        border-radius: 20px;
    `,
    rounded: `
        min-width: 100px;
        border-radius: 25px;
    `,
    home: `
        min-width: 350px;
        border-radius: 10px;
        height: 65px;
        padding: 10px 20px;
        color: white;
        font-size: 30px;
        font-weight: 700;
    `,
    quit: `
        min-width : 120px;
        border-radius:10px;
    `,
    login: `
    background-color:#FFF;
    align-items: center;
    width: 300px;
    height: 50px;
    border: 1px solid #000;
    border-radius: 10px;
    margin-top: 15px; 
    `,
    googleLogin: `
    background-color:#FFF;
    align-items: center;
    width: 450px;
    height: 50px;
    border: 1px solid #000;
    border-radius: 10px;
    `,
};

// ----------------------------------------------------------------------------------------------------

function TextButton({ type, text, width, onClick, shape, disabled }) {
    return (
        <TextButtonWrapper
            type={type}
            width={width}
            onClick={onClick}
            shape={shape}
            disabled={disabled}
        >
            {text}
        </TextButtonWrapper>
    );
}

TextButton.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    width: PropTypes.string,
    onClick: PropTypes.func,
    shape: PropTypes.string,
    disabled: PropTypes.bool,
};

TextButton.defaultProps = {
    type: "button",
    width: "120px",
    onClick: () => {},
    shape: "positive-rounded",
    disabled: false,
};

const TextButtonWrapper = styled.button`
    width: ${(props) => props.width};
    height: 50px;
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    ${(props) =>
        props.disabled
            ? combineShape(shapeStyle, "disabled")
            : combineShape(shapeStyle, props.shape)}
`;

// ----------------------------------------------------------------------------------------------------

export default TextButton;
