import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary1, primary4, secondary3 } = theme.colors;
const radiusObj = {
    small: "10px",
    big: "20px",
};

// ----------------------------------------------------------------------------------------------------

function TextInput({
    type,
    placeholder,
    radius,
    width,
    height,
    maxLength,
    value,
    onChange,
    color,
}) {
    return (
        <TextInputWrapper
            type={type}
            placeholder={placeholder}
            radius={radius}
            width={width}
            height={height}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            color={color}
        />
    );
}

TextInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    radius: PropTypes.oneOf(["small", "big"]),
    width: PropTypes.string,
    height: PropTypes.string,
    maxLength: PropTypes.number,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
    type: "text",
    placeholder: "",
    radius: "small",
    width: "300px",
    height: "50px",
    maxLength: 50,
};

// ----------------------------------------------------------------------------------------------------

const TextInputWrapper = styled.input`
    box-sizing: border-box;
    border: 1px solid ${primary4};
    border-radius: ${({ radius }) => radiusObj[radius]};
    ${({ width, height }) => `
        width: ${width};
        height: ${height};
    `};
    background-color: ${({ color }) => (color === "white" ? "white" : primary1)};
    outline: none;
    padding: 0 20px;
    color: ${secondary3};
    font-size: 20px;
    &::placeholder {
        color: ${primary4};
        font-weight: 400;
        opacity: 0.3;
    }
    &:hover {
        cursor: pointer;
    }
    &:focus {
        border: 3px solid ${primary4};
    }
`;

// ----------------------------------------------------------------------------------------------------

export default TextInput;
