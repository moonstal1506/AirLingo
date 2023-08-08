import styled from "@emotion/styled";
import { useState } from "react";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";
import TabBar from "@/components/common/tab/TabBar.jsx";
import { TextButton } from "@/components/common/button";
import { CheckBox, TextInput } from "@/components/common/input";
import { ReactComponent as LeftArrow } from "@/assets/icons/arrow-left-icon.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/delete-icon.svg";
import { ReactComponent as Unprogressed } from "@/assets/icons/Unprogressed.svg";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";

import Modal from "@/components/modal";

function WordBook() {
    const [isCheckedList, setIsCheckedList] = useState([false, false, false, false, false]);
    const [modalOpenAllDelete, setModalOpenAllDelete] = useState(false);
    const [modalOpenSelectDelete, setModalOpenSelectDelete] = useState(false);
    const [modalOpenWordTest, setModalOpenWordTest] = useState(false);
    const [modalOpenWordTestProgress, setModalOpenWordTestProgress] = useState(false);
    const [modalOpenWordTestEnd, setModalOpenWordTestEnd] = useState(false);

    // 전체 삭제
    const handleClickAllDelete = () => {
        setModalOpenAllDelete(true);
    };

    const handleWordAllDelete = () => {
        setModalOpenAllDelete(false); // 모달 닫기
    };

    // 체크박스
    const handleCheckBoxChange = (index) => {
        const updatedList = [...isCheckedList];
        updatedList[index] = !updatedList[index];
        setIsCheckedList(updatedList);
    };

    // 모달 안의 문구 선택 개수로 변경
    const getSelectedItemCount = () => {
        const checkedItemCount = isCheckedList.filter((isChecked) => isChecked).length;
        return checkedItemCount;
    };

    // 선택한 개수
    const selectedCount = getSelectedItemCount();

    // 선택 삭제
    const handleClickSelectDelete = () => {
        setModalOpenSelectDelete(true);
    };

    const handleWordSelectDelete = () => {
        setModalOpenSelectDelete(false); // 모달 닫기
    };

    // 단어 테스트 시작
    const handleClickWordTest = () => {
        setModalOpenWordTest(true);
    };

    // 단어 테스트 진행
    const handleWordTestStart = () => {
        setModalOpenWordTest(false); // 시작 모달 닫기
        setModalOpenWordTestProgress(true); // 테스트 진행 모달 열기
    };

    // 단어 테스트 종료
    const handleWordTestEnd = () => {
        setModalOpenWordTestProgress(false); // 테스트 진행 모달 닫기
        setModalOpenWordTestEnd(true); // 테스트 결과 모달 열기
    };

    // 단어 테스트 재시작
    const handleClickWordTestRetry = () => {
        setModalOpenWordTestEnd(false);
        setModalOpenWordTest(true);
    };

    return (
        <WordBigContainer>
            <BookContainer>
                <LeftPageBox id="LPBox">
                    <LeftPassportPages src={leftPassportPages} id="LPPS" />
                    <TabBar activeTab="statistic" id="TabBar" />
                    <LeftPassportPage id="LPP">
                        {/* 단어 전체 삭제 */}
                        {modalOpenAllDelete && (
                            <Modal
                                title="단어 삭제"
                                modalOpen={modalOpenAllDelete}
                                Icon={DeleteIcon}
                            >
                                <ModalTextBox>
                                    <ModalTextWrapper>
                                        정말로 단어를 모두 삭제 하시겠습니까?
                                    </ModalTextWrapper>
                                </ModalTextBox>
                                <ModalButtonBox>
                                    <TextButton
                                        shape="positive-curved"
                                        text="확인"
                                        onClick={handleWordAllDelete}
                                    />
                                    <TextButton
                                        shape="positive-curved"
                                        text="취소"
                                        onClick={() => setModalOpenAllDelete(false)}
                                    />
                                </ModalButtonBox>
                            </Modal>
                        )}
                        {/* 단어 선택 삭제 */}
                        {modalOpenSelectDelete && (
                            <Modal
                                title="단어 삭제"
                                modalOpen={modalOpenSelectDelete}
                                Icon={DeleteIcon}
                            >
                                <ModalTextBox>
                                    <ModalTextWrapper>
                                        정말로 선택한 {selectedCount}개의 단어를 삭제하시겠습니까?
                                    </ModalTextWrapper>
                                </ModalTextBox>
                                <ModalButtonBox>
                                    <TextButton
                                        shape="positive-curved"
                                        text="확인"
                                        onClick={handleWordSelectDelete}
                                    />
                                    <TextButton
                                        shape="positive-curved"
                                        text="취소"
                                        onClick={() => setModalOpenSelectDelete(false)}
                                    />
                                </ModalButtonBox>
                            </Modal>
                        )}
                        {/* 단어 테스트 시작 */}
                        {modalOpenWordTest && (
                            <Modal
                                title="단어 테스트"
                                modalOpen={modalOpenWordTest}
                                Icon={DeleteIcon}
                            >
                                <ModalTextBox>
                                    <ModalTextWrapper>
                                        단어 테스트는 단어장에 저장된 모든 단어 중
                                    </ModalTextWrapper>
                                    <ModalTextWrapper>
                                        <b>무작위로 선정된 10개</b>단어를 대상으로 진행됩니다.
                                    </ModalTextWrapper>
                                    <ModalTextWrapper>
                                        단어 테스트를 시작하시겠습니까?
                                    </ModalTextWrapper>
                                </ModalTextBox>
                                <ModalButtonBox>
                                    <TextButton
                                        shape="positive-curved"
                                        text="테스트 시작"
                                        onClick={handleWordTestStart}
                                    />
                                    <TextButton
                                        shape="positive-curved"
                                        text="취소"
                                        onClick={() => setModalOpenWordTest(false)}
                                    />
                                </ModalButtonBox>
                            </Modal>
                        )}
                        {/* 단어 테스트 진행  */}
                        {modalOpenWordTestProgress && (
                            <Modal
                                title="단어 테스트"
                                modalOpen={modalOpenWordTestProgress}
                                Icon={DeleteIcon}
                            >
                                <ModalTestBox>
                                    <Unprogressed />
                                    <ModalTestText>
                                        다음의 의미를 지니는 <span>영어</span> 단어를 작성해주세요.
                                    </ModalTestText>
                                    <ModalTextWord>
                                        <b>건드릴 수 없는, 손 댈 수 없는, 불가촉천민</b>
                                    </ModalTextWord>
                                    <TextInput
                                        placeholder="정답을 작성해 주세요."
                                        color="white"
                                        width="500px"
                                        height="50px"
                                    />
                                </ModalTestBox>
                                <ModalButtonBox>
                                    {/* 첫 단어 => 테스트 취소 / 다음 단어 버튼 
                        마지막 단어 => 이전 단어 / 테스트 종료
                        나머지 => 이전단어 / 다음 단어 */}
                                    {/* <TextButton
                            shape="positive-curved"
                            text="테스트 취소"
                            onClick={}
                        />
                        <TextButton
                            shape="positive-curved"
                            text="다음 단어"
                            onClick={}
                        /> */}

                                    {/* <TextButton
                            shape="positive-curved"
                            text="이전 단어"
                            onClick={}
                        />
                        <TextButton
                            shape="positive-curved"
                            text="다음 단어"
                            onClick={}
                        /> */}

                                    <TextButton
                                        shape="positive-curved"
                                        text="이전 단어"
                                        onClick={handleWordTestStart}
                                    />
                                    <TextButton
                                        shape="positive-curved"
                                        text="테스트 종료"
                                        onClick={handleWordTestEnd}
                                    />
                                </ModalButtonBox>
                            </Modal>
                        )}
                        {/* 단어 테스트 종료 모달 */}
                        {modalOpenWordTestEnd && (
                            <Modal
                                title="단어 테스트"
                                modalOpen={modalOpenWordTest}
                                Icon={DeleteIcon}
                            >
                                <ModalTextBox>
                                    <ModalTextWrapper>
                                        단어 테스트 결과 10문제 중 <span>7문제</span>를 맞췄습니다!
                                    </ModalTextWrapper>
                                    <ModalTextWrapper>
                                        단어 테스트를 다시 시작하시겠습니까?
                                    </ModalTextWrapper>
                                </ModalTextBox>
                                <ModalButtonBox>
                                    <TextButton
                                        shape="positive-curved"
                                        text="테스트 다시보기"
                                        onClick={handleClickWordTestRetry}
                                    />
                                    <TextButton
                                        shape="positive-curved"
                                        text="나가기"
                                        onClick={() => setModalOpenWordTestEnd(false)}
                                    />
                                </ModalButtonBox>
                            </Modal>
                        )}

                        <ButtonBox>
                            <WordBookButtonBox>
                                <ButtonRow1>
                                    <LeftArrowIcon />
                                    {/* <TextButton text="모든 언어" shape="negative-signup" /> */}
                                </ButtonRow1>
                            </WordBookButtonBox>
                            <WordBookButtonBox2>
                                <ButtonRow2>
                                    <TextButton
                                        text="전체 삭제"
                                        shape="negative-word"
                                        onClick={handleClickAllDelete}
                                    />
                                    <TextButton
                                        text="선택 삭제"
                                        shape="negative-word"
                                        onClick={handleClickSelectDelete}
                                    />
                                    <TextButton
                                        text="단어 테스트"
                                        shape="negative-signup"
                                        onClick={handleClickWordTest}
                                    />
                                </ButtonRow2>
                            </WordBookButtonBox2>
                        </ButtonBox>
                        <WordBox>
                            <WordItem>
                                <WordTop>
                                    <CheckBox
                                        checked={isCheckedList[0]}
                                        onChange={() => handleCheckBoxChange(0)}
                                    />
                                    <WordText>untouchable</WordText>
                                </WordTop>
                                <WordDown>
                                    <WordExplain>
                                        건드릴 수 없는, 손댈 수 없는, 불가촉천민{" "}
                                    </WordExplain>
                                </WordDown>
                            </WordItem>
                            <WordItem>
                                <WordTop>
                                    <CheckBox
                                        checked={isCheckedList[1]}
                                        onChange={() => handleCheckBoxChange(1)}
                                    />
                                    <WordText>untouchable</WordText>
                                </WordTop>
                                <WordDown>
                                    <WordExplain>
                                        건드릴 수 없는, 손댈 수 없는, 불가촉천민{" "}
                                    </WordExplain>
                                </WordDown>
                            </WordItem>
                            <WordItem>
                                <WordTop>
                                    <CheckBox
                                        checked={isCheckedList[2]}
                                        onChange={() => handleCheckBoxChange(2)}
                                    />
                                    <WordText>untouchable</WordText>
                                </WordTop>
                                <WordDown>
                                    <WordExplain>
                                        건드릴 수 없는, 손댈 수 없는, 불가촉천민{" "}
                                    </WordExplain>
                                </WordDown>
                            </WordItem>
                            <WordItem>
                                <WordTop>
                                    <CheckBox
                                        checked={isCheckedList[3]}
                                        onChange={() => handleCheckBoxChange(3)}
                                    />
                                    <WordText>untouchable</WordText>
                                </WordTop>
                                <WordDown>
                                    <WordExplain>
                                        건드릴 수 없는, 손댈 수 없는, 불가촉천민{" "}
                                    </WordExplain>
                                </WordDown>
                            </WordItem>
                            <WordItem>
                                <WordTop>
                                    <CheckBox
                                        checked={isCheckedList[4]}
                                        onChange={() => handleCheckBoxChange(4)}
                                    />
                                    <WordText>untouchable</WordText>
                                </WordTop>
                                <WordDown>
                                    <WordExplain>
                                        건드릴 수 없는, 손댈 수 없는, 불가촉천민{" "}
                                    </WordExplain>
                                </WordDown>
                            </WordItem>
                        </WordBox>
                    </LeftPassportPage>
                </LeftPageBox>
                <RightPageBox>
                    <LeftPassportPages src={rightPassportPages} />
                    <RightPassportPage />
                </RightPageBox>
            </BookContainer>
        </WordBigContainer>
    );
}

