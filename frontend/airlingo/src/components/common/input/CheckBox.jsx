import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { ReactComponent as CheckIcon } from "@/assets/imgs/icons/check-icon.svg";
// import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

// const { primary4 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function CheckBox({ checked, onChange }) {
    return (
        <CheckBoxContainer>
            <HiddenCheckBoxWrapper type="checkbox" checked={checked} onChange={onChange} />
            <CheckBoxWrapper checked={checked}>
                <CheckIcon />
            </CheckBoxWrapper>
        </CheckBoxContainer>
    );
}

CheckBox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const CheckBoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: solid 0.1rem #d0d0d0;
    border-radius: 0.4rem;
    background: ${(props) => (props.checked ? "#D0D0D0" : "white")};
    transition: all 150ms;
    svg {
        visibility: ${(props) => (props.checked ? "visible" : "hidden")};
    }
`;

const CheckBoxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 18px;
    height: 18px;
    cursor: pointer;
`;

const HiddenCheckBoxWrapper = styled.input`
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
`;

export default CheckBox;
