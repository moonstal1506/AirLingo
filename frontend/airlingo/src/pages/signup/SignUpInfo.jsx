import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ValidationItem from "@/components/validationList";
import { TextInput } from "@/components/common/input";
import theme from "@/assets/styles/Theme";
import { TextButton } from "@/components/common/button";
import { checkId, checkPassword, checkConfirmPassword } from "@/utils/validationCheck";
import { getLoginIdIsDuplicated } from "@/api/user";

// ----------------------------------------------------------------------------------------------------

const { primary1, primary4 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function SignUpInfo({ totalState, onHandlePrevStep, onHandleNextStep }) {
    const [id, setId] = useState({
        value: totalState.id,
        debounced: totalState.id,
        valid: checkId(totalState.id),
        possible: false,
        dirty: totalState.id.length > 0,
    });
    const [password, setPassword] = useState({ value: "", valid: false, dirty: false });
    const [confirmPassword, setConfirmPassword] = useState({
        value: "",
        valid: false,
        dirty: false,
    });

    useEffect(() => {
        const timerId = setTimeout(() => {
            setId((prev) => ({ ...prev, debounced: id.value }));
        }, 250);

        return () => {
            clearTimeout(timerId);
        };
    }, [id.value]);

    useEffect(() => {
        if (id.debounced) {
            getLoginIdIsDuplicated({
                responseFunc: {
                    200: () => {
                        console.log("아이디가 중복되지 않았습니다!");
                        setId((prev) => ({ ...prev, possible: true }));
                    },
                    432: () => {
                        console.log("이미 사용 중인 아이디입니다!");
                        setId((prev) => ({ ...prev, possible: false }));
                    },
                },
                data: {
                    userLoginId: id.debounced,
                },
            });
        }
    }, [id.debounced]);

    const handleIdChange = (event) => {
        const newId = event.target.value.trim();
        setId((prev) => ({ ...prev, value: newId, valid: checkId(newId), dirty: true }));
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value.trim();
        setPassword((prev) => ({
            ...prev,
            value: newPassword,
            valid: checkPassword(newPassword),
            dirty: true,
        }));
        setConfirmPassword((prev) => ({
            ...prev,
            valid: checkConfirmPassword(newPassword, confirmPassword.value),
        }));
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value.trim();
        setConfirmPassword((prev) => ({
            ...prev,
            value: newConfirmPassword,
            valid: checkConfirmPassword(password.value, newConfirmPassword),
            dirty: true,
        }));
    };

    return (
        <InfoContainer>
            <SubTitleWrapper>기본 정보 입력</SubTitleWrapper>
            <InputBox>
                <TextInput
                    placeholder="아이디"
                    width="500px"
                    value={id.value}
                    onChange={handleIdChange}
                    color={primary1}
                />
                <TextInput
                    type="password"
                    placeholder="비밀번호"
                    width="500px"
                    value={password.value}
                    onChange={handlePasswordChange}
                    color={primary1}
                />
                <TextInput
                    type="password"
                    placeholder="비밀번호 확인"
                    width="500px"
                    value={confirmPassword.value}
                    onChange={handleConfirmPasswordChange}
                    color={primary1}
                />
            </InputBox>
            <ValidationList>
                <ValidationItem
                    isValid={id.valid}
                    isDirty={id.dirty}
                    text="아이디는 4 ~ 20자의 영어 소문자와 숫자의 조합입니다."
                />
                <ValidationItem
                    isValid={id.possible}
                    isDirty={id.dirty}
                    text="아이디는 다른 회원의 아이디와 중복되지 않아야 합니다."
                />
                <ValidationItem
                    isValid={password.valid}
                    isDirty={password.dirty}
                    text="비밀번호는 8 ~ 20자의 영어 대 · 소문자, 숫자, 특수문자의 조합입니다."
                />
                <ValidationItem
                    isValid={confirmPassword.valid}
                    isDirty={confirmPassword.dirty}
                    text="비밀번호와 비밀번호 확인은 동일해야 합니다."
                />
            </ValidationList>
            <ButtonBox>
                <TextButton
                    shape="negative-curved"
                    text="이전 단계"
                    width="200px"
                    onClick={() => onHandlePrevStep({ id: id.value })}
                />
                <TextButton
                    shape="positive-curved"
                    text="다음 단계"
                    width="200px"
                    onClick={() => onHandleNextStep({ id: id.value, password: password.value })}
                    disabled={
                        !id.valid || !id.possible || !password.valid || !confirmPassword.valid
                    }
                />
            </ButtonBox>
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

const InputBox = styled.div`
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

const ButtonBox = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
    width: 500px;
`;

// ----------------------------------------------------------------------------------------------------

export default SignUpInfo;
