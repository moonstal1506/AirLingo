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
import { ReactComponent as WordIcon } from "@/assets/icons/word-test-icon.svg";
import { ReactComponent as AlertIcon } from "@/assets/icons/alert-icon.svg";
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

    // 단어 조회 ,삭제 관련
    const [AllWordList, setWordList] = useState([]); // 저장한 전체 단어
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [leftPageWordList, setLeftPageWordList] = useState([]); // 왼쪽 페이지
    const [rightPageWordList, setRightPageWordList] = useState([]); // 오른쪽 페이지
    const [isCheckedListLeft, setIsCheckedListLeft] = useState([]); // 왼쪽 페이지에서 선택된 단어 리스트
    const [isCheckedListRight, setIsCheckedListRight] = useState([]); // 오른쪽 페이지에서 선택된 단어 리스트
    const wordsPerPage = 5; // 한페이지에 단어 5개
    const [isAllSelected, setIsAllSelected] = useState(false); // 전체 선택
    const [modalOpenSelectDelete, setModalOpenSelectDelete] = useState(false); // 선택 삭제
    const [modalOpenNoSelectedWords, setModalOpenNoSelectedWords] = useState(false); // 선택 단어 없음

    // 단어 테스트 관련
    const [modalOpenWordTest, setModalOpenWordTest] = useState(false); // 단어 테스트 시작
    const [modalOpenNoWordTest, setModalOpenNoWordTest] = useState(false); // 단어 10개 미만으로 테스트 시작 불가
    const [WordTestList, setWordTestList] = useState([]); // 단어 테스트 10개 불러오기
    const [modalOpenWordTestProgress, setModalOpenWordTestProgress] = useState(false); // 단어 테스트 진행 모달
    const [modalOpenWordTestEnd, setModalOpenWordTestEnd] = useState(false); // 단어 테스트 종료 모달
    const [modalOpenReviewNote, setModalOpenReviewNote] = useState(false); // 단어 테스트 종료 후 , 오답 확인

    const initialArray = Array(10).fill(""); // 시험지 배열 "" 으로 기본 설정
    const [TestInputList, setTestInputList] = useState(initialArray); // 단어 테스트 시험지
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // 테스트 보는 단어 번호
    const [correctCount, setCorrectCount] = useState(0); // 테스트 맞은 개수

    const setTestWordAtIndex = (index, value) => {
        // 단어 테스트 진행
        const updatedTestInputList = [...TestInputList];
        updatedTestInputList[index] = value;
        setTestInputList(updatedTestInputList);
    };

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

    // 왼쪽 오른쪽 페이지 이동
    useEffect(() => {
        setLeftPageWordList([
            ...AllWordList.slice((currentPage - 1) * wordsPerPage, currentPage * wordsPerPage),
        ]);
        setRightPageWordList([
            ...AllWordList.slice(currentPage * wordsPerPage, (currentPage + 1) * wordsPerPage),
        ]);
    }, [AllWordList, currentPage]);

    // 왼쪽 오른쪽 페이지 체크
    useEffect(() => {
        setIsCheckedListLeft([...Array(leftPageWordList.length)].map(() => false));
        setIsCheckedListRight([...Array(rightPageWordList.length)].map(() => false));
    }, [leftPageWordList, rightPageWordList]);

    // 체크박스 관련
    const handleCheckBoxChangeLeft = (index) => {
        const updatedList = [...isCheckedListLeft];
        updatedList[index] = !updatedList[index];
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

    // 선택 단어 관련
    const getSelectedWordIds = () => {
        const selectedIdsLeft = isCheckedListLeft
            .map((checked, index) => (checked ? leftPageWordList[index]?.wordId : null))
            .filter((id) => id !== null && id !== undefined);

        const selectedIdsRight = isCheckedListRight
            .map((checked, index) => (checked ? rightPageWordList[index]?.wordId : null))
            .filter((id) => id !== null && id !== undefined);

        return [...selectedIdsLeft, ...selectedIdsRight];
    };

    // 선택 개수
    const selectedCount = getSelectedItemCount();

    // 선택 삭제 모달
    const handleClickSelectDelete = () => {
        const selectedIds = getSelectedWordIds();

        if (selectedIds.length === 0) {
            setModalOpenNoSelectedWords(true); // 선택 단어 없음
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
                        setModalOpenSelectDelete(false);
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
        setTestInputList(initialArray);
        setModalOpenWordTest(true);
    };

    // 단어 테스트 시작 불가
    const handleClickNoWordTest = () => {
        setTestInputList(initialArray);
        setModalOpenNoWordTest(true);
    };

    // 단어 테스트 진행
    const handleWordTestStart = async () => {
        if (modalOpenWordTest) {
            setModalOpenWordTest(false);
            try {
                await getWordTest({
                    responseFunc: {
                        200: (response) => {
                            setWordTestList(response.data.data);
                            setModalOpenWordTestProgress(true);
                            setCurrentWordIndex(0); // 첫 번째 단어부터 시작
                        },
                        // 단어테스트가 없는 경우
                        473: () => {
                            setWordTestList([]);
                        },
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
        setModalOpenWordTestProgress(false);
        let count = 0;
        // 시험지 채점
        for (let i = 0; i < WordTestList.length; i += 1) {
            if (TestInputList[i] === WordTestList[i].wordDescription) {
                count += 1;
            }
        }
        setCorrectCount(count);
        setModalOpenWordTestEnd(true);
    };

    // 단어 테스트 재시작
    const handleClickWordTestRetry = () => {
        setTestInputList(initialArray);
        setModalOpenWordTestEnd(false);
        setModalOpenReviewNote(true);
    };

    // 오답 노트
    const handleClickReviewNote = () => {
        setModalOpenWordTestEnd(false);
        setModalOpenReviewNote(true);
    };
    // 오답 노트 후 , 단어 테스트 재시작
    const handleClickWordTestRetry2 = () => {
        setModalOpenReviewNote(false);
        setTestInputList(initialArray);
        setModalOpenWordTest(true);
    };

    return (
        <WordBookPageContainer>
            <PassportContainer id="PC">
                <TabBarContainer>
                    <TabBar activeTab="wordbook" id="TabBar" />
                </TabBarContainer>
                <LeftPageBox id="LPBox">
                    <LeftPassportPages src={leftPassportPages} id="LPPS" />
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
                                    iconColor="white"
                                    titleColor="red"
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
                                    Icon={AlertIcon}
                                    iconColor="red"
                                    titleColor="red"
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
                                    Icon={WordIcon}
                                >
                                    <ModalTextBox>
                                        <ModalTextWrapper>
                                            단어 테스트는 단어장에 저장된 모든 단어 중
                                        </ModalTextWrapper>
                                        <ModalTextWrapper>
                                            <b>무작위로 선정된 10개</b> 단어를 대상으로 진행됩니다.
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

                            {/* 단어 10개 미만으로 단어 테스트 시작 불가 */}
                            {modalOpenNoWordTest && (
                                <Modal
                                    title="알림"
                                    modalOpen={modalOpenNoWordTest}
                                    Icon={AlertIcon}
                                    iconColor="red"
                                    titleColor="red"
                                >
                                    <ModalTextBox>
                                        <ModalTextWrapper>
                                            단어 테스트는 단어장에 저장된 모든 단어가
                                        </ModalTextWrapper>
                                        <ModalTextWrapper>
                                            최소 <b>10개 이상</b>의 단어가 있을 때 진행됩니다.
                                        </ModalTextWrapper>
                                        <ModalTextWrapper color="red">
                                            <b>단어 수가 부족합니다</b>.
                                        </ModalTextWrapper>
                                    </ModalTextBox>
                                    <ModalButtonBox>
                                        <TextButton
                                            shape="positive-curved"
                                            text="닫기"
                                            onClick={() => setModalOpenNoWordTest(false)}
                                        />
                                    </ModalButtonBox>
                                </Modal>
                            )}

                            {/* // 단어 테스트 진행 */}
                            {modalOpenWordTestProgress && (
                                <Modal
                                    title="단어 테스트"
                                    modalOpen={modalOpenWordTestProgress}
                                    Icon={WordIcon}
                                >
                                    <ModalTestBox>
                                        <ProgressBar>
                                            <ProgressInnerBar currentWordIndex={currentWordIndex} />
                                        </ProgressBar>
                                        <ModalTestText>
                                            다음의 의미를 지니는 <span>영어</span> 단어를
                                            작성해주세요.
                                        </ModalTestText>
                                        <ModalTextWord>
                                            <b>{WordTestList[currentWordIndex]?.wordName}</b>
                                        </ModalTextWord>
                                        <TextInput
                                            placeholder="정답을 작성해 주세요."
                                            color="white"
                                            width="500px"
                                            height="50px"
                                            onChange={(event) =>
                                                setTestWordAtIndex(
                                                    currentWordIndex,
                                                    event.target.value,
                                                )
                                            }
                                            value={TestInputList[currentWordIndex]}
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
                                    Icon={WordIcon}
                                >
                                    <ModalTextBox>
                                        <ModalTextWrapper>
                                            단어 테스트 결과 10문제 중{" "}
                                            <span>{correctCount}문제</span>를 맞췄습니다!
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
                                        {correctCount === 10 ? (
                                            // 틀린 문제 없음
                                            " "
                                        ) : (
                                            <TextButton
                                                shape="positive-curved"
                                                text="틀린 문제"
                                                onClick={handleClickReviewNote}
                                            />
                                        )}

                                        <TextButton
                                            shape="positive-curved"
                                            text="나가기"
                                            onClick={() => setModalOpenWordTestEnd(false)}
                                        />
                                    </ModalButtonBox>
                                </Modal>
                            )}

                            {/* 오답 노트 */}
                            {modalOpenReviewNote && (
                                <Modal
                                    title="틀린 문제"
                                    modalOpen={modalOpenReviewNote}
                                    Icon={WordIcon}
                                >
                                    <ModalReviewWordBox>
                                        {WordTestList.map((word, index) => {
                                            const userAnswer = TestInputList[index];
                                            if (userAnswer !== word.wordDescription) {
                                                const displayIndex = index + 1;
                                                return (
                                                    <ModalTextWrapper key={word.wordId}>
                                                        <ReviewWord>
                                                            {displayIndex}. {word.wordName} -{" "}
                                                            {word.wordDescription}
                                                        </ReviewWord>
                                                    </ModalTextWrapper>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ModalReviewWordBox>
                                    <ModalButtonBox>
                                        <TextButton
                                            shape="positive-curved"
                                            text="재시험보기"
                                            onClick={handleClickWordTestRetry2}
                                        />

                                        <TextButton
                                            shape="positive-curved"
                                            text="나가기"
                                            onClick={() => setModalOpenReviewNote(false)}
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
                                        {AllWordList.length >= 10 ? (
                                            <TextButton
                                                text="단어 테스트"
                                                shape="negative-signup"
                                                onClick={handleClickWordTest}
                                            />
                                        ) : (
                                            // 단어가 10개 미만으로 테스트 불가
                                            <TextButton
                                                text="단어 테스트"
                                                shape="negative-signup"
                                                onClick={handleClickNoWordTest}
                                            />
                                        )}
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
            </PassportContainer>
        </WordBookPageContainer>
    );
}

const WordBookPageContainer = styled.div`
    width: 100%;
    height: calc(100% - 120px);
    position: relative;
    font-family: Pretendard;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PassportContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 151px;
    width: 1015px;
    height: 755px;
`;

const LeftPageBox = styled.div`
    width: 510px;
    height: 755px;
    flex-shrink: 0;
`;

const LeftPassportPages = styled.img`
    margin-top: 55px;
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
    margin-top: 50px;
    margin-bottom: 5px;
`;

const TabBarContainer = styled.div`
    position: relative;
    top: 50px;
`;

const RightPageBox = styled.div`
    width: 507px;
    height: 705px;
    flex-shrink: 0;
`;

const RightPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 0px 20px 20px 0px;
    border: 1px solid #000;
    background: #fff;
    display: flex;
    align-items: center;
    margin-top: 50px;
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

const ModalTextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ModalReviewWordBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
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

const ReviewWord = styled.div`
    align-items: flex-start;
`;

export default WordBook;
