import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import Overlay from "@/components/common/overlay";
import { getCardCode } from "@/api";
import { useRouter } from "@/hooks";

function CardModal({ isOpen, onClick }) {
    const [cardCode, setCardCode] = useState([]);
    const { routeTo } = useRouter();

    useEffect(() => {
        async function fetchData() {
            await getCardCode({
                responseFunc: {
                    200: (response) => {
                        setCardCode([...response.data.data]);
                    },
                },
                routeTo,
            });
        }
        fetchData();
    }, [routeTo]);

    return (
        isOpen && (
            <Overlay zIdx={30}>
                <CardModalContainer>
                    <TopicCardBox onClick={onClick}>
                        {cardCode.map((cur) => (
                            <TopicCard id={cur.code}>
                                <TopicCardTitle>{cur.korSubject}</TopicCardTitle>
                                <TopicCardSubTitle>{cur.engSubject}</TopicCardSubTitle>
                            </TopicCard>
                        ))}
                    </TopicCardBox>
                </CardModalContainer>
            </Overlay>
        )
    );
}

CardModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const CardModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
`;

const TopicCardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 20px; // 각 카드 사이의 간격을 조절하려면 여기 값을 변경하세요
    align-items: center;
    align-content: center;
    width: 80%;
    height: 70%;
    justify-content: center;
`;

const TopicCard = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 20px;
    background: #d9d9d9;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    cursor: pointer;
    width: 100%;
    height: 100%;
`;

const TopicCardTitle = styled.span`
    color: #000;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    line-height: normal;
`;
const TopicCardSubTitle = styled.span`
    color: #000;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
`;

export default CardModal;
