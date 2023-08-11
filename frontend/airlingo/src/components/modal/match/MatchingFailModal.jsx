import { PropTypes } from "prop-types";
import { DictionaryIcon } from "@/assets/icons";
import Modal from "../Modal";
import { ModalTextBox, ModalTextWrapper, ModalButtonBox } from "../meeting/MeetingModalStyle";
import { TextButton } from "@/components/common/button";

function MatchingFailModal({ isOpen, onClickAgree, onClickDisAgree }) {
    return (
        isOpen && (
            <Modal zIdx={4} Icon={DictionaryIcon} title="매칭 실패">
                <ModalTextBox>
                    <ModalTextWrapper weight="400px">매칭에 실패하셨습니다.</ModalTextWrapper>
                    <ModalTextWrapper weight="400px">
                        계속 매칭을 진행하시겠습니까?
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

MatchingFailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
    onClickDisAgree: PropTypes.func.isRequired,
};

export default MatchingFailModal;
