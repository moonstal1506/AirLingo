import { PropTypes } from "prop-types";
import Modal from "@/components/modal";
import { TextButton } from "@/components/common/button";
import { ReactComponent as WordIcon } from "@/assets/icons/word-test-icon.svg";
import { ModalTextBox, ModalButtonBox, ModalTextWrapper } from "./WordBookModalStyle";

function WordTestModal({ modalOpenWordTest, handleWordTestStart, setModalOpenWordTest }) {
    return (
        modalOpenWordTest && (
            <Modal title="단어 테스트" modalOpen={modalOpenWordTest} Icon={WordIcon}>
                <ModalTextBox>
                    <ModalTextWrapper>단어 테스트는 단어장에 저장된 모든 단어 중</ModalTextWrapper>
                    <ModalTextWrapper>
                        <b>무작위로 선정된 10개</b> 단어를 대상으로 진행됩니다.
                    </ModalTextWrapper>
                    <ModalTextWrapper>단어 테스트를 시작하시겠습니까?</ModalTextWrapper>
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
        )
    );
}

WordTestModal.propTypes = {
    modalOpenWordTest: PropTypes.bool.isRequired,
    handleWordTestStart: PropTypes.func.isRequired,
    setModalOpenWordTest: PropTypes.func.isRequired,
};

export default WordTestModal;