const WordBigContainer = styled.div`
    width: 100%;
    height: calc(100% - 120px);
    position: relative;
    font-family: Pretendard;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const BookContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 151px;
    width: 1015px;
    height: 755px;
`;

const LeftPageBox = styled.div`
    width: 510px;
    height: 755px;
`;

const LeftPassportPages = styled.img`
    margin-top: 5px;
    margin-left: 5px;
    position: absolute;
    z-index: -1;
`;

const LeftPassportPage = styled.div`
    width: 500px;
    height: 700px;
    flex-shrink: 0;
    border-radius: 20px 0px 0px 20px;
    border: 1px solid #000;
    background: #fff;
    margin-right: 10px;
`;
const RightPageBox = styled.div`
    width: 507px;
    height: 705px;
`;
const RightPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 0px 20px 20px 0px;
    border: 1px solid #000;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    display: flex;
`;
const WordBookButtonBox = styled.div`
    display: flex;
    width: 450px;
    height: 50px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    margin-top: 10px;
`;

const ButtonRow1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 460px;
    gap: 10px;
`;
const LeftArrowIcon = styled(LeftArrow)`
    width: 20px;
    height: 20px;
    fill: black;
`;

const WordBookButtonBox2 = styled.div`
    display: flex;
    width: 450px;
    height: 50px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    align-items: center;
`;
const ButtonRow2 = styled.div`
    display: flex;
    gap: 10px;
`;

const WordBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    display: flex;
`;

const WordItem = styled.div`
    display: flex;
    width: 460px;
    height: 95px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 20px;
    background: #eaeaea;
    margin-top: 10px;
`;

const WordTop = styled.div`
    display: flex;
    width: 400px;
    height: 40px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
`;

const WordText = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 10px;
`;
const WordDown = styled.div`
    border: black;
`;

const WordExplain = styled.div`
    display: flex;
    width: 400px;
    height: 25px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

// 모달
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
const ModalTestBox = styled.div``;
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

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 20px;
`;

export default WordBook;
