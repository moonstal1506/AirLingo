import styled from "@emotion/styled";
import { StatisticHome1, StatisticHome2 } from "@/pages/mypage";
import TabBar from "@/components/common/tab/TabBar.jsx";

function StatisticHome() {
    return (
        <StatisticHomeContainer id="SC">
            <PassportContainer id="PC">
                <TabBarContainer>
                    <TabBar activeTab="statistic" id="TabBar" />
                </TabBarContainer>
                <StatisticHome1 />
                <StatisticHome2 />
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
`;

export default StatisticHome;
