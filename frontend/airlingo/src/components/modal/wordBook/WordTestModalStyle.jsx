import styled from "@emotion/styled";

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 20px;
`;

const ModalTestBox = styled.div``;
const TestContent = styled.div``;
const ProgressBar = styled.div`
    width: 500px;
    height: 5px;
    background-color: #e3e3e3;
    position: relative;
    display: flex;
`;

const ProgressInnerBar = styled.div`
    width: ${({ currentWordIndex }) => 100 * ((currentWordIndex + 1) / 10)}%;
    background-color: ${({ theme }) => theme.colors.primary4};
`;

const ModalTestText = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 23px;
    font-style: normal;
    font-weight: 400;
    line-height: 44px;
    span {
        color: #00b4d8;
        font-weight: bolder;
    }
`;

const ModalTextWord = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 20px;
`;
export {
    ModalButtonBox,
    ModalTestBox,
    TestContent,
    ProgressBar,
    ProgressInnerBar,
    ModalTestText,
    ModalTextWord,
};
