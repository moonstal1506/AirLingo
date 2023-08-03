import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Dropdown from "@/components/common/dropdown";
import { TextButton } from "@/components/common/button";
import getLanguage from "@/api/language.js";
import getLevel from "@/api/level.js";
import Tooltip from "@/components/common/tooltip/Tooltip";
import { ReactComponent as KoreaFlagIcon } from "@/assets/imgs/icons/flag-korea-icon.svg";
import { ReactComponent as JapanFlagIcon } from "@/assets/imgs/icons/flag-france-icon.svg";

function SignupLanguage() {
    const [totalLanguage, setTotalLanguage] = useState([
        { id: "135", label: "한국어", img: KoreaFlagIcon },
        { id: "136", label: "영어", img: JapanFlagIcon },
        { id: "137", label: "일본어", img: JapanFlagIcon },
        { id: "138", label: "중국어", img: JapanFlagIcon },
        { id: "139", label: "프랑스어", img: JapanFlagIcon },
        { id: "140", label: "스페인어", img: JapanFlagIcon },
    ]);

    const [mainLanguage, setMainLanguage] = useState([
        { id: "135", label: "한국어", img: KoreaFlagIcon },
        { id: "136", label: "영어", img: JapanFlagIcon },
        { id: "137", label: "일본어", img: JapanFlagIcon },
        { id: "138", label: "중국어", img: JapanFlagIcon },
        { id: "139", label: "프랑스어", img: JapanFlagIcon },
        { id: "140", label: "스페인어", img: JapanFlagIcon },
    ]); // 대표 언어

    const [level, setLevel] = useState([
        { id: "135", label: "A1", img: KoreaFlagIcon },
        { id: "136", label: "A2", img: JapanFlagIcon },
        { id: "137", label: "B1", img: JapanFlagIcon },
        { id: "138", label: "B2", img: JapanFlagIcon },
    ]);
    console.log(mainLanguage);
    console.log(level);
    useEffect(() => {
        async function fetchData() {
            await getLanguage({
                responseFunc: {
                    200: (response) => setTotalLanguage(response.data),
                },
            });
            await getLanguage({
                responseFunc: {
                    200: (response) => setTotalLanguage(response.data),
                },
            });
            await getLevel({
                responseFunc: {
                    200: (response) => setLevel({ ...response.data }),
                },
            });
        }
        fetchData();
    }, []);

    return (
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
                        onChange={(data) => {
                            setTotalLanguage(data); // 대표 언어가 변경되면 상태를 업데이트합니다.
                        }}
                    />
                </StyledMainLanguage>
                <StyledSelectContainer>
                    <StyledSelectLanguage>
                        <Dropdown
                            width="180px"
                            shape="negative"
                            data={mainLanguage}
                            placeholder="관심 언어 설정"
                            // defaultOption={{ id: "korea", label: "한국어", img: KoreaFlagIcon }}
                            onChange={(data) => {
                                setMainLanguage(data); // 대표 언어가 변경되면 상태를 업데이트합니다.
                            }}
                        />
                    </StyledSelectLanguage>
                    <StyledSelectLevel>
                        <Dropdown
                            width="160px"
                            shape="negative"
                            data={level}
                            placeholder="숙련도 설정"
                            onChange={(data) => {
                                setLevel(data); // 숙련도가 변경되면 상태를 업데이트합니다.
                            }}
                        />
                    </StyledSelectLevel>
                    <TooltipContentContainer>
                        <Tooltip
                            position={{
                                horizontal: "right",
                                vertical: "bottom",
                                direction: "up",
                            }}
                        />
                    </TooltipContentContainer>
                    <Button>
                        <TextButton text="추가하기" />
                    </Button>
                </StyledSelectContainer>
            </SignupLanguageBox>

            <SignupButtonBox>
                <Button1>
                    <TextButton text="이전 단계" />
                </Button1>
                <Button2>
                    <TextButton text="회원가입 완료" />
                </Button2>
            </SignupButtonBox>
        </SignupLanguageContainer>
    );
}

const SignupLanguageContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100% - 120px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
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
    height: 698px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative; /* position: relative 추가 */
`;

const StyledMainLanguage = styled.div`
    display: flex;
    position: relative;
    width: 500px;
    height: 50px;
    padding: 10px 10px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
    z-index: 1; /* z-index 추가 */
`;

const StyledSelectContainer = styled.div`
    display: flex;
    width: 500px;
    height: 68px;
    flex-shrink: 0;
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
    flex: 1; /* 나머지 공간 채우기 */
    display: flex;
    width: 160px;
    height: 50px;
    padding: 10px 10px;
    justify-content: space-between;
    align-items: center;
`;

const TooltipContentContainer = styled.div`
    position: relative;
    z-index: 999;
    margin-top: 23px;
`;

const Button = styled.div`
    display: flex;
    height: 50px;
    padding: 10px 10px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`;

const Button1 = styled.div`
    display: flex;
    width: 200px;
    height: 50px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`;
const Button2 = styled.div`
    display: flex;
    width: 200px;
    height: 50px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`;
const SignupButtonBox = styled.div`
    display: flex;
    width: 500px;
    justify-content: space-between;
    align-items: center;
`;
export default SignupLanguage;
