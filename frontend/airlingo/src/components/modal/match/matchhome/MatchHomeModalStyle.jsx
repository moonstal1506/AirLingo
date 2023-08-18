import styled from "@emotion/styled";

const ModalTextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ModalSubTextWrapper = styled.div`
    font-size: 25px;
    font-weight: 700;
`;

const ModalTextWrapper = styled.span`
    color: ${({ color }) => color};
    text-align: center;
    font-size: 25px;
    font-weight: 400;
    line-height: 44px;
`;

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;

export { ModalTextBox, ModalButtonBox, ModalSubTextWrapper, ModalTextWrapper };
