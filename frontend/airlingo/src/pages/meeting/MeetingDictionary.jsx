import styled from "@emotion/styled";
import { useState } from "react";
import * as Icons from "@/assets/icons";
import Dropdown from "@/components/common/dropdown";
import theme from "@/assets/styles/Theme";
import { TextInput } from "@/components/common/input";
import { TextButton } from "@/components/common/button";
import Container from "@/components/common/container";

// ----------------------------------------------------------------------------------------------------

const { distinctgray } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function MeetingDictionary() {
    const [languageList, setLanguageList] = useState([]);
    const [sourceLang, setSourceLang] = useState({});
    const [targetLang, setTargetLang] = useState({});
    const [word, setWord] = useState("");
    console.log(setLanguageList);

    const searchWord = () => {};

    return (
        <DictionaryContainer>
            <ItemBox>
                <SubTitleWrapper>사전 언어 설정</SubTitleWrapper>
                <FunctionBox>
                    <Dropdown
                        width="175px"
                        data={languageList}
                        iconColor="primary"
                        shape="negative"
                        selectedOption={sourceLang}
                        onChange={setSourceLang}
                    />
                    <Icons.RightArrowIcon width="25" height="25" />
                    <Dropdown
                        width="175px"
                        data={languageList}
                        iconColor="primary"
                        shape="negative"
                        selectedOption={targetLang}
                        onChange={setTargetLang}
                    />
                </FunctionBox>
            </ItemBox>
            <DivisionLine />
            <ItemBox>
                <SubTitleWrapper>검색어</SubTitleWrapper>
                <FunctionBox>
                    <TextInput
                        placeholder="찾아볼 단어를 입력하세요!"
                        radius="big"
                        width="70%"
                        value={word.trim()}
                        onChange={(event) => setWord(event.target.value)}
                    />
                    <TextButton text="찾기" width="20%" onClick={searchWord} />
                </FunctionBox>
            </ItemBox>
            <DivisionLine />
            <ItemBox>
                <SubTitleWrapper>검색 결과</SubTitleWrapper>
                <Container width="95%" height="300px" />
            </ItemBox>
            <TextButton text="단어장 저장" width="40%" />
        </DictionaryContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

const DictionaryContainer = styled.div`
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
    width: 95%;
`;

const SubTitleWrapper = styled.div`
    margin-bottom: 15px;
    font-size: 25px;
    font-weight: 700;
    color: ${distinctgray};
    text-align: center;
`;

const FunctionBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DivisionLine = styled.div`
    width: 95%;
    height: 2px;
    background-color: ${distinctgray};
    border-radius: 50px;
    opacity: 0.35;
`;

// ----------------------------------------------------------------------------------------------------

export default MeetingDictionary;
