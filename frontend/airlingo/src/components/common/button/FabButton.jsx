import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "@/assets/styles/Theme";
import combineShape from "@/utils/style";
import iconConfig from "@/config";

// ----------------------------------------------------------------------------------------------------

const { selection, warning } = theme.colors;
const categoryStyle = {
    white: `
        background-color: #FFFFFF;
        &:hover {
            transform: translateY(-10px) scale( 1.05, 1.05 );
            transition-duration: 0.5s;
        }
    `,
    red: `
        background-color: ${warning};
        &:hover {
            transform: translateY(-10px) scale( 1.05, 1.05 );
            transition-duration: 0.5s;
        }
    `,
    active: `
        background-color: ${selection};
        box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25) inset;
        filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0));
        transition-duration: 0.5s;
    `,
};

// ----------------------------------------------------------------------------------------------------

function FabButton({ type, icon: Icon, onClick, category, iconColor, disabled }) {
    return (
        <FabButtonWrapper type={type} onClick={onClick} category={category} disabled={disabled}>
            <IconWrapper iconColor={iconColor}>
                <Icon width="50" height="50" />
            </IconWrapper>
        </FabButtonWrapper>
    );
}

FabButton.propTypes = {
    type: PropTypes.string,
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    category: PropTypes.oneOf(["white", "red", "active"]),
    iconColor: PropTypes.string,
    disabled: PropTypes.bool,
};

FabButton.defaultProps = {
    type: "button",
    onClick: () => {},
    category: "white",
    iconColor: "default",
    disabled: false,
};

const FabButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: none;
    border-radius: 50%;
    padding: 0;
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25));
    cursor: pointer;
    pointer-events: auto;
    &:disabled {
        background-color: #343a40;
        opacity: 0.3;
        cursor: default;
        pointer-events: none;
        filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0));
    }
    ${({ category }) => combineShape(categoryStyle, category)}
`;

const IconWrapper = styled.div`
    display: block;
    width: 50px;
    height: 50px;
    svg path {
        fill: ${({ iconColor }) => iconConfig.color[iconColor]};
    }
`;

// ----------------------------------------------------------------------------------------------------

export default FabButton;
