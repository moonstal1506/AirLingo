/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { PropTypes } from "prop-types";
import { ValidationInvalidIcon } from "@/assets/icons";
import Modal from "../Modal";
import { ModalTextWrapper, ModalButtonBox } from "../meeting/MeetingModalStyle";
import { TextButton } from "@/components/common/button";

function LoginFailModal({ isOpen , onClickAgree}) {
    return (
        isOpen && (
            <Modal zIdx={4} Icon={ValidationInvalidIcon} title="로그인 실패!">
                <ModalTextWrapper weight="400px">
                    아이디 또는 비밀번호가 일치하지 않습니다.
                </ModalTextWrapper>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="확인" onClick={onClickAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

LoginFailModal.prototype = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
};

export default LoginFailModal;
