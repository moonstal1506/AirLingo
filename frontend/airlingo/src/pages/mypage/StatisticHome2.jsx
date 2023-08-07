import styled from "@emotion/styled";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";
import { ReactComponent as TimeIcon } from "@/assets/icons/time-icon.svg";
import { ReactComponent as ArchiveIcon } from "@/assets/icons/archive-icon.svg";

function StatisticHome2() {
    return (
        <StaticticPageContainer>
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
        </StaticticPageContainer>
    );
}

const StaticticPageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const RightPageBox = styled.div`
    width: 507px;
    height: 705px;
`;

const LeftPassportPages = styled.img`
    margin-top: 5px;
    margin-left: 5px;
    position: absolute;
    z-index: -1;
`;

const RightPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 0px 20px 20px 0px;
    border: 1px solid #000;
    background: #fff;
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

export default StatisticHome2;
