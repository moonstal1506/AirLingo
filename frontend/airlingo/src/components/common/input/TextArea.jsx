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

function TextArea({ placeholder, radius, width, height, maxLength, value, onChange, color }) {
    return (
        <TextAreaWrapper
            placeholder={placeholder}
            radius={radius}
            width={width}
            height={height}
            maxLength={maxLength}
            value={value}
            onChange={(e) => {
                onChange(e.target.value);
            }}
            color={color}
        />
    );
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    radius: PropTypes.oneOf(["small", "big"]),
    width: PropTypes.string,
    height: PropTypes.string,
    maxLength: PropTypes.number,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.string,
};

TextArea.defaultProps = {
    placeholder: "",
    radius: "small",
    width: "400px",
    height: "350px",
    maxLength: 255,
    color: "primary",
};

const TextAreaWrapper = styled.textarea`
    box-sizing: border-box;
    border-radius: ${({ radius }) => radiusObj[radius]};
    ${({ width, height }) => `
        width: ${width};
        height: ${height};
    `};
    border: 1px solid ${primary4};
    background-color: ${({ color }) => (color === "white" ? "white" : primary1)};
    outline: none;
    padding: 10px 20px;
    color: ${secondary3};
    font-size: 17px;
    font-weight: 500;
    resize: none;
    &::placeholder {
        color: ${primary4};
    }
    &:hover {
        cursor: pointer;
    }
    &:focus {
        border: 3px solid ${primary4};
    }
`;

export default TextArea;
