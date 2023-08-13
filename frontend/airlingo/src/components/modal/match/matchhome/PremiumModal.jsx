import { PropTypes } from "prop-types";
import { ModalButtonBox, ModalTextBox, ModalTextWrapper } from "./MatchHomeModalStyle";
import Modal from "../../Modal";
import { PremiumIcon } from "@/assets/icons";
import { TextButton } from "@/components/common/button";

function PremiumModal({ isOpen, onClickAgree, onClickDisAgree }) {
    return (
        isOpen && (
            <Modal title="프리미엄 매칭" Icon={PremiumIcon}>
                <ModalTextBox>
                    <div>
                        <ModalTextWrapper color="black">
                            프리미엄 매칭 시,
                            <ModalTextWrapper color="red"> 마일리지 3,000점</ModalTextWrapper>이
                            소모됩니다.
                        </ModalTextWrapper>
                    </div>
                    <ModalTextWrapper>프리미엄 매칭을 진행하시겠습니까?</ModalTextWrapper>
                </ModalTextBox>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="확인" onClick={onClickAgree} />
                    <TextButton shape="positive-curved" text="취소" onClick={onClickDisAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

PremiumModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
    onClickDisAgree: PropTypes.func.isRequired,
};

export default PremiumModal;
