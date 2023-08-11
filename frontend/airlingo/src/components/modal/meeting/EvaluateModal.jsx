import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { ExitIcon } from "@/assets/icons";
import Modal from "../Modal";
import { ModalTextWrapper, ModalContentBox, ModalButtonBox } from "./MeetingModalStyle";
import StarRate from "@/components/starRate";
import Dropdown from "@/components/common/dropdown";
import { getGrade } from "@/api";
import { TextButton } from "@/components/common/button";
import { formatGrade } from "@/utils/format";

function EvaluateModal({ isOpen, onClickAgree, onClickDisAgree }) {
    const [rating, setRating] = useState(0);
    const [grade, setGrade] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState({});

    useEffect(() => {
        async function fetchData() {
            await getGrade({
                responseFunc: {
                    200: (response) => {
                        setGrade([...response.data.data]);
                    },
                },
            });
        }
        fetchData();
    }, []);

    return (
        isOpen && (
            <Modal zIdx={4} Icon={ExitIcon} title="상대 랭커 평가하기">
                <ModalTextWrapper weight="400px">
                    상대 랭커의 매너와 언어 실력에 대해서 평가를 남겨주세요!
                </ModalTextWrapper>
                <ModalContentBox>
                    <ModalTextWrapper weight="700px">매너 점수</ModalTextWrapper>
                    <StarRate rating={rating} setRating={setRating} />
                </ModalContentBox>
                <ModalContentBox>
                    <ModalTextWrapper weight="700px">실력 점수</ModalTextWrapper>
                    <Dropdown
                        width="400px"
                        placeholder="실력 점수를 선택해주세요"
                        onChange={setSelectedGrade}
                        selectedOption={selectedGrade}
                        data={grade.map((cur) => formatGrade(cur))}
                    />
                </ModalContentBox>
                <ModalButtonBox>
                    <TextButton
                        shape="positive-curved"
                        text="나가기"
                        onClick={() => onClickAgree(rating, grade)}
                    />
                    <TextButton shape="positive-curved" text="취소" onClick={onClickDisAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

EvaluateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClickAgree: PropTypes.func.isRequired,
    onClickDisAgree: PropTypes.func.isRequired,
};

export default EvaluateModal;
