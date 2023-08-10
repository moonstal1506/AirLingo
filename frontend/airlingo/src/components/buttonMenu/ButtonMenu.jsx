import { PropTypes } from "prop-types";
import styled from "@emotion/styled";
import { FabButton } from "../common/button";

function ButtonMenu({ buttonList }) {
    return (
        <ButtonMenuBox buttonList={buttonList}>
            {buttonList.map(({ buttonName, icon, onClick, category, iconColor }) => (
                <FabButton
                    key={buttonName}
                    icon={icon}
                    onClick={onClick}
                    category={category}
                    iconColor={iconColor}
                />
            ))}
        </ButtonMenuBox>
    );
}

const ButtonMenuBox = styled.div`
    position: fixed;
    display: flex;
    height: fit-content;
    flex-shrink: 0;
    left: 50%;
    margin-bottom: 20px;
    gap: 20px;
    z-index: 501;
    transform: translate(-50%, 0);
`;

ButtonMenu.propTypes = {
    buttonList: PropTypes.arrayOf(
        PropTypes.shape({
            buttonName: PropTypes.string.isRequired,
            icon: PropTypes.func.isRequired,
            onClick: PropTypes.func.isRequired,
            category: PropTypes.string,
            iconColor: PropTypes.string,
        }),
    ).isRequired,
};

export default ButtonMenu;
