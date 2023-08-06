import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Dropdown from "@/components/common/dropdown";
import { TextButton } from "@/components/common/button";
import LanguageRankBox from "@/assets/imgs/language-rank-box.jpg";
import { getLanguage, getGrade } from "@/api/language";
import { formatLanguage, formatGrade } from "@/utils/format";
import Tooltip from "@/components/common/tooltip/Tooltip";
import Validation from "@/components/validationList";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary4 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function SignUpLanguage({ totalState, onHandlePrevStep, onHandleNextStep }) {
    const [languages, setLanguages] = useState([]);
    const [grades, setGrades] = useState([]);
    const [primaryLang, setPrimaryLang] = useState({
        value: totalState.primaryLang,
        valid: !!totalState.primaryLang,
        dirty: !!totalState.primaryLang,
    });
    const [learningLangs, setLearningLangs] = useState({
        value: totalState.learningLangs,
        valid: false,
        dirty: false,
    });
    const [selectedLang, setSelectedLang] = useState({});
    const [selectedGrade, setSelectedGrade] = useState({});

    // // 관심 언어가 한 개 이상 선택되었는지 확인하는 변수
    // const isInterestLanguageSelected = languageList.length > 0;

    useEffect(() => {
        async function fetchData() {
            await getLanguage({
                responseFunc: {
                    200: (response) =>
                        setLanguages(
                            response.data.data.map((language) => formatLanguage(language)),
                        ),
                    400: (response) => console.log(response),
                },
            });
            console.log(setGrades);
            await getGrade({
                responseFunc: {
                    200: (response) =>
                        setGrades(response.data.data.map((grade) => formatGrade(grade))),
                    400: (response) => console.log(response),
                },
            });
        }
        fetchData();
    }, []);

    const changePrimaryLang = (language) => {
        setPrimaryLang((prev) => ({ ...prev, value: language, valid: true, dirty: true }));
    };

    const addSelectedLanguage = () => {
        if (selectedLang.label && selectedGrade.label) {
            const newLanguage = {
                langId: selectedLang.id,
                langLabel: selectedLang.label,
                langImg: selectedLang.img,
                gradeId: selectedGrade.id,
                gradeLabel: selectedGrade.label,
            };
            setLearningLangs((prev) => ({ ...prev, value: [...prev.value, newLanguage] }));

            // 필터링하여 선택된 관심언어를 드롭다운에서 제거
            setLanguages((prev) =>
                prev.filter((language) => language.label !== selectedLang.label),
            );

            setSelectedLang({});
            setSelectedGrade({});
        }
    };

    const deleteSelectedLanguage = (index) => {
        const { langId, langLabel, langImg } = learningLangs.value.find((_, i) => i === index);
        setLanguages((prev) => [...prev, { id: langId, label: langLabel, img: langImg }]);
        setLearningLangs((prev) => ({ ...prev, value: prev.filter((_, i) => i !== index) }));
    };

    return (
        <LanguageContainer>
            <SubTitleWrapper>언어 설정</SubTitleWrapper>
            <InputBox>
                <PrimaryLangWrapper>
                    <Dropdown
                        width="500px"
                        data={languages}
                        iconColor="primary"
                        shape="negative"
                        selectedOption={primaryLang.value}
                        placeholder="대표 언어 설정"
                        onChange={changePrimaryLang}
                    />
                </PrimaryLangWrapper>
                <LearningLangBox>
                    <Dropdown
                        width="180px"
                        data={languages}
                        iconColor="primary"
                        shape="negative"
                        selectedOption={selectedLang}
                        placeholder="관심 언어 설정"
                        onChange={setSelectedLang}
                    />
                    <Dropdown
                        width="160px"
                        data={grades}
                        iconColor="primary"
                        shape="negative"
                        selectedOption={selectedGrade}
                        placeholder="숙련도 설정"
                        onChange={setSelectedGrade}
                    />
                    <Tooltip
                        position={{
                            horizontal: "right",
                            vertical: "bottom",
                            direction: "down",
                        }}
                    >
                        <TooltipContentContainer />
                    </Tooltip>
                    <TextButton text="추가하기" onClick={addSelectedLanguage} />
                </LearningLangBox>
            </InputBox>
            {learningLangs.value.length > 0 && (
                <LearningLangList>
                    {learningLangs.value.map((language, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <SelectedLanguage key={index}>
                            <SelectedLanguageLabel>
                                <language.img />
                                <span>{language.langLabel}</span>
                                <span>{language.gradeLabel}</span>
                                <DeleteButton onClick={() => deleteSelectedLanguage(index)}>
                                    X
                                </DeleteButton>
                            </SelectedLanguageLabel>
                        </SelectedLanguage>
                    ))}
                </LearningLangList>
            )}
            <ValidationList>
                <Validation
                    isValid={primaryLang.valid}
                    isDirty={primaryLang.dirty}
                    text="능숙하게 구사할 수 있는 ‘대표 언어’를 한 가지 설정해야 합니다."
                />
                <Validation
                    isValid={learningLangs.valid}
                    isDirty={learningLangs.dirty}
                    text="배우고 싶은 ‘관심 언어’를 한 가지 이상 설정해야 합니다."
                />
            </ValidationList>
            <ButtonBox>
                <TextButton
                    shape="negative-curved"
                    text="이전 단계"
                    width="200px"
                    onClick={() =>
                        onHandlePrevStep({
                            primaryLang: primaryLang.value,
                            learningLang: learningLangs.value,
                        })
                    }
                />
                <TextButton
                    shape="positive-curved"
                    text="회원가입 완료"
                    width="200px"
                    onClick={() =>
                        onHandleNextStep({
                            primaryLang: primaryLang.value,
                            learningLang: learningLangs.value,
                        })
                    }
                    disabled={!primaryLang.valid || !learningLangs.valid}
                />
            </ButtonBox>
        </LanguageContainer>
    );
}

