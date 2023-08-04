import styled from "@emotion/styled";
import { useState } from "react";
import PropTypes from "prop-types";
import ValidationItem from "@/components/validationList";
import { TextInput } from "@/components/common/input";
import theme from "@/assets/styles/Theme";
import { TextButton } from "@/components/common/button";

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

function SignUpInfo({ totalState, onHandlePrevStep, onHandleNextStep }) {
    const [id, setId] = useState(totalState.id);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValidId, setIsValidId] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isEqualPassword, setIsEqualPassword] = useState(false);
    const [isIdDirty, setIsIdDirty] = useState(false);
    const [isPasswordDirty, setIsPasswordDirty] = useState(false);
    const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(false);

    const handleIdChange = (event) => {
        const newId = event.target.value.trim();
        setId(newId);
        setIsValidId(checkId(newId));
        setIsIdDirty(true);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value.trim();
        setPassword(newPassword);
        setIsValidPassword(checkPassword(newPassword));
        setIsEqualPassword(checkConfirmPassword(newPassword, confirmPassword));
        setIsPasswordDirty(true);
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value.trim();
        setConfirmPassword(newConfirmPassword);
        setIsEqualPassword(checkConfirmPassword(password, newConfirmPassword));
        setIsConfirmPasswordDirty(true);
    };

    return (
        <InfoContainer>
            <SubTitleWrapper>기본 정보 입력</SubTitleWrapper>
            <InputContainer>
                <TextInput
                    placeholder="아이디"
                    width="500px"
                    value={id}
                    onChange={handleIdChange}
                    color={primary1}
                />
                <TextInput
                    type="password"
                    placeholder="비밀번호"
                    width="500px"
                    value={password}
                    onChange={handlePasswordChange}
                    color={primary1}
                />
                <TextInput
                    type="password"
                    placeholder="비밀번호 확인"
                    width="500px"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    color={primary1}
                />
            </InputContainer>
            <ValidationList>
                <ValidationItem
                    isValid={isValidId}
                    isDirty={isIdDirty}
                    text="아이디는 4 ~ 20자의 영어 소문자와 숫자의 조합입니다."
                />
                <ValidationItem
                    isValid={isValidPassword}
                    isDirty={isPasswordDirty}
                    text="비밀번호는 8 ~ 20자의 영어 대 · 소문자, 숫자, 특수문자의 조합입니다."
                />
                <ValidationItem
                    isValid={isEqualPassword}
                    isDirty={isConfirmPasswordDirty}
                    text="비밀번호와 비밀번호 확인은 동일해야 합니다."
                />
            </ValidationList>
            <ButtonWrapper>
                <TextButton
                    shape="negative-curved"
                    text="이전 단계"
                    width="200px"
                    onClick={() => onHandlePrevStep({ id })}
                />
                <TextButton
                    shape="positive-curved"
                    text="다음 단계"
                    width="200px"
                    onClick={() => onHandleNextStep({ id, password })}
                    disabled={!isValidId || !isValidPassword || !isEqualPassword}
                />
            </ButtonWrapper>
        </InfoContainer>
    );
}

SignUpInfo.propTypes = {
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

const InfoContainer = styled.div`
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

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
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

export default SignUpInfo;
