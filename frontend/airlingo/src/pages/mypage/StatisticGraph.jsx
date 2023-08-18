import styled from "@emotion/styled";
import { StatisticGraphStudyCount, StatisticGraphStudyTime } from "@/pages/mypage";
import TabBar from "@/components/common/tab/TabBar.jsx";

function StatisticGraph() {
    return (
        <StatisticHomeContainer id="SC">
            <PassportContainer id="PC">
                <TabBarContainer>
                    <TabBar activeTab="statistic" id="TabBar" />
                </TabBarContainer>
                <StatisticGraphStudyTime />
                <StatisticGraphStudyCount />
            </PassportContainer>
        </StatisticHomeContainer>
    );
}

const StatisticHomeContainer = styled.div`
    position: relative;
    font-family: Pretendard;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PassportContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 151px;
`;

const TabBarContainer = styled.div`
    position: absolute;
    top: 201px;
`;

export default StatisticGraph;
