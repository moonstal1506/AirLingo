import styled from "@emotion/styled";

/*
input, textarea 우측에 icon버튼을 넣어주는 컴포넌트
*/

function MixIconButtonInput({ children }) {
    return <InputButtonGroupContainer>{children}</InputButtonGroupContainer>;
}

const InputButtonGroupContainer = styled.label`
    position: relative;
    display: inline-block;
    input,
    textarea {
        padding-right: 50px;
    }
    button {
        position: absolute;
        background-color: transparent;
        border: 0;
        width: 25px;
        height: 25px;
        top: 50%;
        right: 20px;
        transform: translate(0%, -50%);
    }
`;

export default MixIconButtonInput;
