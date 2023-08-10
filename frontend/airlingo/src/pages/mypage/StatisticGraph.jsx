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
    width: 100%;
    height: calc(100% - 120px);
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
    width: 1015px;
    height: 755px;
`;

const TabBarContainer = styled.div`
    position: relative;
    top: 50px;
    z-index: 1;
`;

export default StatisticGraph;
