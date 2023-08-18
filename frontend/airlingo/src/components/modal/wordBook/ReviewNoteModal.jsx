import { PropTypes } from "prop-types";
import Modal from "@/components/modal";
import { TextButton } from "@/components/common/button";
import { ReactComponent as WordIcon } from "@/assets/icons/word-test-icon.svg";
import {
    ModalReviewWordBox,
    ModalButtonBox,
    ModalTextWrapper,
    ReviewWord,
} from "./ReviewNoteModalStyle";

function ReviewNoteModal({
    modalOpenReviewNote,
    WordTestList,
    TestInputList,
    handleClickWordTestRetry2,
    setModalOpenReviewNote,
}) {
    return (
        modalOpenReviewNote && (
            <Modal title="틀린 문제" modalOpen={modalOpenReviewNote} Icon={WordIcon}>
                <ModalReviewWordBox>
                    {WordTestList.map((word, index) => {
                        const userAnswer = TestInputList[index];
                        if (userAnswer !== word.wordName) {
                            const displayIndex = index + 1;
                            return (
                                <ModalTextWrapper key={word.wordId}>
                                    <ReviewWord>
                                        {displayIndex}. {word.wordName} - {word.wordDescription}
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
        )
    );
}

ReviewNoteModal.propTypes = {
    modalOpenReviewNote: PropTypes.bool.isRequired,
    WordTestList: PropTypes.arrayOf(
        PropTypes.shape({
            wordId: PropTypes.string,
            wordName: PropTypes.string,
            wordDescription: PropTypes.string,
        }),
    ).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    TestInputList: PropTypes.array.isRequired,
    handleClickWordTestRetry2: PropTypes.func.isRequired,
    setModalOpenReviewNote: PropTypes.func.isRequired,
};

export default ReviewNoteModal;
