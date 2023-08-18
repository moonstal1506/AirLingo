/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { DictionaryIcon } from "@/assets/icons";
import Modal from "../Modal";
import { ModalContentBox, ModalTextWrapper, ModalButtonBox } from "./MeetingModalStyle";
import Dropdown from "@/components/common/dropdown";
import { TextArea } from "@/components/common/input";
import { TextButton } from "@/components/common/button";
import { getReportItems } from "@/api";
import { formatReportItem } from "@/utils/format";
import { useRouter } from "@/hooks";

function ReportModal({ isOpen, onClickAgree, onClickDisAgree }) {
    const [reportState, setReportState] = useState({});
    const [reportText, setReportText] = useState("");
    const [reportList, setReportList] = useState([]);
    const { routeTo } = useRouter();
    useEffect(() => {
        async function fetchData() {
            await getReportItems({
                responseFunc: {
                    200: (response) => {
                        setReportList([...response.data.data].map((cur) => formatReportItem(cur)));
                    },
                },
                data: { languageCode: "KOR" },
                routeTo,
            });
        }
        fetchData();
    }, [routeTo]);

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
                    해당 랭커를 다음과 같은 사유로 신고하시겠습니까?
                </ModalTextWrapper>
                <ModalContentBox>
                    <ModalTextWrapper weight="700px">신고 사유</ModalTextWrapper>
                    <Dropdown
                        width="400px"
                        placeholder="신고 사유를 선택해주세요"
                        onChange={setReportState}
                        selectedOption={reportState}
                        data={reportList}
                        iconColor="white"
                    />
                </ModalContentBox>
                <ModalContentBox>
                    <ModalTextWrapper weight="700px">상세 내용</ModalTextWrapper>
                    <TextArea
                        placeholder="상세 내용을 작성해주세요."
                        radius="big"
                        height="300px"
                        value={reportText}
                        onChange={setReportText}
                    />
                </ModalContentBox>
                <ModalButtonBox>
                    <TextButton
                        shape="positive-curved"
                        text="신고"
                        onClick={() => onClickAgree(reportState, reportText)}
                    />
                    <TextButton shape="positive-curved" text="취소" onClick={onClickDisAgree} />
                </ModalButtonBox>
            </Modal>
        )
    );
}

export default ReportModal;
