import { PropTypes } from "prop-types";
import Modal from "../../Modal";
import { TextButton } from "@/components/common/button";
import { AlertIcon } from "@/assets/icons";
import {
    ModalTextBox,
    ModalTextWrapper,
    ModalSubTextWrapper,
    ModalButtonBox,
} from "./MatchHomeModalStyle";

function PremiumFailModal({ isOpen, onClickAgree, mileage }) {
    return (
        isOpen && (
            <Modal
                title="마일리지 부족"
                Icon={AlertIcon}
                iconColor="red"
                titleColor="red"
                messages={mileage}
            >
                <ModalTextBox>
                    <ModalTextWrapper>마일리지가 부족합니다</ModalTextWrapper>
                    <ModalSubTextWrapper>현재 마일리지: {mileage}</ModalSubTextWrapper>
                </ModalTextBox>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="확인" onClick={onClickAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

PremiumFailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
    mileage: PropTypes.number.isRequired,
};

export default PremiumFailModal;
