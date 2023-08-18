import { PropTypes } from "prop-types";
import Modal from "@/components/modal";
import { TextButton } from "@/components/common/button";
import { ReactComponent as AlertIcon } from "@/assets/icons/alert-icon.svg";
import { ModalTextBox, ModalButtonBox, ModalTextWrapper } from "./WordBookModalStyle";

function NoWordTestModal({ modalOpenNoWordTest, setModalOpenNoWordTest }) {
    return (
        modalOpenNoWordTest && (
            <Modal
                title="알림"
                modalOpen={modalOpenNoWordTest}
                Icon={AlertIcon}
                iconColor="red"
                titleColor="red"
            >
                <ModalTextBox>
                    <ModalTextWrapper>단어 테스트는 단어장에 저장된 모든 단어가</ModalTextWrapper>
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
        )
    );
}

NoWordTestModal.propTypes = {
    modalOpenNoWordTest: PropTypes.bool.isRequired,
    setModalOpenNoWordTest: PropTypes.func.isRequired,
};

export default NoWordTestModal;
