import { PropTypes } from "prop-types";
import { TextButton } from "@/components/common/button";
import Modal from "../Modal";
import { ModalTextWrapper, ModalButtonBox, ModalTextBox } from "./MeetingModalStyle";
import { DictionaryIcon } from "@/assets/icons";

function FeedbackEndRequestModal({ isOpen, onClickAgree, onClickDisAgree }) {
    return (
        isOpen && (
            <Modal zIdx={4} Icon={DictionaryIcon} title="스크립트 피드백 끝내기 요청">
                <ModalTextBox>
                    <ModalTextWrapper>
                        상대방으로부터 스크립트 피드백 끝내기 요청을 받았습니다.
                    </ModalTextWrapper>
                    <ModalTextWrapper>스크립트 피드백을 끝내시겠습니까?</ModalTextWrapper>
                </ModalTextBox>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="동의" onClick={onClickAgree} />
                    <TextButton shape="positive-curved" text="거절" onClick={onClickDisAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

FeedbackEndRequestModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
    onClickDisAgree: PropTypes.func.isRequired,
};

export default FeedbackEndRequestModal;
