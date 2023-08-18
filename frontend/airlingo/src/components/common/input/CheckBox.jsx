import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { ReactComponent as CheckIcon } from "@/assets/icons/check-icon.svg";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary4 } = theme.colors;

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

const CheckBoxContainer = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const CheckBoxWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: solid 0.1rem black;
    border-color: ${(props) => (props.checked ? primary4 : "black")};
    border-radius: 0.3rem;
    background-color: ${(props) => (props.checked ? primary4 : "white")};
    transition: all 150ms;
    svg {
        visibility: ${(props) => (props.checked ? "visible" : "hidden")};
    }
`;

const HiddenCheckBoxWrapper = styled.input`
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
`;

export default CheckBox;
