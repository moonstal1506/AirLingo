import styled from "@emotion/styled";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";
import recordLogo from "@/assets/imgs/profiles/record-logo.png";
import { ReactComponent as TimeIcon } from "@/assets/imgs/icons/time-icon.svg";
import { ReactComponent as ArchiveIcon } from "@/assets/imgs/icons/archive-icon.svg";
import TabBar from "@/components/common/tab/TabBar.jsx";

const StatisticHomeContainer = styled.div`
    width: 100%;
    height: calc(100% - 120px);
    position: relative;
    font-family: Pretendard;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function StatisticHome() {
    const activeTab = "statistic";

    return (
        <StatisticHomeContainer id="SC">
            <PassportContainer id="PC">
                <LeftPageBox>
                    <LeftPassportPages src={leftPassportPages} />
                    <TabBar activeTab={activeTab} />
                    <LeftPassportPage>
                        <LogoPageContainer>
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
                <RightPageBox>
                    <LeftPassportPages src={rightPassportPages} />
                    <RightPassportPage>
                        <ButtonContainer>
                            <TotalStatisticsButtonContainer>
                                <TimeIcon />
                                <TitleText>전체 통계</TitleText>
                                <DescriptionText>
                                    에어링고와 얼마나 많은 시간을
                                    <br /> 함께 했는지 알아볼까요?
                                </DescriptionText>
                            </TotalStatisticsButtonContainer>
                            <TotalStatisticsButtonContainer>
                                <ArchiveIcon />
                                <TitleText>학습 아카이브</TitleText>
                                <DescriptionText>
                                    날짜별로 기록된 스크립트와 음성을
                                    <br /> 사용해 학습에 활용해 보세요!
                                </DescriptionText>
                            </TotalStatisticsButtonContainer>
                        </ButtonContainer>
                    </RightPassportPage>
                </RightPageBox>
            </PassportContainer>
        </StatisticHomeContainer>
    );
}

const PassportContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 151px;
    width: 1015px;
    height: 755px;
`;

const LeftPageBox = styled.div`
    width: 510px;
    height: 755px;
    flex-shrink: 0;
`;

const RightPageBox = styled.div`
    width: 507px;
    height: 705px;
    flex-shrink: 0;
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
    margin-bottom: 5px;
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

const RightPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 0px 20px 20px 0px;
    border: 1px solid #000;
    background: #fff;
    margin-right: 7px;
    margin-top: 50px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    display: inline-flex;
    height: 600px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`;

const TotalStatisticsButtonContainer = styled.div`
    display: flex;
    width: 400px;
    height: 235px;
    padding: 20px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 20px;
    border: 5px solid #000;
`;

const TitleText = styled.div`
    display: flex;
    width: 400px;
    height: 75px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-size: 50px;
    font-weight: 700;
`;

const DescriptionText = styled.div`
    display: flex;
    width: 300px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
`;

export default StatisticHome;
