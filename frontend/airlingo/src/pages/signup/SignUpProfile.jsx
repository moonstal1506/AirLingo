import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ValidationItem from "@/components/validationList";
import { TextInput } from "@/components/common/input";
import theme from "@/assets/styles/Theme";
import { TextButton } from "@/components/common/button";
import { checkNickname, checkEmail } from "@/utils/validationCheck";
import { getNicknameIsDuplicated, getEmailIsDuplicated } from "@/api/user";

// ----------------------------------------------------------------------------------------------------

const { primary1, primary4 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function SignUpProfile({ totalState, onHandlePrevStep, onHandleNextStep }) {
    const [nickname, setNickname] = useState({
        value: totalState.nickname,
        debounced: totalState.nickname,
        valid: checkNickname(totalState.nickname),
        possible: false,
        dirty: totalState.nickname.length > 0,
    });
    const [email, setEmail] = useState({
        value: totalState.email,
        debounced: totalState.email,
        valid: checkEmail(totalState.email),
        possible: false,
        dirty: totalState.email.length > 0,
    });

    useEffect(() => {
        const nicknameTimerId = setTimeout(() => {
            setNickname((prev) => ({ ...prev, debounced: nickname.value }));
        }, 250);

        const emailTimerId = setTimeout(() => {
            setEmail((prev) => ({ ...prev, debounced: email.value }));
        }, 250);

        return () => {
            clearTimeout(nicknameTimerId);
            clearTimeout(emailTimerId);
        };
    }, [email.value, nickname.value]);

    useEffect(() => {
        if (nickname.debounced) {
            getNicknameIsDuplicated({
                responseFunc: {
                    200: () => {
                        setNickname((prev) => ({ ...prev, possible: true }));
                    },
                    431: () => {
                        setNickname((prev) => ({ ...prev, possible: false }));
                    },
                },
                data: {
                    nickname: nickname.debounced,
                },
            });
        }
    }, [nickname.debounced]);

    useEffect(() => {
        if (email.debounced) {
            getEmailIsDuplicated({
                responseFunc: {
                    200: () => {
                        setEmail((prev) => ({ ...prev, possible: true }));
                    },
                    430: () => {
                        setEmail((prev) => ({ ...prev, possible: false }));
                    },
                },
                data: {
                    email: email.debounced,
                },
            });
        }
    }, [email.debounced]);

    const handleIdChange = (event) => {
        const newNickname = event.target.value.trim();
        setNickname((prev) => ({
            ...prev,
            value: newNickname,
            valid: checkNickname(newNickname),
            dirty: true,
        }));
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value.trim();
        setEmail((prev) => ({
            ...prev,
            value: newEmail,
            valid: checkEmail(newEmail),
            dirty: true,
        }));
    };

    return (
        <ProfileContainer>
            <SubTitleWrapper>개인 정보 입력</SubTitleWrapper>
            <InputBox>
                <TextInput
                    placeholder="닉네임"
                    width="500px"
                    value={nickname.value}
                    onChange={handleIdChange}
                    color={primary1}
                />
                <TextInput
                    placeholder="이메일"
                    width="500px"
                    value={email.value}
                    onChange={handleEmailChange}
                    color={primary1}
                />
            </InputBox>
            <ValidationList>
                <ValidationItem
                    isValid={nickname.valid}
                    isDirty={nickname.dirty}
                    text="닉네임은 2 ~ 20자의 영어 대 · 소문자, 숫자의 조합입니다."
                />
                <ValidationItem
                    isValid={nickname.possible}
                    isDirty={nickname.dirty}
                    text="닉네임은 다른 회원의 닉네임과 중복되지 않아야 합니다."
                />
                <ValidationItem
                    isValid={email.valid}
                    isDirty={email.dirty}
                    text="이메일은 example@domain.com과 같은 형식으로 작성해야 합니다."
                />
                <ValidationItem
                    isValid={email.possible}
                    isDirty={email.dirty}
                    text="이메일은 다른 회원의 이메일과 중복되지 않아야 합니다."
                />
            </ValidationList>
            <ButtonBox>
                <TextButton
                    shape="negative-curved"
                    text="이전 단계"
                    width="200px"
                    onClick={() =>
                        onHandlePrevStep({ nickname: nickname.value, email: email.value })
                    }
                />
                <TextButton
                    shape="positive-curved"
                    text="다음 단계"
                    width="200px"
                    onClick={() =>
                        onHandleNextStep({ nickname: nickname.value, email: email.value })
                    }
                    disabled={
                        !nickname.valid || !nickname.possible || !email.valid || !email.possible
                    }
                />
            </ButtonBox>
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

const ProfileContainer = styled.div`
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

export default SignUpProfile;
