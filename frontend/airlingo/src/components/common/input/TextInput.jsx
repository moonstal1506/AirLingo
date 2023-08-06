import styled from "@emotion/styled";
import PropTypes from "prop-types";

const radiusObj = {
    small: "10px",
    big: "20px",
};

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

const TextInputWrapper = styled.input`
    font-size: 20px;
    box-sizing: border-box;
    border-radius: ${({ radius }) => radiusObj[radius]};
    ${({ width, height }) => `
        width: ${width};
        height: ${height};
    `};
    border: 1px solid ${({ theme }) => theme.colors.primary4};
    background-color: ${({ theme, color }) =>
        color === "white" ? "white" : theme.colors.primary1};
    outline: none;
    padding: 0 20px;
    color: ${({ theme }) => theme.colors.secondary3};

    &::placeholder {
        color: ${({ theme }) => theme.colors.primary4};
    }
    &:hover {
        cursor: pointer;
    }
`;

export default TextInput;
