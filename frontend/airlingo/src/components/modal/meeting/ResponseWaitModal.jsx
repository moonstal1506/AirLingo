import { PropTypes } from "prop-types";
import Modal from "../Modal";
import { ModalTextBox, ModalTextWrapper } from "./MeetingModalStyle";
import { DictionaryIcon } from "@/assets/icons";

function ResponseWaitModal({ isOpen }) {
    return (
        isOpen && (
            <Modal zIdx={4} Icon={DictionaryIcon} title="상대방의 응답 대기">
                <ModalTextBox>
                    <ModalTextWrapper>상대방의 응답을 대기중입니다...</ModalTextWrapper>
                </ModalTextBox>
            </Modal>
        )
    );
}

ResponseWaitModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default ResponseWaitModal;
