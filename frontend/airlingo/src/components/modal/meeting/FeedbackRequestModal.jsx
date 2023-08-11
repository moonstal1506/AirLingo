import { PropTypes } from "prop-types";
import { DictionaryIcon } from "@/assets/icons";
import Modal from "../Modal";
import { ModalTextBox, ModalTextWrapper, ModalButtonBox } from "./MeetingModalStyle";
import { TextButton } from "@/components/common/button";

function FeedbackRequestModal({ isOpen, onClickAgree, onClickDisAgree }) {
    return (
        isOpen && (
            <Modal zIdx={4} Icon={DictionaryIcon} title="스크립트 피드백 요청">
                <ModalTextBox>
                    <ModalTextWrapper weight="400px">
                        상대방으로부터 스크립트 피드백 요청을 받았습니다.
                    </ModalTextWrapper>
                    <ModalTextWrapper weight="400px">
                        스크립트 피드백을 진행하시겠습니까?
                    </ModalTextWrapper>
                </ModalTextBox>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="수락" onClick={onClickAgree} />
                    <TextButton shape="positive-curved" text="거절" onClick={onClickDisAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

FeedbackRequestModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
    onClickDisAgree: PropTypes.func.isRequired,
};

export default FeedbackRequestModal;
