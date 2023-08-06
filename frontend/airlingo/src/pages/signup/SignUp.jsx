import styled from "@emotion/styled";
import { useState } from "react";
import { TextButton } from "@/components/common/button";
import Validation from "@/components/validationList";
import { ProgressBox, ProgressLine } from "@/components/progress";

import { CheckBox } from "@/components/common/input";
import theme from "@/assets/styles/Theme";

const { primary1, primary4 } = theme.colors;

function SignUp() {
    const [isChecked, setIsChecked] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked((prevIsChecked) => !prevIsChecked);
        setIsValid((prevIsValid) => !prevIsValid);
    };

    return (
        <SignUpContainer>
            <SignUpWrapper>회원가입</SignUpWrapper>
            <ProgressContainer>
                <ProgressBox step="01" text="약관 동의" isProceeding />
                <ProgressLine />
                <ProgressBox step="02" text="기본 정보 입력" />
                <ProgressLine />
                <ProgressBox step="03" text="개인 정보 입력" />
                <ProgressLine />
                <ProgressBox step="04" text="언어 설정" />
            </ProgressContainer>
            <TermsBox>
                <TermsTitleWrapper>약관 동의</TermsTitleWrapper>
                <TermsWrapper>
                    <PolicyTitleWrapper>개인정보 처리방침</PolicyTitleWrapper>
                    <div>
                        <p>
                            &lt; AIRLINGO &gt;(&apos;https://www.airlingo.com/&apos;이하
                            &apos;AIRLINGO&apos;)은(는) 「개인정보 보호법」 제30조에 따라 정보주체의
                            개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
                            있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
                        </p>
                        <p>이 개인정보처리방침은 2023년 8월 1부터 적용됩니다.</p>

                        <h3>제1조(개인정보의 처리 목적)</h3>
                        <p>
                            &lt; AIRLINGO &gt;(&apos;https://www.airlingo.com/&apos;이하
                            &apos;AIRLINGO&apos;)은(는) 다음의 목적을 위하여 개인정보를 처리합니다.
                            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며
                            이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의
                            동의를 받는 등 필요한 조치를 이행할 예정입니다.
                        </p>
                        <ol>
                            <li>
                                홈페이지 회원가입 및 관리: 회원 가입의사 확인 목적으로 개인정보를
                                처리합니다.
                            </li>
                            <li>
                                재화 또는 서비스 제공: 서비스 제공을 목적으로 개인정보를 처리합니다.
                            </li>
                        </ol>

                        <h3>제2조(개인정보의 처리 및 보유 기간)</h3>
                        <p>
                            &lt; AIRLINGO &gt;은(는) 법령에 따른 개인정보 보유·이용기간 또는
                            정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간
                            내에서 개인정보를 처리·보유합니다.
                        </p>
                        <p>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
                        <ol>
                            <li>
                                홈페이지 회원가입 및 관리: 홈페이지 회원가입 및 관리와 관련한
                                개인정보는 수집.이용에 관한 동의일로부터 지체없이 파기까지 위
                                이용목적을 위하여 보유.이용됩니다.
                            </li>
                        </ol>

                        <h3>제3조(처리하는 개인정보의 항목)</h3>
                        <p>&lt; AIRLINGO &gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.</p>
                        <ol>
                            <li>홈페이지 회원가입 및 관리</li>
                            <ul>
                                <li>필수항목: 이름, 로그인ID, 비밀번호, 이메일</li>
                            </ul>
                        </ol>
                    </div>
                </TermsWrapper>
                <CheckBoxContainer>
                    <CheckBox checked={isChecked} onChange={handleCheckboxChange} />
                    <AgreeTextWrapper>
                        개인정보 처리방침 및 서비스 이용 약관에 모두 동의합니다.
                    </AgreeTextWrapper>
                </CheckBoxContainer>
                <Validation
                    isValid={isValid}
                    text="개인정보 처리방침 및 서비스 이용 약관에 동의해야 합니다."
                />
                <ButtonWrapper>
                    <TextButton shape="positive-normal" text="다음 단계" />
                </ButtonWrapper>
            </TermsBox>
        </SignUpContainer>
    );
}

const SignUpContainer = styled.div`
    padding-top: 210px;
    padding-bottom: 50px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    font-family: Pretendard;
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

const TermsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    width: 500px;
    font-family: "Pretendard";
`;

const TermsWrapper = styled.div`
    width: 460px;
    height: 200px;
    border-radius: 20px;
    padding: 20px 20px;
    border: 3px solid ${(props) => props.theme.colors.primary4};
    overflow: scroll;
    background-color: ${primary1};
    div p {
        margin: 0;
        line-height: 35px;
    }
`;

const TermsTitleWrapper = styled.div`
    height: 50px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    color: ${primary4};
`;

const PolicyTitleWrapper = styled.div`
    color: #000000;
    font-size: 20px;
    font-weight: 800;
`;

const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: right;
    align-content: center;
    gap: 10px;
`;

const AgreeTextWrapper = styled.div`
    display: flex;
    align-items: center;
    color: #000000;
    font-size: 15px;
    font-weight: 400;
    height: 18px;
    margin: 3px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export default SignUp;
