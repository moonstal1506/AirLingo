/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextButton } from "@/components/common/button";
import { CheckBox, TextInput } from "@/components/common/input";
import { ReactComponent as BackButton } from "@/assets/icons/back-button.svg";
import { ReactComponent as NextButton } from "@/assets/icons/next-button.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/delete-icon.svg";
import { ReactComponent as Unprogressed } from "@/assets/icons/Unprogressed.svg";
import { ReactComponent as NoWordBackground } from "@/assets/icons/no-word-icon.svg";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";
import Modal from "@/components/modal";
import TabBar from "@/components/common/tab/TabBar.jsx";
import { selectUser } from "@/features/User/UserSlice.js";
import { getWordList, deleteWords, getWordTest } from "@/api/word";

function WordBook() {
    const storeUser = useSelector(selectUser);
    const { userId } = storeUser;

    const wordsPerPage = 5; // 한페이지에 단어 5개
    const [modalOpenWordTest, setModalOpenWordTest] = useState(false);
    const [modalOpenWordTestProgress, setModalOpenWordTestProgress] = useState(false);
    const [modalOpenSelectDelete, setModalOpenSelectDelete] = useState(false);
    const [modalOpenNoSelectedWords, setModalOpenNoSelectedWords] = useState(false);
    const [modalOpenWordTestEnd, setModalOpenWordTestEnd] = useState(false);
    const [AllWordList, setWordList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAllSelected, setIsAllSelected] = useState(false);

    const [leftPageWordList, setLeftPageWordList] = useState([]);
    const [rightPageWordList, setRightPageWordList] = useState([]);
    const [isCheckedListLeft, setIsCheckedListLeft] = useState([]);
    const [isCheckedListRight, setIsCheckedListRight] = useState([]);

    const [WordTestList, setWordTestList] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const handleBackButtonClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 단어 조회
    useEffect(() => {
        async function fetchData() {
            await getWordList({
                responseFunc: {
                    200: (response) => {
                        setWordList(response.data.data);
                    },
                    473: () => {
                        setWordList([]);
                    }, // 단어가 없는 경우
                },
                data: { userId },
            });
        }
        fetchData();
    }, [userId]);

    useEffect(() => {
        setLeftPageWordList([
            ...AllWordList.slice((currentPage - 1) * wordsPerPage, currentPage * wordsPerPage),
        ]);
        setRightPageWordList([
            ...AllWordList.slice(currentPage * wordsPerPage, (currentPage + 1) * wordsPerPage),
        ]);
    }, [AllWordList, currentPage]);

    useEffect(() => {
        setIsCheckedListLeft([...Array(leftPageWordList.length)].map(() => false));
        setIsCheckedListRight([...Array(rightPageWordList.length)].map(() => false));
    }, [leftPageWordList, rightPageWordList]);

    // 체크박스
    const handleCheckBoxChangeLeft = (index) => {
        const updatedList = [...isCheckedListLeft];
        updatedList[index] = !updatedList[index];
        console.log(updatedList);
        setIsCheckedListLeft([...updatedList]);
    };
    const handleCheckBoxChangeRight = (index) => {
        const updatedList = [...isCheckedListRight];
        updatedList[index] = !updatedList[index];
        setIsCheckedListRight([...updatedList]);
    };

    // 모달 안의 문구 선택 개수로 변경
    const getSelectedItemCount = () => {
        const leftCheckedItemCount = isCheckedListLeft.filter(
            (value) => value !== undefined && value,
        ).length;
        const rightCheckedItemCount = isCheckedListRight.filter(
            (value) => value !== undefined && value,
        ).length;
        return leftCheckedItemCount + rightCheckedItemCount;
    };

    // 전체 선택 <-> 전체 선택 해제
    const handleSelectAll = () => {
        const updatedListLeft = isCheckedListLeft.map(() => !isAllSelected);
        const updatedListRight = isCheckedListRight.map(() => !isAllSelected);

        setIsCheckedListLeft(updatedListLeft);
        setIsCheckedListRight(updatedListRight);

        setIsAllSelected(!isAllSelected);
    };

    const getSelectedWordIds = () => {
        const selectedIdsLeft = isCheckedListLeft
            .map((checked, index) => (checked ? leftPageWordList[index]?.wordId : null))
            .filter((id) => id !== null && id !== undefined);

        const selectedIdsRight = isCheckedListRight
            .map((checked, index) => (checked ? rightPageWordList[index]?.wordId : null))
            .filter((id) => id !== null && id !== undefined);

        return [...selectedIdsLeft, ...selectedIdsRight];
    };

    // 선택한 개수
    const selectedCount = getSelectedItemCount();

    // 선택 삭제 확인
    const handleClickSelectDelete = () => {
        const selectedIds = getSelectedWordIds();

        if (selectedIds.length === 0) {
            // 선택된 단어가 없을 경우에 다른 모달을 띄움
            setModalOpenNoSelectedWords(true); // 새로운 상태 추가
        } else {
            setModalOpenSelectDelete(true);
        }
    };

    // 선택 삭제 취소
    const handleCancelDelete = () => {
        setModalOpenSelectDelete(false);
    };

    // 선택 삭제 확인
    const handleConfirmDelete = async () => {
        const selectedIds = getSelectedWordIds();
        try {
            await deleteWords({
                responseFunc: {
                    200: () => {
                        console.log("삭제를 성공했습니다.");
                        const updatedWordList = AllWordList.filter(
                            (word) => !selectedIds.includes(word.wordId),
                        );
                        setWordList(updatedWordList);
                        setModalOpenSelectDelete(false); // 모달 닫기
                    },
                },
                data: { userId, selectedIds },
            });
        } catch (error) {
            console.error("삭제 중 오류가 발생했습니다.", error);
        }
    };

    // 단어 테스트 시작
    const handleClickWordTest = () => {
        setModalOpenWordTest(true);
    };

    // 단어 테스트 진행
    const handleWordTestStart = async () => {
        if (modalOpenWordTest) {
            setModalOpenWordTest(false); // 시작 모달 닫기
            try {
                await getWordTest({
                    responseFunc: {
                        200: (response) => {
                            setWordTestList(response.data.data);
                            console.log(response.data.data);
                            console.log("성공!!");
                            setModalOpenWordTestProgress(true); // 테스트 진행 모달 열기
                            setCurrentWordIndex(0); // 첫 번째 단어부터 시작
                        },
                        473: () => {
                            setWordTestList([]);
                        }, // 단어테스트가 없는 경우
                    },
                    data: { userId },
                });
            } catch (error) {
                console.error("삭제 중 오류가 발생했습니다.", error);
            }
        }
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
                    {AllWordList.length === 0 ? (
                        <LeftPassportPage>
                            <NoWordBackgroundBox>
                                <NoWordBackground />
                            </NoWordBackgroundBox>
                        </LeftPassportPage>
                    ) : (
                        <LeftPassportPage id="LPP">
                            {/* 단어 선택 삭제 */}
                            {modalOpenSelectDelete && (
                                <Modal
                                    title="단어 삭제"
                                    modalOpen={modalOpenSelectDelete}
                                    Icon={DeleteIcon}
                                >
                                    <ModalTextBox>
                                        <ModalTextWrapper>
                                            정말로 선택한 {selectedCount}개의 단어를
                                            삭제하시겠습니까?
                                        </ModalTextWrapper>
                                    </ModalTextBox>
                                    <ModalButtonBox>
                                        <TextButton
                                            shape="positive-curved"
                                            text="확인"
                                            onClick={handleConfirmDelete}
                                        />
                                        <TextButton
                                            shape="positive-curved"
                                            text="취소"
                                            onClick={handleCancelDelete}
                                        />
                                    </ModalButtonBox>
                                </Modal>
                            )}
                            {/* 선택한 단어가 없음 */}
                            {modalOpenNoSelectedWords && (
                                <Modal
                                    title="알림"
                                    modalOpen={modalOpenNoSelectedWords}
                                    Icon={DeleteIcon}
                                >
                                    <ModalTextBox>
                                        <ModalTextWrapper>선택된 단어가 없습니다.</ModalTextWrapper>
                                        <ModalTextWrapper>
                                            삭제 할 단어를 선택해주세요.
                                        </ModalTextWrapper>
                                    </ModalTextBox>
                                    <ModalButtonBox>
                                        <TextButton
                                            shape="positive-curved"
                                            text="확인"
                                            onClick={() => setModalOpenNoSelectedWords(false)}
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
                            {/* // 단어 테스트 진행 */}
                            {modalOpenWordTestProgress && (
                                <Modal
                                    title="단어 테스트"
                                    modalOpen={modalOpenWordTestProgress}
                                    Icon={DeleteIcon}
                                >
                                    <ModalTestBox>
                                        <Unprogressed />
                                        <ModalTestText>
                                            다음의 의미를 지니는 <span>영어</span> 단어를
                                            작성해주세요.
                                        </ModalTestText>
                                        <ModalTextWord>
                                            <b>{WordTestList[currentWordIndex]?.wordDescription}</b>
                                        </ModalTextWord>
                                        <TextInput
                                            placeholder="정답을 작성해 주세요."
                                            color="white"
                                            width="500px"
                                            height="50px"
                                        />
                                    </ModalTestBox>
                                    <ModalButtonBox>
                                        <TestContent>
                                            {currentWordIndex === 0 && (
                                                <ModalButtonBox>
                                                    <TextButton
                                                        shape="positive-curved"
                                                        text="테스트 취소"
                                                        onClick={() =>
                                                            setModalOpenWordTestProgress(false)
                                                        }
                                                    />
                                                    <TextButton
                                                        shape="positive-curved"
                                                        text="다음 단어"
                                                        onClick={() =>
                                                            setCurrentWordIndex(
                                                                currentWordIndex + 1,
                                                            )
                                                        }
                                                    />
                                                </ModalButtonBox>
                                            )}
                                            {currentWordIndex === WordTestList.length - 1 && (
                                                <ModalButtonBox>
                                                    <TextButton
                                                        shape="positive-curved"
                                                        text="이전 단어"
                                                        onClick={() =>
                                                            setCurrentWordIndex(
                                                                currentWordIndex - 1,
                                                            )
                                                        }
                                                    />
                                                    <TextButton
                                                        shape="positive-curved"
                                                        text="테스트 종료"
                                                        onClick={handleWordTestEnd}
                                                    />
                                                </ModalButtonBox>
                                            )}
                                            {currentWordIndex > 0 &&
                                                currentWordIndex < WordTestList.length - 1 && (
                                                    <ModalButtonBox>
                                                        <TextButton
                                                            shape="positive-curved"
                                                            text="이전 단어"
                                                            onClick={() =>
                                                                setCurrentWordIndex(
                                                                    currentWordIndex - 1,
                                                                )
                                                            }
                                                        />
                                                        <TextButton
                                                            shape="positive-curved"
                                                            text="다음 단어"
                                                            onClick={() =>
                                                                setCurrentWordIndex(
                                                                    currentWordIndex + 1,
                                                                )
                                                            }
                                                        />
                                                    </ModalButtonBox>
                                                )}
                                        </TestContent>
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
                                            단어 테스트 결과 10문제 중 <span>7문제</span>를
                                            맞췄습니다!
                                        </ModalTextWrapper>
                                        <ModalTextWrapper>
                                            단어 테스트를 다시 시작하시겠습니까?
                                        </ModalTextWrapper>
                                    </ModalTextBox>
                                    <ModalButtonBox>
                                        <TextButton
                                            shape="positive-curved"
                                            text="재시험보기"
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
                                        <BackButtonIcon onClick={handleBackButtonClick} />
                                    </ButtonRow1>
                                </WordBookButtonBox>
                                <WordBookButtonBox2>
                                    <ButtonRow2>
                                        <TextButton
                                            text={isAllSelected ? "전체 선택" : "전체 선택"}
                                            shape="negative-word"
                                            onClick={handleSelectAll}
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
                                {leftPageWordList.map((word, index) => (
                                    <WordItem key={word.wordId}>
                                        <WordTop>
                                            <CheckBox
                                                checked={isCheckedListLeft[index]}
                                                onChange={() => handleCheckBoxChangeLeft(index)}
                                            />
                                            <WordText>{word.wordDescription}</WordText>
                                        </WordTop>
                                        <WordDown>
                                            <WordExplain>{word.wordName}</WordExplain>
                                        </WordDown>
                                    </WordItem>
                                ))}
                            </WordBox>
                        </LeftPassportPage>
                    )}
                </LeftPageBox>
                <RightPageBox>
                    <LeftPassportPages src={rightPassportPages} />
                    {AllWordList.length === 0 ? (
                        <RightPassportPage>
                            <NoWordBackgroundBox>
                                <NoWordBackground />
                            </NoWordBackgroundBox>
                        </RightPassportPage>
                    ) : (
                        <RightPassportPage>
                            <ButtonBox>
                                <WordBookButtonBox>
                                    <RightButtonRow1>
                                        {currentPage * wordsPerPage < AllWordList.length && (
                                            <NextButtonIcon
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                            />
                                        )}
                                    </RightButtonRow1>
                                </WordBookButtonBox>
                                <WordBookButtonBox2>
                                    <ButtonRow2 />
                                </WordBookButtonBox2>
                            </ButtonBox>
                            <WordBox>
                                {rightPageWordList.map((word, index) => (
                                    <WordItem key={word.wordId}>
                                        <WordTop>
                                            <CheckBox
                                                checked={isCheckedListRight[index]}
                                                onChange={() => handleCheckBoxChangeRight(index)}
                                            />
                                            <WordText>{word.wordDescription}</WordText>
                                        </WordTop>
                                        <WordDown>
                                            <WordExplain>{word.wordName}</WordExplain>
                                        </WordDown>
                                    </WordItem>
                                ))}
                            </WordBox>
                        </RightPassportPage>
                    )}
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
    justify-content: flex-end;
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
    flex-direction: column;
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
const RightButtonRow1 = styled.div`
    display: flex;
    justify-content: flex-end;
    text-align: right;
    width: 460px;
    gap: 10px;
`;

const BackButtonIcon = styled(BackButton)`
    cursor: pointer;
`;

const NextButtonIcon = styled(NextButton)`
    cursor: pointer;
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
    border: 1px red;
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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

const NoWordBackgroundBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const TestContent = styled.div``;

export default WordBook;
