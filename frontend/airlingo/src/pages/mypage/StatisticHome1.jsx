import styled from "@emotion/styled";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";
import recordLogo from "@/assets/imgs/profiles/record-logo.png";
// import TabBar from "@/components/common/tab/TabBar.jsx";

function StatisticHome1() {
    return (
        // <StaticticPageContainer>
        //     <TabBar activeTab="statistic" id="TabBar" />
        <LeftPageBox id="LPBox">
            <LeftPassportPages src={leftPassportPages} id="LPPS" />
            <LeftPassportPage id="LPP">
                <LogoPageContainer id="LPC">
                    <LogoImage src={recordLogo} />
                    <PhraseBox>
                        <PhraseText>
                            <PhraseTextBold>기록</PhraseTextBold>과{" "}
                            <PhraseTextBold>통계</PhraseTextBold>를 통한 <br />
                            <PhraseTextBold>언어 학습</PhraseTextBold>을 경험해 보세요!
                        </PhraseText>
                    </PhraseBox>
                </LogoPageContainer>
            </LeftPassportPage>
        </LeftPageBox>
        // </StaticticPageContainer>
    );
}

// const StaticticPageContainer = styled.div`
//     position: relative;
//     width: 100%;
//     height: 100%;
// `;

const LeftPageBox = styled.div`
    width: 510px;
    height: 755px;
`;

const LeftPassportPages = styled.img`
    margin-top: 55px;
    margin-left: 5px;
    position: absolute;
    z-index: -1;
`;

const LeftPassportPage = styled.div`
    width: 500px;
    height: 700px;
    flex-shrink: 0;
    border-radius: 20px 0px 0px 20px;
    border: 1px solid #000;
    background: #fff;
    margin-right: 10px;
    margin-top: 50px;
`;

const LogoPageContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 238px;
    margin-left: 83px;
`;

const LogoImage = styled.img`
    width: 343px;
    height: 173px;
`;

const PhraseBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const PhraseText = styled.span`
    color: #000;
    text-align: center;
    width: 262px;
    height: 60px;
    font-size: 25px;
    font-weight: 200;
`;

const PhraseTextBold = styled.span`
    font-weight: 700;
`;

export default StatisticHome1;
