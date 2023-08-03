import styled from "@emotion/styled";
// import { useState } from "react";
// import { TextButton } from "@/components/common/button";
// import Validation from "@/components/validationList";
import { ProgressBox, ProgressLine } from "@/components/Progress";

// import { CheckBox } from "@/components/common/input";
// import theme from "@/assets/styles/Theme";

// const { primary1, primary4 } = theme.colors;

function Signup3() {
    // const [isChecked, setIsChecked] = useState(false);
    // const [isValid, setIsValid] = useState(false);

    // const handleCheckboxChange = () => {
    //     setIsChecked((prevIsChecked) => !prevIsChecked);
    //     setIsValid((prevIsValid) => !prevIsValid);
    // };

    return (
        <SignupContainer>
            <SignupBox>
                <SignupTitleWrapper>
                    <SignupTitle>회원가입</SignupTitle>
                </SignupTitleWrapper>

                <Progresser>
                    <ProgressBox step="01" text="약관 동의" isProceeding />
                    <ProgressLine isProceeding />
                    <ProgressBox step="02" text="기본 정보 입력" isProceeding />
                    <ProgressLine isProceeding />
                    <ProgressBox step="03" text="개인 정보 입력" isProceeding />
                    <ProgressLine />
                    <ProgressBox step="04" text="언어 설정" />
                </Progresser>

                <PersonalInformationBox>
                    <SubTitleBox>
                        <SubTitleText>개인 정보 입력</SubTitleText>
                    </SubTitleBox>
                </PersonalInformationBox>
            </SignupBox>
        </SignupContainer>
    );
}

const SignupContainer = styled.div`
    display: flex;
    width: 100%;
    padding-bottom: 0px;
    flex-direction: column;
    align-items: center;
    gap: 90px;
    font-family: Pretendard;
`;

const SignupBox = styled.div`
    padding-top: 210px;
    width: 700px;
    height: 642px;
`;

const Progresser = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: -14px;
    margin-top: 34px;
`;

const SignupTitleWrapper = styled.div`
    display: flex;
    width: 500px;
    height: 65px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    flex-shrink: 0;
`;

const SignupTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 0 0;
    align-self: stretch;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 45px;
    font-style: normal;
    font-weight: 800;
    line-height: 44px; /* 97.778% */
`;

const PersonalInformationBox = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
`;

const SubTitleBox = styled.div`
    display: flex;
    width: 500px;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

const SubTitleText = styled.div`
    display: flex;
    width: 500px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--primary, #00a8b3);
    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 44px; /* 110% */
`;

export default Signup3;
