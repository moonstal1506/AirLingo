import { PropTypes } from "prop-types";
import Modal from "@/components/modal";
import { TextButton } from "@/components/common/button";
import { ReactComponent as WordIcon } from "@/assets/icons/word-test-icon.svg";
import { TextInput } from "@/components/common/input";
import {
    ModalButtonBox,
    ModalTestBox,
    TestContent,
    ProgressBar,
    ProgressInnerBar,
    ModalTestText,
    ModalTextWord,
} from "./WordTestModalStyle";

function WordTestProgressModal({
    modalOpenWordTestProgress,
    TestInputList,
    currentWordIndex,
    setTestWordAtIndex,
    setModalOpenWordTestProgress,
    setCurrentWordIndex,
    handleWordTestEnd,
    WordTestList,
}) {
    return (
        modalOpenWordTestProgress && (
            <Modal title="단어 테스트" modalOpen={modalOpenWordTestProgress} Icon={WordIcon}>
                <ModalTestBox>
                    <ProgressBar>
                        <ProgressInnerBar currentWordIndex={currentWordIndex} />
                    </ProgressBar>
                    <ModalTestText>
                        다음의 의미를 지니는 <span>영어</span> 단어를 작성해주세요.
                    </ModalTestText>
                    <ModalTextWord>
                        <b>{WordTestList[currentWordIndex]?.wordDescription}</b>
                    </ModalTextWord>
                    <TextInput
                        placeholder="정답을 작성해 주세요."
                        color="white"
                        width="500px"
                        height="50px"
                        onChange={(event) =>
                            setTestWordAtIndex(currentWordIndex, event.target.value)
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
                                    onClick={() => setModalOpenWordTestProgress(false)}
                                />
                                <TextButton
                                    shape="positive-curved"
                                    text="다음 단어"
                                    onClick={() => setCurrentWordIndex(currentWordIndex + 1)}
                                />
                            </ModalButtonBox>
                        )}
                        {currentWordIndex === WordTestList.length - 1 && (
                            <ModalButtonBox>
                                <TextButton
                                    shape="positive-curved"
                                    text="이전 단어"
                                    onClick={() => setCurrentWordIndex(currentWordIndex - 1)}
                                />
                                <TextButton
                                    shape="positive-curved"
                                    text="테스트 종료"
                                    onClick={handleWordTestEnd}
                                />
                            </ModalButtonBox>
                        )}
                        {currentWordIndex > 0 && currentWordIndex < WordTestList.length - 1 && (
                            <ModalButtonBox>
                                <TextButton
                                    shape="positive-curved"
                                    text="이전 단어"
                                    onClick={() => setCurrentWordIndex(currentWordIndex - 1)}
                                />
                                <TextButton
                                    shape="positive-curved"
                                    text="다음 단어"
                                    onClick={() => setCurrentWordIndex(currentWordIndex + 1)}
                                />
                            </ModalButtonBox>
                        )}
                    </TestContent>
                </ModalButtonBox>
            </Modal>
        )
    );
}

WordTestProgressModal.propTypes = {
    modalOpenWordTestProgress: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    TestInputList: PropTypes.array.isRequired,
    currentWordIndex: PropTypes.number.isRequired,
    setTestWordAtIndex: PropTypes.func.isRequired,
    setModalOpenWordTestProgress: PropTypes.func.isRequired,
    setCurrentWordIndex: PropTypes.func.isRequired,
    handleWordTestEnd: PropTypes.func.isRequired,
    WordTestList: PropTypes.arrayOf(
        PropTypes.shape({
            wordId: PropTypes.string,
            wordName: PropTypes.string,
            wordDescription: PropTypes.string,
        }),
    ).isRequired,
};

export default WordTestProgressModal;
