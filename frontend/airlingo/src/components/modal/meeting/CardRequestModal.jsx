import { PropTypes } from "prop-types";
import { TextButton } from "@/components/common/button";
import Modal from "../Modal";
import { ModalTextBox, ModalButtonBox, ModalTextWrapper } from "./MeetingModalStyle";
import { DictionaryIcon } from "@/assets/icons";

function CardRequestModal({ isOpen, cardCode, onClickAgree, onClickDisAgree }) {
    return (
        isOpen && (
            <Modal zIdx={40} Icon={DictionaryIcon} title="대화 주제 선택 요청">
                <ModalTextBox>
                    <div>
                        <ModalTextWrapper color="black">
                            상대방이
                            <ModalTextWrapper color="red"> {cardCode} </ModalTextWrapper>를 대화
                            대주제로 선택했습니다.
                        </ModalTextWrapper>
                    </div>
                    <ModalTextWrapper>
                        동의 시, 대주제에 대한 세부주제가 선택됩니다.
                    </ModalTextWrapper>
                </ModalTextBox>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="동의" onClick={onClickAgree} />
                    <TextButton shape="positive-curved" text="거절" onClick={onClickDisAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

CardRequestModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    cardCode: PropTypes.string.isRequired,
    onClickAgree: PropTypes.func.isRequired,
    onClickDisAgree: PropTypes.func.isRequired,
};

export default CardRequestModal;
