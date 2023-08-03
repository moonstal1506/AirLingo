import { useState } from "react";
import styled from "@emotion/styled";
import { ProgressBox, ProgressLine } from "@/components/progressBar";
import SignUpTerms from "./SignUpTerms";
import SignUpInfo from "./SignUpInfo";
import SignUpProfile from "./SignUpProfile";
import SignUpLanguage from "./SignUpLanguage";
import SignUpResult from "./SignUpResult";
import theme from "@/assets/styles/Theme";
import { TextButton } from "@/components/common/button";
import useRouter from "@/hooks";

// ----------------------------------------------------------------------------------------------------

const { distinctgray } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function SignUp() {
    const { routeTo } = useRouter();
    const [curStep, setCurStep] = useState(1);

    const handleNextStep = () => {
        setCurStep((prevStep) => prevStep + 1);
    };

    const handlePrevStep = () => {
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

            {curStep === 1 && <SignUpTerms />}
            {curStep === 2 && <SignUpInfo />}
            {curStep === 3 && <SignUpProfile />}
            {curStep === 4 && <SignUpLanguage />}
            {curStep === 5 && <SignUpResult />}
            <ButtonWrapper>
                {curStep > 1 && curStep < 5 && (
                    <TextButton shape="negative-normal" text="이전 단계" onClick={handlePrevStep} />
                )}
                {curStep < 5 && (
                    <TextButton shape="positive-normal" text="다음 단계" onClick={handleNextStep} />
                )}
                {curStep === 5 && (
                    <TextButton
                        shape="positive-normal"
                        text="로그인 하러 가기"
                        onClick={() => routeTo("/login")}
                    />
                )}
            </ButtonWrapper>
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

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

// ----------------------------------------------------------------------------------------------------

export default SignUp;
