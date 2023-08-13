/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextButton } from "@/components/common/button";
import { CheckBox } from "@/components/common/input";
import { ReactComponent as BackButton } from "@/assets/icons/back-button.svg";
import { ReactComponent as NextButton } from "@/assets/icons/next-button.svg";
import { ReactComponent as NoWordBackground } from "@/assets/icons/no-word-icon.svg";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";
import TabBar from "@/components/common/tab/TabBar.jsx";
import { selectUser } from "@/features/User/UserSlice.js";
import { getWordList, deleteWords, getWordTest } from "@/api/word";

// 모달 분리
import SelectDeleteModal from "@/components/modal/wordBook/SelectDeleteModal";
import NoSelectDeleteModal from "@/components/modal/wordBook/NoSelectDeleteModal";
import WordTestModal from "@/components/modal/wordBook/WordTestModal";
import NoWordTestModal from "@/components/modal/wordBook/NoWordTestModal";
import WordTestProgressModal from "@/components/modal/wordBook/WordTestProgressModal";
import WordTestEndModal from "@/components/modal/wordBook/WordTestEndModal";
import ReviewNoteModal from "@/components/modal/wordBook/ReviewNoteModal";
import { useRouter } from "@/hooks";

function WordBook() {
    const storeUser = useSelector(selectUser);
    const { userId } = storeUser;
    const { routeTo } = useRouter();

    // 단어 조회 ,삭제 관련
    const [AllWordList, setWordList] = useState([]); // 저장한 전체 단어
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [leftPageWordList, setLeftPageWordList] = useState([]); // 왼쪽 페이지
    const [rightPageWordList, setRightPageWordList] = useState([]); // 오른쪽 페이지
    const [isCheckedListLeft, setIsCheckedListLeft] = useState([]); // 왼쪽 페이지에서 선택된 단어 리스트
    const [isCheckedListRight, setIsCheckedListRight] = useState([]); // 오른쪽 페이지에서 선택된 단어 리스트
    const wordsPerPage = 5; // 한페이지에 단어 5개
    const [isAllSelected, setIsAllSelected] = useState(false); // 전체 선택
    // 단어 테스트 관련
    const [WordTestList, setWordTestList] = useState([]); // 단어 테스트 10개 불러오기
    const initialArray = Array(10).fill(""); // 시험지 배열 "" 으로 기본 설정
    const [TestInputList, setTestInputList] = useState(initialArray); // 단어 테스트 시험지
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // 테스트 보는 단어 번호
    const [correctCount, setCorrectCount] = useState(0); // 테스트 맞은 개수

    // 모달
    const [modalOpenSelectDelete, setModalOpenSelectDelete] = useState(false); // 선택 삭제
    const [modalOpenNoSelectedWords, setModalOpenNoSelectedWords] = useState(false); // 선택 단어 없음
    const [modalOpenWordTest, setModalOpenWordTest] = useState(false); // 단어 테스트 시작
    const [modalOpenNoWordTest, setModalOpenNoWordTest] = useState(false); // 단어 10개 미만으로 테스트 시작 불가
    const [modalOpenWordTestProgress, setModalOpenWordTestProgress] = useState(false); // 단어 테스트 진행 모달
    const [modalOpenWordTestEnd, setModalOpenWordTestEnd] = useState(false); // 단어 테스트 종료 모달
    const [modalOpenReviewNote, setModalOpenReviewNote] = useState(false); // 단어 테스트 종료 후 , 오답 확인

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
                routeTo,
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
                        // console.log("삭제를 성공했습니다.");
                        const updatedWordList = AllWordList.filter(
                            (word) => !selectedIds.includes(word.wordId),
                        );
                        setWordList(updatedWordList);
                        setModalOpenSelectDelete(false);
                    },
                },
                data: { userId, selectedIds },
                routeTo,
            });
        } catch (error) {
            // console.error("삭제 중 오류가 발생했습니다.", error);
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
                    routeTo,
                });
            } catch (error) {
                // console.error("삭제 중 오류가 발생했습니다.", error);
            }
        }
    };

    // 단어 테스트 종료
    const handleWordTestEnd = () => {
        setModalOpenWordTestProgress(false);
        let count = 0;
        // 시험지 채점
        for (let i = 0; i < WordTestList.length; i += 1) {
            if (TestInputList[i] === WordTestList[i].wordName) {
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
        <WordBookPageContainer id="SC">
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
                                <SelectDeleteModal
                                    modalOpenSelectDelete={modalOpenSelectDelete}
                                    selectedCount={selectedCount}
                                    handleConfirmDelete={handleConfirmDelete}
                                    handleCancelDelete={handleCancelDelete}
                                />
                            )}
                            {/* 선택한 단어가 없음 */}
                            {modalOpenNoSelectedWords && (
                                <NoSelectDeleteModal
                                    modalOpenNoSelectedWords={modalOpenNoSelectedWords}
                                    setModalOpenNoSelectedWords={setModalOpenNoSelectedWords}
                                />
                            )}
                            {/* 단어 테스트 시작 */}
                            {modalOpenWordTest && (
                                <WordTestModal
                                    modalOpenWordTest={modalOpenWordTest}
                                    handleWordTestStart={handleWordTestStart}
                                    setModalOpenWordTest={setModalOpenWordTest}
                                />
                            )}

                            {/* 단어 10개 미만으로 단어 테스트 시작 불가 */}
                            {modalOpenNoWordTest && (
                                <NoWordTestModal
                                    modalOpenNoWordTest={modalOpenNoWordTest}
                                    setModalOpenNoWordTest={setModalOpenNoWordTest}
                                />
                            )}

                            {/* 단어 테스트 진행 */}
                            {modalOpenWordTestProgress && (
                                <WordTestProgressModal
                                    modalOpenWordTestProgress={modalOpenWordTestProgress}
                                    TestInputList={TestInputList}
                                    currentWordIndex={currentWordIndex}
                                    setTestWordAtIndex={setTestWordAtIndex}
                                    setModalOpenWordTestProgress={setModalOpenWordTestProgress}
                                    setCurrentWordIndex={setCurrentWordIndex}
                                    handleWordTestEnd={handleWordTestEnd}
                                    WordTestList={WordTestList}
                                />
                            )}

                            {/* 단어 테스트 종료 모달 */}
                            {modalOpenWordTestEnd && (
                                <WordTestEndModal
                                    modalOpenWordTestEnd={modalOpenWordTestEnd}
                                    modalOpenWordTest={modalOpenWordTest}
                                    correctCount={correctCount}
                                    handleClickWordTestRetry={handleClickWordTestRetry}
                                    handleClickReviewNote={handleClickReviewNote}
                                    setModalOpenWordTestEnd={setModalOpenWordTestEnd}
                                />
                            )}

                            {/* 틀린 문제 */}
                            {modalOpenReviewNote && (
                                <ReviewNoteModal
                                    modalOpenReviewNote={modalOpenReviewNote}
                                    WordTestList={WordTestList}
                                    TestInputList={TestInputList}
                                    handleClickWordTestRetry2={handleClickWordTestRetry2}
                                    setModalOpenReviewNote={setModalOpenReviewNote}
                                />
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
                                            <WordName>{word.wordName}</WordName>
                                        </WordTop>
                                        <WordDown>
                                            <WordDescription>
                                                {word.wordDescription}
                                            </WordDescription>
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
                                            <WordName>{word.wordName}</WordName>
                                        </WordTop>
                                        <WordDown>
                                            <WordDescription>
                                                {word.wordDescription}
                                            </WordDescription>
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
    position: absolute;
    top: 201px;
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

const WordName = styled.div`
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

const WordDescription = styled.div`
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

const NoWordBackgroundBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export default WordBook;
