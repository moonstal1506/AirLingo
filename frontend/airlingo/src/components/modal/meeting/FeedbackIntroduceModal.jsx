import { PropTypes } from "prop-types";
import { DictionaryIcon } from "@/assets/icons";
import Modal from "../Modal";
import { ModalTextWrapper, ModalContentBox, ModalButtonBox } from "./MeetingModalStyle";
import { TextButton } from "@/components/common/button";
import FeedbackIntroducePic from "@/assets/imgs/feedback-introduce.png";

function FeedbackIntroduceModal({ isOpen, onClickAgree }) {
    return (
        isOpen && (
            <Modal zIdx={40} Icon={DictionaryIcon} title="스크립트 피드백 이용법">
                <ModalTextWrapper weight="400px">
                    에디터는 꼭 다음과 같이 사용해주세요!
                </ModalTextWrapper>
                <ModalContentBox>
                    <img src={FeedbackIntroducePic} alt="feedbackintroduce" />
                </ModalContentBox>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="확인" onClick={onClickAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

FeedbackIntroduceModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
};

export default FeedbackIntroduceModal;
