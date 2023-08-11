import { PropTypes } from "prop-types";
import Modal from "@/components/modal";
import { TextButton } from "@/components/common/button";
import { ReactComponent as DeleteIcon } from "@/assets/icons/delete-icon.svg";
import { ModalTextBox, ModalButtonBox, ModalTextWrapper } from "./WordBookModalStyle";

function SelectDeleteModal({
    modalOpenSelectDelete,
    selectedCount,
    handleConfirmDelete,
    handleCancelDelete,
}) {
    return (
        modalOpenSelectDelete && (
            <Modal
                title="단어 삭제"
                modalOpen={modalOpenSelectDelete}
                Icon={DeleteIcon}
                iconColor="white"
                titleColor="red"
            >
                <ModalTextBox>
                    <ModalTextWrapper>
                        정말로 선택한 {selectedCount}개의 단어를 삭제하시겠습니까?
                    </ModalTextWrapper>
                </ModalTextBox>
                <ModalButtonBox>
                    <TextButton shape="positive-curved" text="확인" onClick={handleConfirmDelete} />
                    <TextButton shape="positive-curved" text="취소" onClick={handleCancelDelete} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

SelectDeleteModal.propTypes = {
    modalOpenSelectDelete: PropTypes.bool.isRequired,
    selectedCount: PropTypes.number.isRequired,
    handleConfirmDelete: PropTypes.func.isRequired,
    handleCancelDelete: PropTypes.func.isRequired,
};

export default SelectDeleteModal;
