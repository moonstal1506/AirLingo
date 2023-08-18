import styled from "@emotion/styled";
import { BasicInfoPage1, BasicInfoPage2 } from "@/pages/mypage";
import TabBar from "@/components/common/tab/TabBar.jsx";

function BasicInfoHome() {
    return (
        <BasicInfoHomeContainer id="SC">
            <PassportContainer id="PC">
                <TabBarContainer>
                    <TabBar activeTab="basicinfo" id="TabBar" />
                </TabBarContainer>
                <BasicInfoPage1 />
                <BasicInfoPage2 />
            </PassportContainer>
        </BasicInfoHomeContainer>
    );
}

const BasicInfoHomeContainer = styled.div`
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

export default BasicInfoHome;
