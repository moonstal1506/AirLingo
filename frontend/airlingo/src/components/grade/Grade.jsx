import PropTypes from "prop-types"; // prop-types를 import 해주세요
import styled from "@emotion/styled";

function Grade({ gradeName }) {
    let color = "var(--rainbow-red, #E96060)";
    let rank = "입문";
    if (gradeName.startsWith("B")) {
        color = "var(--rainbow-yellow, #EBC83D)";
        rank = "중급";
    } else if (gradeName.startsWith("C")) {
        color = "var(--rainbow-blue, #35B1C9)";
        rank = "상급";
    }

    return (
        <LanguageRankContainer color={color}>
            <LanguageRank>{rank}</LanguageRank>
            <LanguageGrade color={color}>({gradeName})</LanguageGrade>
        </LanguageRankContainer>
    );
}

Grade.propTypes = {
    gradeName: PropTypes.string.isRequired,
};

const LanguageRankContainer = styled.div`
    display: flex;
    color: ${(props) => props.color};
    width: 90px;
`;

const LanguageRank = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

const LanguageGrade = styled.div`
    font-size: 15px;
    font-weight: 400;
    display: flex;
    align-items: flex-end;
`;

export default Grade;