SignUpLanguage.propTypes = {
    totalState: PropTypes.shape({
        termsAgreed: PropTypes.bool,
        id: PropTypes.string,
        password: PropTypes.string,
        nickname: PropTypes.string,
        email: PropTypes.string,
        primaryLang: PropTypes.shape({
            id: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
        }),
        learningLangs: PropTypes.arrayOf(
            PropTypes.shape({
                langId: PropTypes.number.isRequired,
                langLabel: PropTypes.string.isRequired,
                langImg: PropTypes.string.isRequired,
                gradeId: PropTypes.string.isRequired,
                gradeLabel: PropTypes.string.isRequired,
            }),
        ),
    }).isRequired,
    onHandlePrevStep: PropTypes.func.isRequired,
    onHandleNextStep: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const LanguageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
`;

const SubTitleWrapper = styled.div`
    margin-top: 25px;
    margin-bottom: 25px;
    font-size: 40px;
    font-weight: 700;
    color: ${primary4};
    text-align: center;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const PrimaryLangWrapper = styled.div`
    z-index: 1000;
`;

const LearningLangBox = styled.div`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

// const StyledMainLanguage = styled.div`
//     display: flex;
//     width: 500px;
//     height: 50px;
//     padding: 10px 10px;
//     justify-content: space-between;
//     align-items: center;
//     flex-shrink: 0;
//     cursor: pointer;
//     position: relative;
//     z-index: 3;
// `;

// const StyledSelectContainer = styled.div`
//     display: flex;
//     width: 500px;
//     height: 68px;
//     flex-shrink: 0;
//     position: relative;
//     z-index: 2;
//     align-items: center;
// `;

// const StyledSelectLanguage = styled.div`
//     color: rgba(0, 0, 0, 0.5);
//     font-family: Pretendard;
//     font-size: 20px;
//     font-style: normal;
//     font-weight: 300;
//     line-height: 44px;
//     display: flex;
//     width: 180px;
//     height: 50px;
//     padding: 10px 0px;
//     justify-content: space-between;
//     align-items: center;
//     flex-shrink: 0;
// `;

// const StyledSelectLevel = styled.div`
//     color: rgba(0, 0, 0, 0.5);
//     font-family: Pretendard;
//     font-size: 18px;
//     font-style: normal;
//     font-weight: 300;
//     line-height: 44px;
//     flex: 1;
//     display: flex;
//     width: 160px;
//     height: 50px;
//     padding: 5px 10px;
//     justify-content: space-between;
//     align-items: center;
// `;

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

const LearningLangList = styled.div`
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

const DeleteButton = styled.button`
    background: transparent;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 24px;
`;

const ValidationList = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    margin-top: 25px;
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
    width: 500px;
`;

// ----------------------------------------------------------------------------------------------------

export default SignUpLanguage;
