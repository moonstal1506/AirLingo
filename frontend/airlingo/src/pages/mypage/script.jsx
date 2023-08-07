import styled from "@emotion/styled";
import { useState } from "react";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";
import TabBar from "@/components/common/tab/TabBar.jsx";
import { TextButton } from "@/components/common/button";
import { ReactComponent as RightArrow } from "@/assets/icons/right-arrow-mini-Icon.svg";
import { ReactComponent as LeftIcon } from "@/assets/icons/left-icon.svg";
import { ReactComponent as RightIcon } from "@/assets/icons/right-icon.svg";
import { ReactComponent as KoreaFlagIcon } from "@/assets/icons/flag-korea-icon.svg";
import { ReactComponent as JapanFlagIcon } from "@/assets/icons/flag-japan-icon.svg";
import { ReactComponent as NoscriptBackground } from "@/assets/icons/no-data-icon.svg";
import scriptBackground from "@/assets/imgs/script-background.png";

const ScriptHomeContainer = styled.div`
    width: 100%;
    height: calc(100% - 120px);
    position: relative;
    font-family: Pretendard;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Script() {
    const arr = [
        {
            studyId: 1,
            studyTime: 8,
            partnerNickName: "user2",
            nativeLanguageDto: {
                languageId: 1,
                languageKorName: "일본어",
                languageEngName: "Korean",
                gradeName: null,
                gradeKorName: null,
                imageUrl:
                    "https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-korea-icon.svg",
            },
            imageUrl: "https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-korea-icon.svg",
            languageKorName: "한국어",
            languageEngName: "Korean",
            createdDate: "2023-08-07T11:00:08.198523",
            modifiedDate: "2023-08-07T11:09:02.639054",
            scripts: [
                {
                    scriptId: 1,
                    scriptContent: "내용입니당",
                    scriptUrl: "djfkjdkl",
                    korCard: "좋아하는 요리가 있니?",
                    engCard: "eng",
                    createdDate: "2023-08-07T00:00:00",
                    modifiedDate: "2023-08-07T00:00:00",
                },
                {
                    scriptId: 2,
                    scriptContent: "내용입니당",
                    scriptUrl: "djfkjdkl",
                    korCard: "영화",
                    engCard: "eng",
                    createdDate: "2023-08-07T00:00:00",
                    modifiedDate: "2023-08-07T00:00:00",
                },
            ],
        },
    ]; // 서버에서 받아온 거라고 가정함.

    // 페이지 번호를 관리할 상태 추가
    const [currentPage, setCurrentPage] = useState(0);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, arr[0].scripts.length - 1));
    };

    const prevPage = () => {
        setCurrentPage((prevPageNum) => Math.max(prevPageNum - 1, 0));
    };
    const activeTab = "statistic";

    return (
        <ScriptHomeContainer id="SC">
            <PassportContainer id="PC">
                <LeftPageBox>
                    <LeftPassportPages src={leftPassportPages} />
                    <TabBar activeTab={activeTab} />
                    <LeftPassportPage>
                        <div>왼쪽페이지</div>
                    </LeftPassportPage>
                </LeftPageBox>
                <RightPageBox>
                    <LeftPassportPages src={rightPassportPages} />
                    <RightPassportPage>
                        <ScriptBox>
                            <ScriptTextBox>
                                <ScriptText>대화기록</ScriptText>
                                <ScriptDate>7월 30일</ScriptDate>
                            </ScriptTextBox>{" "}
                            {arr.length === 0 ? (
                                <NoScriptContentBox>
                                    <NoscriptBackground />
                                </NoScriptContentBox>
                            ) : (
                                <ScriptTextAndIcons>
                                    <LeftIcon onClick={prevPage} />
                                    <ScriptContentBox>
                                        <ScriptDetailText>
                                            <ScriptOrder>
                                                {arr[0].scripts.length}개 중 {currentPage + 1}번째
                                            </ScriptOrder>
                                        </ScriptDetailText>
                                        <ScirptDetailContent>
                                            <LanguageSection>
                                                <ScriptLanguage>
                                                    <SkillLanguage>
                                                        <KoreaFlagIcon />
                                                        <LanguageName>한국어</LanguageName>
                                                    </SkillLanguage>
                                                    <RightArrow />
                                                    <StudyLanguage>
                                                        <JapanFlagIcon />
                                                        <LanguageName>
                                                            {arr[0].languageKorName}
                                                        </LanguageName>
                                                    </StudyLanguage>
                                                </ScriptLanguage>
                                            </LanguageSection>
                                            <ScriptDetail>
                                                <ScriptDetailItem>
                                                    <ScriptLabel>대화 주제</ScriptLabel>
                                                    <ScriptValue>
                                                        {arr[0].scripts[currentPage].korCard}
                                                    </ScriptValue>
                                                </ScriptDetailItem>
                                                <ScriptDetailItem>
                                                    <ScriptLabel>상대 랭커</ScriptLabel>
                                                    <ScriptValue>
                                                        {arr[0].partnerNickName}
                                                    </ScriptValue>
                                                </ScriptDetailItem>
                                                <ScriptDetailItem>
                                                    <ScriptLabel>시작 시간</ScriptLabel>
                                                    <ScriptValue>
                                                        {arr[0].scripts[currentPage].createdDate}
                                                    </ScriptValue>
                                                </ScriptDetailItem>
                                                <ScriptDetailItem>
                                                    <ScriptLabel>종료 시간</ScriptLabel>
                                                    <ScriptValue>
                                                        {arr[0].scripts[currentPage].modifiedDate}
                                                    </ScriptValue>
                                                </ScriptDetailItem>
                                            </ScriptDetail>
                                            <ScriptButton>
                                                <TextButton
                                                    shape="word-curved"
                                                    text="스크립트 조회"
                                                />
                                            </ScriptButton>
                                        </ScirptDetailContent>
                                    </ScriptContentBox>
                                    <RightIcon onClick={nextPage} />
                                </ScriptTextAndIcons>
                            )}
                        </ScriptBox>
                    </RightPassportPage>
                </RightPageBox>
            </PassportContainer>
        </ScriptHomeContainer>
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

// 스크립트 리스트
const ScriptBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: 15px;
    width: 352px;
    height: 450px; */

    gap: 30px;
`;

