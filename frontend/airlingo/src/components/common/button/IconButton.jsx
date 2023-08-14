import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "@/assets/styles/Theme";
import combineShape from "@/utils/style";
import { iconConfig } from "@/config";

// ----------------------------------------------------------------------------------------------------

const { primary3, primary4, primary7, warning } = theme.colors;
const shapeStyle = {
    filled: `
        background-color: ${primary4};
        border: none;
        &:hover {
            background-color: ${primary7};
            transition: ease-out 0.35s;
        }
    `,
    blacklined: `
        background-color: white;
        border: 3px solid black;
        &:hover {
            background-color: ${primary3};
            transition: ease-out 0.35s;
        }
    `,
    redlined: `
        background-color: white;
        border: 3px solid ${warning};
        &:hover {
            background-color: ${primary3};
            transition: ease-out 0.35s;
        }
    `,
    blacklinedlight: `
        background-color: white;
        border: 1px solid black;
        &:hover {
            background-color: ${primary3};
            transition: ease-out 0.35s;
        }
    `,
};

// ----------------------------------------------------------------------------------------------------

function IconButton({ type, icon: Icon, onClick, iconColor, shape }) {
    return (
        <IconButtonWrapper type={type} onClick={onClick} shape={shape}>
            <IconWrapper iconColor={iconColor}>
                <Icon width="25" height="25" />
            </IconWrapper>
        </IconButtonWrapper>
    );
}

IconButton.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    iconColor: PropTypes.string,
    shape: PropTypes.string,
};

IconButton.defaultProps = {
    type: "button",
    onClick: () => {},
    iconColor: "black",
    shape: "blacklined",
};

const IconButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    padding: 0;
    cursor: pointer;
    ${(props) => combineShape(shapeStyle, props.shape)}
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    svg path {
        fill: ${({ iconColor }) => iconConfig.color[iconColor]};
    }
`;

// ----------------------------------------------------------------------------------------------------

export default IconButton;
