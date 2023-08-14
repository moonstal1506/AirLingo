/* eslint-disable react/prop-types */
import { DictionaryIcon } from "@/assets/icons";
import Modal from "../Modal";
import { ModalButtonBox, ModalTextWrapper } from "./MeetingModalStyle";
import { TextButton } from "@/components/common/button";

function ReportConfimModal({ isOpen, onClickAgree }) {
    return (
        isOpen && (
            <Modal
                zIdx={40}
                Icon={DictionaryIcon}
                title="신고하기"
                iconColor="red"
                titleColor="red"
            >
                <ModalTextWrapper weight="400px">
                    해당 랭커에 대한 신고가 정상적으로 접수되었습니다.
                </ModalTextWrapper>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="확인" onClick={onClickAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

export default ReportConfimModal;
