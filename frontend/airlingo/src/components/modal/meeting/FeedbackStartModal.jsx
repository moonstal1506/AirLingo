import { PropTypes } from "prop-types";
import { DictionaryIcon } from "@/assets/icons";
import Modal from "../Modal";
import { ModalTextWrapper } from "./MeetingModalStyle";

function FeedbackStartModal({ isOpen }) {
    return (
        isOpen && (
            <Modal zIdx={40} Icon={DictionaryIcon} title="스크립트 피드백 요청">
                <ModalTextWrapper weight="400px">
                    상대방에게 스크립트 피드백 요청을 보냈습니다.
                </ModalTextWrapper>
            </Modal>
        )
    );
}
FeedbackStartModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default FeedbackStartModal;
