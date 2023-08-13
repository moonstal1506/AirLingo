/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import styled from "@emotion/styled";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "@/hooks";
import { ReactComponent as Red } from "@/assets/icons/language-red-icon.svg";
import { ReactComponent as Green } from "@/assets/icons/language-green-icon.svg";
import { ReactComponent as Orange } from "@/assets/icons/language-orange-icon.svg";
import { ReactComponent as Purlple } from "@/assets/icons/language-purple-icon.svg";
import { ReactComponent as Blue } from "@/assets/icons/language-blue-icon.svg";
import { ReactComponent as YelloW } from "@/assets/icons/language-yellow-icon.svg";
import { ReactComponent as BackButton } from "@/assets/icons/back-button.svg";
import { getRecordStatistic } from "@/api";
import { selectUser } from "@/features/User/UserSlice";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";

function StudyTimeStatistic() {
    const [data, setData] = useState(null);
    const { routeTo } = useRouter();
    const [totalStudyTime, setTotalStudyTime] = useState(0);
    const { userId } = useSelector(selectUser);
    const colors = {
        한국어: "#E96060",
        영어: "#35B1C9",
        일본어: "#EBA004",
        프랑스어: "#B06DAD",
        중국어: "#BADF55",
        스페인어: "#EBC83D",
        // 필요한 만큼 추가
    };

    const centerTextPlugin = {
        id: "centerText",
        afterDraw: (chart) => {
            const { ctx } = chart;
            const { width, height } = chart;
            const center = {
                x: width / 2,
                y: height / 2,
            };

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "600 45px Pretendard";
            ctx.fillStyle = "#000";
            ctx.fillText(`${totalStudyTime}시간`, center.x, center.y);
        },
    };

    const labelsPlugin = {
        id: "labels",
        afterDatasetsDraw: (chart) => {
            const { ctx } = chart;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#FFF";
            ctx.font = "700 18px Pretendard";

            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                meta.data.forEach((element, index) => {
                    // 위치 계산
                    const dataPercentage = dataset.data[index];
                    const { startAngle } = element;
                    const { endAngle } = element;
                    const midAngle = startAngle + (endAngle - startAngle) / 2;
                    const radius = (element.outerRadius + element.innerRadius) / 2;
                    const x = radius * Math.cos(midAngle);
                    const y = radius * Math.sin(midAngle);

                    // 레이블 텍스트 쓰기
                    ctx.fillText(chart.data.labels[index], element.x + x, element.y + y - 10); // 레이블은 조금 위로

                    // 퍼센트 텍스트 쓰기
                    ctx.fillText(`${dataPercentage}%`, element.x + x, element.y + y + 10); // 퍼센트는 조금 아래로
                });
            });
        },
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const getRecordStatisticFunction = async () => {
        await getRecordStatistic({
            responseFunc: {
                200: (response) => {
                    const { learningLanguageResponseList } = response.data.data.timeResponse;
                    const chartData = {
                        labels: learningLanguageResponseList.map((item) => item.languageName),
                        datasets: [
                            {
                                data: learningLanguageResponseList.map((item) => item.percent),
                                backgroundColor: learningLanguageResponseList.map(
                                    (item) => colors[item.languageName],
                                ),
                            },
                        ],
                    };

                    setData(chartData);
                    setTotalStudyTime(response.data.data.timeResponse.totalStudyTime);
                },
                400: () => {
                    console.log("통계 데이터 가져오기 실패");
                },
            },
            data: userId,
            routeTo,
        });
    };

    useEffect(() => {
        getRecordStatisticFunction();
    }, []);

    return (
        <LeftPageBox id="LPBox">
            <LeftPassportPages src={leftPassportPages} id="LPPS" />
            <LeftPassportPage id="LPP">
                <BackButtonIcon onClick={() => routeTo("/statistic")} />
                <PageLayout>
                    <Title>학습 시간 분석</Title>
                    <SubTitle>랭커들과 대화한 시간은 총 몇 시간일까요?</SubTitle>
                    <ChartContainer>
                        {data ? (
                            <Doughnut
                                data={data}
                                options={options}
                                plugins={[centerTextPlugin, labelsPlugin]}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </ChartContainer>
                    <LanguageContainer>
                        <LanguageRow>
                            <LanguageBox>
                                <RedIcon />
                                <LanguageText>한국어</LanguageText>
                            </LanguageBox>
                            <LanguageBox>
                                <BlueIcon />
                                <LanguageText>영어</LanguageText>
                            </LanguageBox>
                            <LanguageBox>
                                <OrangeIcon />
                                <LanguageText>일본어</LanguageText>
                            </LanguageBox>
                        </LanguageRow>
                        <LanguageRow>
                            <LanguageBox>
                                <PurlpleIcon />
                                <LanguageText>프랑스어</LanguageText>
                            </LanguageBox>
                            <LanguageBox>
                                <GreenIcon />
                                <LanguageText>중국어</LanguageText>
                            </LanguageBox>
                            <LanguageBox>
                                <YellowIcon />
                                <LanguageText>스페인어</LanguageText>
                            </LanguageBox>
                        </LanguageRow>
                    </LanguageContainer>
                </PageLayout>
            </LeftPassportPage>
        </LeftPageBox>
    );
}

const LeftPageBox = styled.div`
    width: 510px;
    height: 755px;
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

const PageLayout = styled.div`
    display: inline-flex;
    height: 600px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    margin-left: 50px;
    margin-top: 55px;
`;

const Title = styled.div`
    color: #000;
    font-size: 40px;
    font-weight: 700;
`;

const SubTitle = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 400;
`;

const ChartContainer = styled.div`
    display: flex;
    width: 350px;
    height: 350px;
    justify-content: center;
    align-items: center;
`;

const LanguageContainer = styled.div`
    display: flex;
    width: 400px;
    height: 82px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const LanguageRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LanguageBox = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const LanguageText = styled.span`
    display: flex;
    width: 100px;
    height: 25px;
    flex-direction: column;
    justify-content: center;
    color: var(--black, #000);
    font-size: 20px;
    font-weight: 700;
`;

const RedIcon = styled(Red)`
    width: 15px;
    height: 15px;
`;

const GreenIcon = styled(Green)`
    width: 15px;
    height: 15px;
`;

const BlueIcon = styled(Blue)`
    width: 15px;
    height: 15px;
`;

const PurlpleIcon = styled(Purlple)`
    width: 15px;
    height: 15px;
`;

const YellowIcon = styled(YelloW)`
    width: 15px;
    height: 15px;
`;

const OrangeIcon = styled(Orange)`
    width: 15px;
    height: 15px;
`;

const BackButtonIcon = styled(BackButton)`
    cursor: pointer;
    margin-top: 22px;
    margin-left: 21px;
    position: absolute;
`;

export default StudyTimeStatistic;
