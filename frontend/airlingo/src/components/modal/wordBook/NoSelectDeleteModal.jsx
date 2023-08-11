import { PropTypes } from "prop-types";
import Modal from "@/components/modal";
import { TextButton } from "@/components/common/button";
import { ReactComponent as AlertIcon } from "@/assets/icons/alert-icon.svg";
import { ModalTextBox, ModalButtonBox, ModalTextWrapper } from "./WordBookModalStyle";

function NoSelectDeleteModal({ modalOpenNoSelectedWords, setModalOpenNoSelectedWords }) {
    return (
        modalOpenNoSelectedWords && (
            <Modal
                title="알림"
                modalOpen={modalOpenNoSelectedWords}
                Icon={AlertIcon}
                iconColor="red"
                titleColor="red"
            >
                <ModalTextBox>
                    <ModalTextWrapper>선택된 단어가 없습니다.</ModalTextWrapper>
                    <ModalTextWrapper>삭제 할 단어를 선택해주세요.</ModalTextWrapper>
                </ModalTextBox>
                <ModalButtonBox>
                    <TextButton
                        shape="positive-curved"
                        text="확인"
                        onClick={() => setModalOpenNoSelectedWords(false)}
                    />
                </ModalButtonBox>
            </Modal>
        )
    );
}

NoSelectDeleteModal.propTypes = {
    modalOpenNoSelectedWords: PropTypes.bool.isRequired,
    setModalOpenNoSelectedWords: PropTypes.func.isRequired,
};

export default NoSelectDeleteModal;
