import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

function MeetingDictionary() {
    return (
        <DictionaryContainer>
            <ItemBox>
                <SubTitleWrapper>사전 언어 설정</SubTitleWrapper>
                <Dropdown
                    width="175px"
                    data={skillLanguageList}
                    iconColor="primary"
                    shape="negative"
                    selectedOption={skillLanguage}
                    onChange={setSkillLanguage}
                />
            </ItemBox>
            <ItemBox>
                <SubTitleWrapper>검색어</SubTitleWrapper>
            </ItemBox>
            <ItemBox>
                <SubTitleWrapper>검색 결과</SubTitleWrapper>
            </ItemBox>
        </DictionaryContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

const DictionaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;
`;

const ItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const SubTitleWrapper = styled.div`
    margin-top: 25px;
    margin-bottom: 25px;
    font-size: 25px;
    font-weight: 700;
    color: black;
    text-align: center;
`;

// ----------------------------------------------------------------------------------------------------

export default MeetingDictionary;
