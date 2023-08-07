import { useState } from "react";
import styled from "@emotion/styled";
import scriptBackground from "@/assets/imgs/script-background.png";
import { ReactComponent as RightArrow } from "@/assets/icons/right-arrow-mini-Icon.svg";
import { ReactComponent as LeftIcon } from "@/assets/icons/left-icon.svg";
import { ReactComponent as RightIcon } from "@/assets/icons/right-icon.svg";
import { ReactComponent as KoreaFlagIcon } from "@/assets/icons/flag-korea-icon.svg";
import { ReactComponent as JapanFlagIcon } from "@/assets/icons/flag-japan-icon.svg";
import { TextButton } from "@/components/common/button";
import { ReactComponent as NoscriptBackground } from "@/assets/icons/no-data-icon.svg";

function Script() {
    const arr = [
        {
            studyId: 1,
            studyTime: 150,
            partnerNickName: "WhoKilledMyDog439",
            languageKorName: "일본어",
            languageEngName: "japanese",
            createdDate: "12:45",
            scripts: [
                {
                    scriptId: 1,
                    scriptContent: "스크립트 컨텐츠",
                    scriptUrl: "script.url",
                    korCard: "영화",
                    engCard: "movie",
                    createdDate: "12:45",
                    modifiedDate: "13:00",
                },
                {
                    scriptId: 2,
                    scriptContent: "스크립트 컨텐츠2",
                    scriptUrl: "script.url",
                    korCard: "음식",
                    engCard: "food",
                    createdDate: "14:45",
                    modifiedDate: "15:00",
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

    return (
        <PageBox>
            <ScriptContainer>
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
                                            <ScriptValue>{arr[0].partnerNickName}</ScriptValue>
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
                                        <TextButton shape="word-curved" text="스크립트 조회" />
                                    </ScriptButton>
                                </ScirptDetailContent>
                            </ScriptContentBox>
                            <RightIcon onClick={nextPage} />
                        </ScriptTextAndIcons>
                    )}
                </ScriptBox>
            </ScriptContainer>
        </PageBox>
    );
}

const PageBox = styled.div`
    width: 100%;
    height: calc(100% - 120px);
`;
const ScriptContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 375px;
    height: 525px;
    flex-shrink: 0;
    border-radius: 0px 15px 15px 0px;
    border: 1px solid #000;
    background: #fff;
    margin-top: 150px;
`;

const ScriptBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 352px;
    height: 450px;
`;
const ScriptTextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ScriptText = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    width: 75px;
    height: 22px;
    flex-direction: column;
    justify-content: center;
`;
const ScriptDate = styled.div`
    border: 1px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 45px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    width: 225px;
    height: 56px;
    flex-direction: column;
    justify-content: center;
`;

const ScriptContentBox = styled.div`
    width: 300px;
    position: relative;
    height: 355px;
    background: url(${scriptBackground}), white;
`;

const ScriptDetailText = styled.div`
    display: flex;
    width: 262px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    position: absolute;
    left: 15px;
    top: 15px;
`;
const ScriptOrder = styled.div`
    color: #fff;
    text-align: right;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ScirptDetailContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 11px 0px;
    width: 100%;
    align-items: center;
    position: absolute;
    bottom: 0px;
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
    border: 1px;
    display: flex;
    width: 112px;
    height: 37px;
    flex-direction: column;
    justify-content: center;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ScriptDetail = styled.div`
    border: 1px;
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
    gap: 7px;
`;

const ScriptDetailItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
`;

const ScriptLabel = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: left;
`;

const ScriptValue = styled.div`
    text-align: left;
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 30px;
    width: 135px;
`;
const ScriptTextAndIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
// 스크립트 X
const NoScriptContentBox = styled.div`
    position: relative;
    height: 365px;
    padding-top: 50px;
    justify-content: center;
    align-items: center;
`;

export default Script;
