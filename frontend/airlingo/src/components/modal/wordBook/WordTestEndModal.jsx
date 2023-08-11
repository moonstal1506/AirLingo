import { PropTypes } from "prop-types";
import Modal from "@/components/modal";
import { TextButton } from "@/components/common/button";
import { ReactComponent as WordIcon } from "@/assets/icons/word-test-icon.svg";
import { ModalTextBox, ModalButtonBox, ModalTextWrapper } from "./WordBookModalStyle";

function WordTestEndModal({
    modalOpenWordTestEnd,
    modalOpenWordTest,
    correctCount,
    handleClickWordTestRetry,
    handleClickReviewNote,
    setModalOpenWordTestEnd,
}) {
    return (
        modalOpenWordTestEnd && (
            <Modal title="단어 테스트" modalOpen={modalOpenWordTest} Icon={WordIcon}>
                <ModalTextBox>
                    <ModalTextWrapper>
                        단어 테스트 결과 10문제 중 <span>{correctCount}문제</span>를 맞췄습니다!
                    </ModalTextWrapper>
                    <ModalTextWrapper>단어 테스트를 다시 시작하시겠습니까?</ModalTextWrapper>
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
        )
    );
}

WordTestEndModal.propTypes = {
    modalOpenWordTestEnd: PropTypes.bool.isRequired,
    modalOpenWordTest: PropTypes.func.isRequired,
    correctCount: PropTypes.number.isRequired,
    handleClickWordTestRetry: PropTypes.func.isRequired,
    handleClickReviewNote: PropTypes.func.isRequired,
    setModalOpenWordTestEnd: PropTypes.func.isRequired,
};

export default WordTestEndModal;
