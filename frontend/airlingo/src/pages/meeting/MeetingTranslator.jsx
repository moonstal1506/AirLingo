import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import theme from "@/assets/styles/Theme";
import Dropdown from "@/components/common/dropdown";
import * as Icons from "@/assets/icons";
import { formatLanguage } from "@/utils/format";
import { selectUser } from "@/features/User/UserSlice";
import { selectMeeting } from "@/features/Meeting/MeetingSlice";
import { getLanguage, getTranslateResult } from "@/api";
import Container from "@/components/common/container";
import { TextArea } from "@/components/common/input";
import { translatorConfig } from "@/config";

// ----------------------------------------------------------------------------------------------------

const { distinctgray, primary4 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function MeetingTranslator() {
    const { userNativeLanguage } = useSelector(selectUser);
    const { otherUser } = useSelector(selectMeeting);
    const [languageList, setLanguageList] = useState([]);
    const [sourceLang, setSourceLang] = useState(formatLanguage(userNativeLanguage));
    const [targetLang, setTargetLang] = useState(formatLanguage(otherUser.userNativeLanguage));
    const [text, setText] = useState("");
    const [debouncedText, setDebouncedText] = useState(text);
    const [translateResult, setTranslateResult] = useState("여기에 번역 결과가 표시됩니다.");

    useEffect(() => {
        async function fetchLanguageData() {
            await getLanguage({
                responseFunc: {
                    200: (response) =>
                        setLanguageList(
                            response.data.data.map((language) => formatLanguage(language)),
                        ),
                    400: (response) => console.log(response),
                },
            });
        }
        fetchLanguageData();
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 2000);

        return () => {
            clearTimeout(timerId);
        };
    }, [text]);

    useEffect(() => {
        if (debouncedText) {
            getTranslateResult({
                responseFunc: {
                    200: (response) => setTranslateResult(response.data.data),
                    400: (response) => console.log(response),
                },
                data: {
                    source: translatorConfig[sourceLang.id],
                    target: translatorConfig[targetLang.id],
                    text: debouncedText,
                },
            });
        }
    }, [debouncedText, sourceLang, targetLang]);

    return (
        <TranslatorContainer>
            <ItemBox>
                <SubTitleWrapper>번역기 언어 설정</SubTitleWrapper>
                <SettingBox>
                    <Dropdown
                        width="175px"
                        data={languageList.filter((language) => language.id !== targetLang.id)}
                        iconColor="primary"
                        shape="negative"
                        selectedOption={sourceLang}
                        onChange={setSourceLang}
                    />
                    <Icons.RightArrowIcon width="25" height="25" />
                    <Dropdown
                        width="175px"
                        data={languageList.filter((language) => language.id !== sourceLang.id)}
                        iconColor="primary"
                        shape="negative"
                        selectedOption={targetLang}
                        onChange={setTargetLang}
                    />
                </SettingBox>
            </ItemBox>
            <DivisionLine />
            <ResultBox>
                <TextArea
                    placeholder="번역할 문장을 여기에 입력하세요."
                    radius="big"
                    width="100%"
                    height="275px"
                    value={text}
                    onChange={setText}
                />
                <Icons.DownArrowIcon width="25" height="25" />
                <Container width="100%" height="275px">
                    <ResultTextWrapper>{translateResult}</ResultTextWrapper>
                </Container>
            </ResultBox>
        </TranslatorContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

const TranslatorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 95%;
`;

const SubTitleWrapper = styled.div`
    margin-bottom: 15px;
    font-size: 25px;
    font-weight: 700;
    color: ${distinctgray};
    text-align: center;
`;

const SettingBox = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 1;
`;

const DivisionLine = styled.div`
    width: 95%;
    height: 2px;
    background-color: ${distinctgray};
    border-radius: 50px;
    opacity: 0.35;
`;

const ResultTextWrapper = styled.div`
    color: ${primary4};
    font-weight: 500;
    font-size: 17px;
`;

const ResultBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 95%;
`;

// ----------------------------------------------------------------------------------------------------

export default MeetingTranslator;
