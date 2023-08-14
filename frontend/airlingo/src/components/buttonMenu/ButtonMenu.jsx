import { PropTypes } from "prop-types";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { FabButton } from "../common/button";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";

function ButtonMenu({ className, buttonList }) {
    const { screenMode } = useSelector(selectMeeting);
    return (
        <ButtonMenuBox className={className} buttonList={buttonList}>
            {buttonList.map(
                ({ buttonName, icon, onClick, category, iconColor, alertMark = false }) => (
                    <ButtonBox>
                        {alertMark && <AlertMark />}
                        <FabButton
                            key={buttonName}
                            icon={icon}
                            onClick={onClick}
                            category={category}
                            iconColor={iconColor}
                            disabled={
                                ["Card", "Share", "Board"].includes(buttonName) &&
                                screenMode === "ScriptFeecback"
                            }
                        />
                    </ButtonBox>
                ),
            )}
        </ButtonMenuBox>
    );
}

const ButtonBox = styled.div`
    position: relative;
`;

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

const AlertMark = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    border-radius: 50px;
    background-color: ${({ theme }) => theme.colors.warning};
`;

ButtonMenu.propTypes = {
    className: PropTypes.string,
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

ButtonMenu.defaultProps = {
    className: "",
};

export default ButtonMenu;
