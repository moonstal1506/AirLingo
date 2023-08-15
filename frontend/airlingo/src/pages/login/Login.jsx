import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextButton } from "@/components/common/button";
import { loginUser } from "@/api";
import { useRouter } from "@/hooks";
import { signinUser } from "@/features/User/UserSlice";
import LoginFailModal from "@/components/modal/login/LoginFailModal";
import { TextInput } from "@/components/common/input";

// ----------------------------------------------------------------------------------------------------

function Login() {
    const dispatch = useDispatch();
    const { routeTo } = useRouter();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginRequetDto = {
            userLoginId: id,
            userPassword: password,
        };
        await loginUser({
            responseFunc: {
                200: (response) => {
                    dispatch(
                        signinUser({
                            ...response.data.data,
                            userAccessToken: response.headers["access-token"],
                        }),
                    );
                    routeTo("/matchhome");
                },
                400: () => {
                    setIsOpen(true);
                },
                470: () => {
                    setIsOpen(true);
                },
            },
            data: loginRequetDto,
            routeTo,
        });
    };

    const handleSignUpClick = () => {
        routeTo("/signup");
    };

    const handleClickLoginFailModal = () => {
        setIsOpen(false);
    };

    return (
        <LoginContainer>
            <LoginBox>
                <TitleWrapper>로그인</TitleWrapper>
                <TextInput
                    placeholder="아이디"
                    width="75%"
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                    color="white"
                />
                <TextInput
                    type="password"
                    placeholder="비밀번호"
                    width="75%"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    color="white"
                />
                <TextButton
                    type="text"
                    text="로그인하기"
                    width="75%"
                    onClick={handleSubmit}
                    shape="positive-curved"
                />
                <SignUpTextWrapper onClick={handleSignUpClick}>
                    혹시 회원가입을 하지 않으셨나요?
                </SignUpTextWrapper>
            </LoginBox>
            <LoginFailModal isOpen={isOpen} onClickAgree={() => handleClickLoginFailModal()} />
        </LoginContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 400px;
    border-radius: 20px;
    gap: 25px;
`;

const TitleWrapper = styled.div`
    display: flex;
    margin-bottom: 25px;
    font-size: 45px;
    font-weight: 800;
`;

const SignUpTextWrapper = styled.div`
    margin-top: 25px;
    font-size: 20px;
    font-weight: 400;
    text-decoration-line: underline;
    cursor: pointer;
`;

// ----------------------------------------------------------------------------------------------------

export default Login;
