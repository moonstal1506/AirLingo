import styled from "@emotion/styled";
import { useState } from "react";
import PropTypes from "prop-types";
import ValidationItem from "@/components/validationList";
import { TextInput } from "@/components/common/input";
import theme from "@/assets/styles/Theme";
import { TextButton } from "@/components/common/button";

// ----------------------------------------------------------------------------------------------------

const { primary1, primary4 } = theme.colors;

function checkNickname(nickname) {
    const nicknameRegex = /^[a-zA-Z0-9]{2,20}$/;
    return nicknameRegex.test(nickname);
}

function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// ----------------------------------------------------------------------------------------------------

function SignUpProfile({ totalState, onHandlePrevStep, onHandleNextStep }) {
    const [nickname, setNickname] = useState(totalState.nickname);
    const [email, setEmail] = useState(totalState.email);
    const [isValidNickname, setIsValidNickname] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    // const [isPasswordDirty, setIsPasswordDirty] = useState(false);
    // const [isEmailDirty, setIsEmailDirty] = useState(false);

    const handleIdChange = (event) => {
        const newNickname = event.target.value;
        setNickname(newNickname);
        setIsValidNickname(checkNickname(newNickname));
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(checkEmail(newEmail));
    };

    return (
        <ProfileContainer>
            <TermsTitleWrapper>개인 정보 입력</TermsTitleWrapper>
            <TextInput
                placeholder="닉네임"
                color={primary1}
                width="500px"
                height="50px"
                value={nickname}
                onChange={handleIdChange}
            />
            <TextInput
                placeholder="이메일"
                color={primary1}
                width="500px"
                height="50px"
                value={email}
                onChange={handleEmailChange}
            />
            <ValidationItem
                isValid={isValidNickname}
                text="닉네임은 2 ~ 20자의 영어 대 · 소문자, 숫자의 조합입니다."
            />{" "}
            <ValidationItem
                isValid={isValidEmail}
                text="이메일은 example@domain.com과 같은 형식으로 작성해야 합니다."
            />
            <ButtonWrapper>
                <TextButton
                    shape="negative-curved"
                    text="이전 단계"
                    width="200px"
                    onClick={() => onHandlePrevStep({ nickname })}
                />
                <TextButton
                    shape="positive-curved"
                    text="다음 단계"
                    width="200px"
                    onClick={() => onHandleNextStep({ nickname, email })}
                    disabled={!isValidEmail || !isValidNickname}
                />
            </ButtonWrapper>
        </ProfileContainer>
    );
}

SignUpProfile.propTypes = {
    totalState: PropTypes.shape({
        termsAgreed: PropTypes.bool,
        id: PropTypes.string,
        password: PropTypes.string,
        nickname: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
    onHandlePrevStep: PropTypes.func.isRequired,
    onHandleNextStep: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------------------------------------

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
`;

const TermsTitleWrapper = styled.div`
    height: 50px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    color: ${primary4};
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
    width: 500px;
`;

// ----------------------------------------------------------------------------------------------------

export default SignUpProfile;
