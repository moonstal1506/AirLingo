import styled from "@emotion/styled";

function Button({ type, text, onClick, shape = "normal", icon }) {
    return (
        <ButtonWrapper type={type} onClick={onClick} shape={shape}>
            {text ?? text}
            {icon ?? <icon />}
        </ButtonWrapper>
    );
}

const ButtonWrapper = styled.button`
    min-width: 150px;
    height: 50px;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    background-color: ${(props) => props.theme.colors.primary4};
    color: white;
    font-size: 16px;
    font-weight: 600;

    ${(props) =>
        props.shape === "normal" &&
        `
        border-radius: 10px;
    `}

    ${(props) =>
        props.shape === "rounded" &&
        `
        border-radius: 25px;
    `}
`;

export default Button;