// 대화기록 + 날짜 감싸는거
const ScriptTextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// 대화기록
const ScriptText = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 100px;
    height: 30px;
    flex-direction: column;
    justify-content: center;
`;
// 날짜
const ScriptDate = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    width: 300px;
    height: 75px;
    flex-direction: column;
    justify-content: center;
`;

// 스크립트 배경
const ScriptContentBox = styled.div`
    position: relative;
    width: 400px;
    height: 475px;
    background: url(${scriptBackground}), white;
`;

// x개중 x번째 담는 곳
const ScriptDetailText = styled.div`
    display: flex;
    width: 350px;
    padding: 10px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    position: absolute;
    left: 20px;
    top: 10px;
`;
// x개중 x번째 글씨
const ScriptOrder = styled.div`
    color: #fff;
    text-align: right;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ScirptDetailContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 11px 0px;
    width: 100%;
    align-items: center;
    position: absolute;
    bottom: 25px;
`;

const ScriptLanguage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LanguageSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 7px;
`;

const SkillLanguage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StudyLanguage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LanguageName = styled.div`
    display: flex;
    width: 150px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ScriptDetail = styled.div`
    display: flex;
    padding: 10px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

const ScriptButton = styled.div`
    border: 1px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ScriptDetailItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 300px;
`;

const ScriptLabel = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
`;

const ScriptValue = styled.div`
    text-align: left;
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 30px;
    width: 170px;
    //글자 수 너무 길어지면 ... 으로 표시
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const ScriptTextAndIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
// 스크립트 X
const NoScriptContentBox = styled.div`
    position: relative;
    height: 414px;
    padding-top: 60px;
    justify-content: center;
    align-items: center;
`;

export default Script;
