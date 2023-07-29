import styled from "@emotion/styled";
import { ReactComponent as CheckIcon } from "@/assets/imgs/icons/check-icon.svg";

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

const CheckBoxWrapper = styled.div`
    display: flex;
    width: 18px;
    height: 18px;
    border: solid 0.1rem #d0d0d0;
    background: ${(props) => (props.checked ? "#D0D0D0" : "white")};
    border-radius: 0.4rem;
    transition: all 150ms;
    justify-content: center;
    align-items: center;
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
