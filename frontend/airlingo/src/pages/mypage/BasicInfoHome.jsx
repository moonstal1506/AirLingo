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

export default BasicInfoHome;
