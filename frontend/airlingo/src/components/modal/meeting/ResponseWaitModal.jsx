import { PropTypes } from "prop-types";
import Modal from "../Modal";
import { ModalTextBox, ModalTextWrapper } from "./MeetingModalStyle";
import { DictionaryIcon } from "@/assets/icons";

function ResponseWaitModal({ title, isOpen }) {
    return (
        isOpen && (
            <Modal zIdx={40} Icon={DictionaryIcon} title={title}>
                <ModalTextBox>
                    <ModalTextWrapper>상대방의 응답을 대기중입니다...</ModalTextWrapper>
                </ModalTextBox>
            </Modal>
        )
    );
}

ResponseWaitModal.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default ResponseWaitModal;
