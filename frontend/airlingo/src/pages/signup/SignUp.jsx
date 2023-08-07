import { useState } from "react";
import styled from "@emotion/styled";
import { ProgressBox, ProgressLine } from "@/components/progressBar";
import SignUpTerms from "./SignUpTerms";
import SignUpInfo from "./SignUpInfo";
import SignUpProfile from "./SignUpProfile";
import SignUpLanguage from "./SignUpLanguage";
import SignUpResult from "./SignUpResult";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { distinctgray } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function SignUp() {
    const [curStep, setCurStep] = useState(1);
    const [totalState, setTotalState] = useState({
        termsAgreed: false,
        id: "",
        password: "",
        nickname: "",
        email: "",
        primaryLang: { id: 0, label: "", img: "" },
        learningLangs: [],
    });

    const handleNextStep = (state) => {
        setTotalState((prev) => ({ ...prev, ...state }));
        setCurStep((prevStep) => prevStep + 1);
    };

    const handlePrevStep = (state) => {
        setTotalState((prev) => ({ ...prev, ...state }));
        setCurStep((prevStep) => prevStep - 1);
    };

    return (
        <SignUpContainer>
            {curStep < 5 && (
                <>
                    <TitleWrapper>회원가입</TitleWrapper>
                    <ProgressBarContainer>
                        <ProgressBox step="01" text="약관 동의" isProceeding={curStep >= 1} />
                        <ProgressLine isProceeding={curStep >= 2} />
                        <ProgressBox step="02" text="기본 정보 입력" isProceeding={curStep >= 2} />
                        <ProgressLine isProceeding={curStep >= 3} />
                        <ProgressBox step="03" text="개인 정보 입력" isProceeding={curStep >= 3} />
                        <ProgressLine isProceeding={curStep >= 4} />
                        <ProgressBox step="04" text="언어 설정" isProceeding={curStep >= 4} />
                    </ProgressBarContainer>
                </>
            )}

            {curStep === 1 && (
                <SignUpTerms totalState={totalState} onHandleNextStep={handleNextStep} />
            )}
            {curStep === 2 && (
                <SignUpInfo
                    totalState={totalState}
                    onHandlePrevStep={handlePrevStep}
                    onHandleNextStep={handleNextStep}
                />
            )}
            {curStep === 3 && (
                <SignUpProfile
                    totalState={totalState}
                    onHandlePrevStep={handlePrevStep}
                    onHandleNextStep={handleNextStep}
                />
            )}
            {curStep === 4 && (
                <SignUpLanguage
                    totalState={totalState}
                    onHandlePrevStep={handlePrevStep}
                    onHandleNextStep={handleNextStep}
                />
            )}
            {curStep === 5 && <SignUpResult totalState={totalState} />}
        </SignUpContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 200px;
    padding-bottom: 50px;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 25px;
    color: ${distinctgray};
    font-size: 45px;
    font-weight: 800;
`;

const ProgressBarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
`;

// ----------------------------------------------------------------------------------------------------

export default SignUp;
