import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useState } from "react";
import ValidationItem from "@/components/validationList";
import { CheckBox } from "@/components/common/input";
import { TextButton } from "@/components/common/button";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary1, primary4 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function SignUpTerms({ totalState, onHandleNextStep }) {
    const [termsAgreed, setTermsAgreed] = useState(totalState.termsAgreed);
    const [isTermsDirty, setIsTermsDirty] = useState(false);

    const handleCheckboxChange = () => {
        setTermsAgreed((prevTermsAgreed) => !prevTermsAgreed);
        setIsTermsDirty(true);
    };

    return (
        <TermsContainer>
            <SubTitleWrapper>약관 동의</SubTitleWrapper>
            <TermsWrapper>
                <TermsTitleWrapper>개인정보 처리방침</TermsTitleWrapper>
                <TermsTextWrapper>
                    &lt;개발자들&gt;(이하 &quot;회사&quot;)은 개인정보보호법 제30조에 따라 정보
                    주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
                    하기 위하여 다음과 같이 개인정보 처리방침을 수립 · 공개합니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    이 개인정보 처리방침은 <b>2023년 8월 18일</b>부터 적용됩니다.
                </TermsTextWrapper>
                <TermsSubTitleWrapper>제1조 &nbsp; 개인정보의 처리 목적</TermsSubTitleWrapper>
                <TermsTextWrapper>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는
                    다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
                    개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
                    예정입니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    1. <b>홈페이지 회원 가입 및 관리</b>: 회원 가입의사 확인, 회원자격 유지 · 관리,
                    서비스 부정이용 방지, 각종 고지 · 통지, 고충처리 등을 목적으로 개인정보를
                    처리합니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    2. <b>재화 또는 서비스 제공</b>: 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공 등을
                    목적으로 개인정보를 처리합니다.
                </TermsTextWrapper>
                <TermsSubTitleWrapper>
                    제2조 &nbsp; 개인정보의 처리 및 보유 기간
                </TermsSubTitleWrapper>
                <TermsTextWrapper>
                    ① 회사는 법령에 따른 개인정보 보유 · 이용 기간 또는 정보 주체로부터 개인정보를
                    수집 시에 동의받은 개인정보 보유 · 이용기간 내에서 개인정보를 처리 · 보유합니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    1. <b>홈페이지 회원 가입 및 관리</b>: 홈페이지 회원 가입 및 관리와 관련한
                    개인정보는 수집 · 이용에 관한 동의일로부터 지체없이 파기까지 위 이용 목적을
                    위하여 보유 및 이용됩니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    2. <b>재화 또는 서비스 제공</b>: 재화 · 서비스 공급 완료 시까지 위 이용 목적을
                    위하여 보유 및 이용됩니다.
                </TermsTextWrapper>
                <TermsSubTitleWrapper>
                    제3조 &nbsp; 정보주체의 권리 · 의무 및 행사 방법
                </TermsSubTitleWrapper>
                <TermsTextWrapper>
                    ① 정보 주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할
                    수 있습니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    1. <b>개인정보 열람 요구</b>
                </TermsTextWrapper>
                <TermsTextWrapper>
                    2. <b>오류 등이 있을 경우 정정 요구</b>
                </TermsTextWrapper>
                <TermsTextWrapper>
                    3. <b>삭제 요구</b>
                </TermsTextWrapper>
                <TermsTextWrapper>
                    4. <b>처리 정지 요구</b>
                </TermsTextWrapper>
                <TermsTextWrapper>
                    ② 제1항에 따른 권리 행사는 회사에 대해 개인정보보호법 시행규칙 별지 제8호 서식에
                    따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해
                    지체없이 조치하겠습니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    ③ 정보 주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는
                    정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    ④ 제1항에 따른 권리 행사는 정보 주체의 법정대리인이나 위임을 받은 자 등 대리인을
                    통하여 하실 수 있습니다. 이 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른
                    위임장을 제출하셔야 합니다.
                </TermsTextWrapper>
                <TermsSubTitleWrapper>제4조 &nbsp; 처리하는 개인정보 항목</TermsSubTitleWrapper>
                <TermsTextWrapper>
                    회사는 다음의 개인정보 항목을 처리하고 있습니다.
                </TermsTextWrapper>
                <TermsTextWrapper>
                    1. <b>홈페이지 회원 가입 및 관리</b>: 필수항목 - 아이디, 비밀번호, 이메일 주소
                </TermsTextWrapper>
                <TermsTextWrapper>
                    2. <b>재화 또는 서비스 제공</b>: 필수항목 - 아이디, 비밀번호, 이메일 주소
                </TermsTextWrapper>
                <TermsTextWrapper>
                    3. 인터넷 서비스 이용 과정에서 IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록,
                    불량 이용기록 등과 같은 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.
                </TermsTextWrapper>
            </TermsWrapper>
            <CheckBoxContainer>
                <CheckBox checked={termsAgreed} onChange={handleCheckboxChange} />
                <CheckTextWrapper>
                    <b>개인정보 처리방침</b>&nbsp;및&nbsp;<b>서비스 이용 약관</b>에 모두 동의합니다.
                </CheckTextWrapper>
            </CheckBoxContainer>
            <ValidationList>
                <ValidationItem
                    isValid={termsAgreed}
                    isDirty={isTermsDirty}
                    text="개인정보 처리방침 및 서비스 이용 약관에 동의해야 합니다."
                />
            </ValidationList>
            <ButtonWrapper>
                <TextButton
                    shape="positive-curved"
                    text="다음 단계"
                    width="200px"
                    onClick={() => onHandleNextStep({ termsAgreed })}
                    disabled={!termsAgreed}
                />
            </ButtonWrapper>
        </TermsContainer>
    );
}

SignUpTerms.propTypes = {
    totalState: PropTypes.shape({
        termsAgreed: PropTypes.bool,
        id: PropTypes.string,
        password: PropTypes.string,
        nickname: PropTypes.string,
        email: PropTypes.string,
        primaryLang: PropTypes.number,
        learningLangs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number, PropTypes.string)),
    }).isRequired,
    onHandleNextStep: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const TermsContainer = styled.div`
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

const TermsWrapper = styled.div`
    box-sizing: border-box;
    overflow-y: auto;
    width: 500px;
    height: 250px;
    margin-bottom: 10px;
    padding: 20px;
    background-color: ${primary1};
    border: 3px solid ${primary4};
    border-radius: 20px;
`;

const TermsTitleWrapper = styled.div`
    margin-bottom: 25px;
    text-align: center;
    font-size: 25px;
    font-weight: 800;
    color: black;
`;

const TermsSubTitleWrapper = styled.div`
    margin-top: 25px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
    line-height: 25px;
`;

const TermsTextWrapper = styled.div`
    margin-bottom: 10px;
    font-size: 17px;
    font-weight: 400;
    text-indent: 20px;
    text-align: justify;
    line-height: 25px;
`;

const CheckBoxContainer = styled.div`
    display: flex;
    justify-content: right;
    align-content: center;
    gap: 10px;
`;

const CheckTextWrapper = styled.div`
    display: flex;
    align-items: center;
    color: black;
    font-size: 17px;
    font-weight: 400;
    height: 20px;
`;

const ValidationList = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    margin-top: 25px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
    width: 500px;
`;

// ----------------------------------------------------------------------------------------------------

export default SignUpTerms;
