import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import LanguageRankBox from "@/assets/imgs/language-rank-box.png";
import Dropdown from "@/components/common/dropdown";
import { TextButton } from "@/components/common/button";
import * as Icons from "@/assets/icons";
import { getLanguage, getGrade } from "@/api/language";
import { formatLanguage, formatGrade } from "@/utils/format";
import Tooltip from "@/components/common/tooltip/Tooltip";
import Validation from "@/components/validationList";
import theme from "@/assets/styles/Theme";
import { useRouter } from "@/hooks";

// ----------------------------------------------------------------------------------------------------

const { faintgray, primary4, warning } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function SignUpLanguage({ totalState, onHandlePrevStep, onHandleNextStep }) {
    const { routeTo } = useRouter();
    const [languages, setLanguages] = useState([]);
    const [grades, setGrades] = useState([]);
    const [primaryLang, setPrimaryLang] = useState({
        value: totalState.primaryLang,
        valid: !!totalState.primaryLang.label,
        dirty: !!totalState.primaryLang.label,
    });
    const [learningLangs, setLearningLangs] = useState({
        value: totalState.learningLangs,
        valid: totalState.learningLangs.length > 0,
        dirty: totalState.learningLangs.length > 0,
    });
    const [selectedLang, setSelectedLang] = useState({ id: 0, label: "", img: "" });
    const [selectedGrade, setSelectedGrade] = useState({ id: 0, label: "", img: "" });

    useEffect(() => {
        async function fetchData() {
            await getLanguage({
                responseFunc: {
                    200: (response) =>
                        setLanguages(
                            response.data.data.map((language) => formatLanguage(language)),
                        ),
                    400: () => {
                        alert("서버에서 정보를 받아오지 못했습니다. 다시 시도해주세요.");
                    },
                },
                routeTo,
            });
            await getGrade({
                responseFunc: {
                    200: (response) =>
                        setGrades(response.data.data.map((grade) => formatGrade(grade))),
                    400: () => {
                        alert("서버에서 정보를 받아오지 못했습니다. 다시 시도해주세요.");
                    },
                },
                routeTo,
            });
        }
        fetchData();
    }, [routeTo]);

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
            setLearningLangs((prev) => ({
                ...prev,
                value: [...prev.value, newLanguage],
                valid: true,
                dirty: true,
            }));

            // 선택된 값을 초기화
            setSelectedLang({ id: 0, label: "", img: "" });
            setSelectedGrade({ id: 0, label: "", img: "" });
        }
    };

    const deleteSelectedLanguage = (language) => {
        setLearningLangs((prev) => ({
            ...prev,
            value: prev.value.filter((lang) => lang.langId !== language.langId),
            valid: learningLangs.value.length > 1,
        }));
    };

    return (
        <LanguageContainer>
            <SubTitleWrapper>언어 설정</SubTitleWrapper>
            <InputBox>
                <PrimaryLangWrapper>
                    <Dropdown
                        width="500px"
                        data={languages.filter(
                            (language) =>
                                ![
                                    primaryLang.value.id,
                                    ...learningLangs.value.map((lang) => lang.langId),
                                ].includes(language.id),
                        )}
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
                        data={languages.filter(
                            (language) =>
                                ![
                                    primaryLang.value.id,
                                    ...learningLangs.value.map((lang) => lang.langId),
                                ].includes(language.id),
                        )}
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
                        <TooltipContent />
                    </Tooltip>
                    <TextButton text="추가하기" onClick={addSelectedLanguage} />
                </LearningLangBox>
            </InputBox>
            {learningLangs.value.length > 0 && (
                <LearningLangList>
                    {learningLangs.value.map((language, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <LearningLanguageItem key={index}>
                            <LanguageImg src={language.langImg} alt="languageIcon" />
                            <LanguageNameWrapper>{language.langLabel}</LanguageNameWrapper>
                            <LanguageGradeWrapper>{language.gradeLabel}</LanguageGradeWrapper>
                            <DeleteButton onClick={() => deleteSelectedLanguage(language)}>
                                <Icons.ValidationInvalidIcon />
                            </DeleteButton>
                        </LearningLanguageItem>
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
                            learningLangs: learningLangs.value,
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
                            learningLangs: learningLangs.value,
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
                gradeId: PropTypes.number.isRequired,
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

const TooltipContent = styled.div`
    position: relative;
    z-index: 999;
    width: 400px;
    height: 400px;
    background-image: url(${LanguageRankBox});
    background-size: cover;
    border-radius: 20px;
    background-color: transparent;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const LearningLangList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 25px;
`;

const LearningLanguageItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${faintgray};
    border-radius: 25px;
    width: 500px;
    height: 50px;
    color: black;
    font-size: 20px;
`;

const LanguageImg = styled.img`
    width: 25px;
    height: 25px;
`;

const LanguageNameWrapper = styled.div`
    width: 100px;
    text-align: center;
    font-weight: 700;
`;

const LanguageGradeWrapper = styled.div`
    width: 120px;
    text-align: center;
    color: ${primary4};
    font-weight: 500;
`;

const DeleteButton = styled.div`
    width: 25px;
    height: 25px;
    cursor: pointer;
    svg path {
        fill: ${warning};
    }
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
