import styled from "@emotion/styled";
import { useState } from "react";
import Validation from "@/components/validationList";
import { TextInput } from "@/components/common/input";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary1, primary4 } = theme.colors;

function checkNickname(nickname) {
    const nicknameRegex = /^[a-zA-Z0-9]{2,20}$/; // Modified regex for 2-20 characters, alphanumeric
    return nicknameRegex.test(nickname);
}

function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// ----------------------------------------------------------------------------------------------------

function SignUpProfile() {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidNickname, setIsValidNickname] = useState(false);

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
        <TermsBox>
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
            <Validation
                isValid={isValidNickname}
                text="닉네임은 2자 이상, 20자 이하의 영어 대·소문자, 숫자의 조합입니다."
            />{" "}
            <Validation
                isValid={isValidEmail}
                text="이메일은 example@domain.com과 같은 형식으로 작성해야 합니다."
            />
        </TermsBox>
    );
}

// ----------------------------------------------------------------------------------------------------

const TermsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    width: 500px;
    font-family: "Pretendard";
`;

const TermsTitleWrapper = styled.div`
    height: 50px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    color: ${primary4};
`;

// ----------------------------------------------------------------------------------------------------

export default SignUpProfile;
