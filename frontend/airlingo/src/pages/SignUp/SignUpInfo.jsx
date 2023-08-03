import styled from "@emotion/styled";
import { useState } from "react";
import Validation from "@/components/validationList";
import { TextInput } from "@/components/common/input";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary1, primary4 } = theme.colors;

function checkId(id) {
    const idRegex = /^[a-z0-9]{4,20}$/;
    return idRegex.test(id);
}

function checkPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
}

function checkConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

// ----------------------------------------------------------------------------------------------------

function SignUpInfo() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isValidId, setIsValidId] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isEqualPassword, setIsEqualPassword] = useState(false);

    const handleIdChange = (event) => {
        const newId = event.target.value.trim();
        setId(newId);
        setIsValidId(checkId(newId));
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value.trim();
        setPassword(newPassword);
        setIsValidPassword(checkPassword(newPassword));
        setIsEqualPassword(checkConfirmPassword(newPassword, confirmPassword));
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value.trim();
        setConfirmPassword(newConfirmPassword);
        setIsEqualPassword(checkConfirmPassword(password, newConfirmPassword));
    };

    return (
        <TermsBox>
            <TermsTitleWrapper>기본 정보 입력</TermsTitleWrapper>
            <TextInput
                placeholder="아이디"
                color={primary1}
                width="500px"
                height="50px"
                value={id}
                onChange={handleIdChange}
            />
            <TextInput
                // type="password"
                placeholder="비밀번호"
                color={primary1}
                width="500px"
                height="50px"
                value={password}
                onChange={handlePasswordChange}
            />
            <TextInput
                // type="password"
                placeholder="비밀번호 확인"
                color={primary1}
                width="500px"
                height="50px"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />

            <Validation
                isValid={isValidId}
                text="아이디는 4자 이상, 20자 이하의 영어 소문자와 숫자의 조합입니다."
            />
            <Validation
                isValid={isValidPassword}
                text="비밀번호는 8자 이상, 20자 이하의 영어 대·소문자, 숫자, 특수문자의 조합입니다."
            />
            <Validation
                isValid={isEqualPassword}
                text="비밀번호와 비밀번호 확인은 동일해야 합니다."
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
`;

const TermsTitleWrapper = styled.div`
    height: 50px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    color: ${primary4};
`;

// ----------------------------------------------------------------------------------------------------

export default SignUpInfo;
