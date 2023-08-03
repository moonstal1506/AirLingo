import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Dropdown from "@/components/common/dropdown";
import { TextButton } from "@/components/common/button";
import LanguageRankBox from "@/assets/imgs/language-rank-box.jpg";
// import getLanguage from "@/api/language.js";
import Tooltip from "@/components/common/tooltip/Tooltip";
import { ReactComponent as KoreaFlagIcon } from "@/assets/imgs/icons/flag-korea-icon.svg";
import { ReactComponent as JapanFlagIcon } from "@/assets/imgs/icons/flag-france-icon.svg";
import { ProgressBox, ProgressLine } from "@/components/progress";
import Validation from "@/components/validationList";

function SignupLanguage() {
    const [totalLanguage, setTotalLanguage] = useState([
        { id: "135", label: "한국어", img: KoreaFlagIcon },
        { id: "136", label: "영어", img: JapanFlagIcon },
        { id: "137", label: "일본어", img: JapanFlagIcon },
        { id: "138", label: "중국어", img: JapanFlagIcon },
        { id: "139", label: "프랑스어", img: JapanFlagIcon },
        { id: "140", label: "스페인어", img: JapanFlagIcon },
    ]);

    const [level, setLevel] = useState([
        { id: "135", label: "A1", img: KoreaFlagIcon },
        { id: "136", label: "A2", img: JapanFlagIcon },
        { id: "137", label: "B1", img: JapanFlagIcon },
        { id: "138", label: "B2", img: JapanFlagIcon },
    ]);

    const [skillLanguage, setSkillLanguage] = useState({}); // 대표 언어
    const [studyLanguage, setStudyLanguage] = useState({}); // 관심 언어
    const [selectedLevel, setSelectedLevel] = useState({}); // 숙련도
    const [languageList, setLanguageList] = useState([]);
    // 대표 언어가 선택되었는지 확인하는 변수
    const isMainLanguageSelected = !!skillLanguage.label;

    // 관심 언어가 한 개 이상 선택되었는지 확인하는 변수
    const isInterestLanguageSelected = languageList.length > 0;
    console.log(languageList, setTotalLanguage, setLevel);
    useEffect(() => {
        // async function fetchData() {
        //     await getLanguage({
        //         responseFunc: {
        //             200: (response) => setTotalLanguage(response.data),
        //         },
        //     });
        //     console.log(setLevel);
        //     // await getLevel({
        //     //     responseFunc: {
        //     //         200: (response) => setLevel(response.data),
        //     //     },
        //     // });
        // }
        // fetchData();
    }, []);

    const handleClickLanguage = () => {
        if (studyLanguage.label && selectedLevel.label) {
            // 새로 조합한 관심언어 리스트아이템 저장
            setLanguageList((prev) => [
                ...prev,
                {
                    id: studyLanguage.id,
                    img: studyLanguage.img,
                    title: studyLanguage.label,
                    level: selectedLevel.label,
                },
            ]);

            // 필터링하여 선택된 관심언어를 드롭다운에서 제거
            setTotalLanguage((prev) =>
                prev.filter((language) => language.label !== studyLanguage.label),
            );

            // 기존 상태 삭제
            setSelectedLevel({});
            setStudyLanguage({});
        }
    };

    const handleDeleteLanguage = (index) => {
        const { id, title, img } = languageList.find((_, i) => i === index);
        setTotalLanguage((prev) => [...prev, { id, label: title, img }]);
        setLanguageList((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <SignUpContainer>
            <SignUpWrapper>회원가입</SignUpWrapper>
            <ProgressContainer>
                <ProgressBox step="01" text="약관 동의" isProceeding />
                <ProgressLine />
                <ProgressBox step="02" text="기본 정보 입력" isProceeding />
                <ProgressLine />
                <ProgressBox step="03" text="개인 정보 입력" isProceeding />
                <ProgressLine />
                <ProgressBox step="04" text="언어 설정" isProceeding />
            </ProgressContainer>
            <SignupLanguageContainer>
                <SignupLanguageTitleWrapper>언어 설정</SignupLanguageTitleWrapper>
                <SignupLanguageBox>
                    <StyledMainLanguage>
                        <Dropdown
                            width="100%"
                            shape="negative"
                            data={totalLanguage}
                            placeholder="대표 언어 설정"
                            // defaultOption={{ id: "korea", label: "한국어", img: KoreaFlagIcon }}
                            selectedOption={skillLanguage}
                            // eslint-disable-next-line no-undef
                            onChange={setSkillLanguage}
                        />
                    </StyledMainLanguage>
                    <StyledSelectContainer>
                        <StyledSelectLanguage>
                            <Dropdown
                                width="180px"
                                shape="negative"
                                data={totalLanguage}
                                placeholder="관심 언어 설정"
                                // defaultOption={{ id: "korea", label: "한국어", img: KoreaFlagIcon }}
                                selectedOption={studyLanguage}
                                onChange={setStudyLanguage}
                            />
                        </StyledSelectLanguage>
                        <StyledSelectLevel>
                            <Dropdown
                                width="160px"
                                shape="negative"
                                data={level}
                                placeholder="숙련도 설정"
                                selectedOption={selectedLevel}
                                onChange={setSelectedLevel}
                            />
                        </StyledSelectLevel>
                        <TooltipBox>
                            <Tooltip
                                position={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                    direction: "down",
                                }}
                            >
                                <TooltipContentContainer />
                            </Tooltip>
                        </TooltipBox>
                        <TextButton text="추가하기" onClick={handleClickLanguage} />
                    </StyledSelectContainer>
                </SignupLanguageBox>
                {languageList.length > 0 && (
                    <SelectedLanguagesContainer>
                        {languageList.map((language, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <SelectedLanguage key={index}>
                                <SelectedLanguageLabel>
                                    <language.img />
                                    <span>{language.title}</span>
                                    <span>{language.level}</span>
                                    <DeleteButton onClick={() => handleDeleteLanguage(index)}>
                                        X
                                    </DeleteButton>
                                </SelectedLanguageLabel>
                            </SelectedLanguage>
                        ))}
                    </SelectedLanguagesContainer>
                )}
                <ValidationBox>
                    {/* 대표 언어 선택 여부에 따른 검증 메시지 스타일 */}
                    <Validation
                        isValid={isMainLanguageSelected}
                        text="능숙하게 구사할 수 있는 ‘대표 언어’를 한 가지 설정해야 합니다. "
                    />
                    {/* 관심 언어 선택 여부에 따른 검증 메시지 스타일 */}
                    <Validation
                        isValid={isInterestLanguageSelected}
                        text="배우고 싶은 ‘관심 언어’를 한 가지 이상 설정해야 합니다."
                    />
                </ValidationBox>
                <SignupButtonBox>
                    <TextButton text="이전 단계" shape="negative-signup" />
                    <TextButton text="회원가입 완료" shape="positive-signup" />
                </SignupButtonBox>
            </SignupLanguageContainer>
        </SignUpContainer>
    );
}

const SignUpContainer = styled.div`
    padding-top: 50px;
    padding-bottom: 50px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

const SignUpWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--secondary, #2a2b2d);
    text-align: center;
    font-size: 45px;
    font-weight: 800;
    line-height: 44px;
`;

const ProgressContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const SignupLanguageContainer = styled.div`
    position: relative;
    width: 100%;
    /* height: calc(100% - 120px); */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;

const SignupLanguageTitleWrapper = styled.div`
    display: flex;
    width: 500px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 44px;
    align-items: center;
    padding: 32px;
`;

const SignupLanguageBox = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative; /* position: relative 추가 */
    z-index: 1;
`;

const StyledMainLanguage = styled.div`
    display: flex;
    width: 500px;
    height: 50px;
    padding: 10px 10px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;
    z-index: 3;
`;

const StyledSelectContainer = styled.div`
    display: flex;
    width: 500px;
    height: 68px;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    align-items: center;
`;

const StyledSelectLanguage = styled.div`
    color: rgba(0, 0, 0, 0.5);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 44px;
    display: flex;
    width: 180px;
    height: 50px;
    padding: 10px 0px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`;

const StyledSelectLevel = styled.div`
    color: rgba(0, 0, 0, 0.5);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: 44px;
    flex: 1;
    display: flex;
    width: 160px;
    height: 50px;
    padding: 5px 10px;
    justify-content: space-between;
    align-items: center;
`;

const TooltipContentContainer = styled.div`
    position: relative;
    z-index: 999;
    width: 398px;
    height: 396px;
    background-image: url(${LanguageRankBox});
    border-radius: 20px;
    background-color: transparent;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const TooltipBox = styled.div`
    position: relative;
    z-index: 0;
    width: 30px;
    height: 24px;
`;

const SelectedLanguagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    display: flex;
`;

const SelectedLanguage = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: Pretendard;
    font-size: 16px;
`;

const SelectedLanguageLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 30px;
    background: #efefef;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    vertical-align: middle;
    text-align: center;
    width: 465px;
    height: 45px;
    padding: 10px 20px;

    .language-img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }

    .language-title {
        flex: 1;
    }

    .language-level {
        margin-right: 10px;
    }
`;
const ValidationBox = styled.div`
    width: 500px;
`;
const DeleteButton = styled.button`
    background: transparent;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 24px;
`;
const SignupButtonBox = styled.div`
    display: flex;
    width: 500px;
    justify-content: space-between;
    align-items: center;
`;

export default SignupLanguage;
