import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "@/assets/styles/Theme";
import combineShape from "@/utils/style";

// ----------------------------------------------------------------------------------------------------

const { primary4, primary7, warning } = theme.colors;
const shapeStyle = {
    positive: `
        background-color: ${primary4};
        border: none;
        color: #FFFFFF;
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
            color: #FFFFFF;
            transition: ease-out 0.35s;
        }
    `,
    warning: `
        background-color: ${warning};
        border: none;
        color: #FFFFFF;
        &:hover {
            background-color: #000000;
            transition: ease-out 0.35s;
        }
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
};

// ----------------------------------------------------------------------------------------------------

function TextButton({ type, text, onClick, shape }) {
    return (
        <TextButtonWrapper type={type} onClick={onClick} shape={shape}>
            {text}
        </TextButtonWrapper>
    );
}

TextButton.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    shape: PropTypes.string,
};

TextButton.defaultProps = {
    type: "button",
    onClick: () => {},
    shape: "positive-rounded",
};

const TextButtonWrapper = styled.button`
    height: 50px;
    padding: 10px 20px;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    ${(props) => combineShape(shapeStyle, props.shape)}
`;

// ----------------------------------------------------------------------------------------------------

export default TextButton;
