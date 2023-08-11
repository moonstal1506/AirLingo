import styled from "@emotion/styled";

const ModalTextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const ModalTextWrapper = styled.span`
    color: ${({ color }) => color};
    text-align: center;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 44px;
    span {
        color: #00b4d8;
        font-weight: bolder;
    }
`;
const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 20px;
`;

export { ModalTextBox, ModalTextWrapper, ModalButtonBox };
