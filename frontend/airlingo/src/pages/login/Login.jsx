import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { TextButton } from "@/components/common/button";
import { loginUser } from "@/api";
import { useRouter } from "@/hooks";
import { signinUser } from "@/features/User/UserSlice";
import LoginFailModal from "@/components/modal/login/LoginFailModal";

function Login() {
    const dispatch = useDispatch();
    const loginIdRef = useRef();
    const passwordRef = useRef();
    const { routeTo } = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginRequetDto = {
            userLoginId: loginIdRef.current.value,
            userPassword: passwordRef.current.value,
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

    const handleClickLoginFailModal = () => {
        // 로그인 실패창을 닫는다.
        setIsOpen(false);
    };

    return (
        <PageLayout id="PL">
            <LoginContainer>
                <LoginBox>
                    <LoginTitle>로그인</LoginTitle>
                    <LoginForm onSubmit={handleSubmit}>
                        <TextInputBox placeholder="아이디" ref={loginIdRef} />
                        <TextInputBox type="password" placeholder="비밀번호" ref={passwordRef} />
                        <TextButton type="submit" shape="login" text="로그인하기" />
                    </LoginForm>
                    <div
                        style={{
                            color: "#000",
                            textAlign: "center",
                            fontFamily: "Pretendard",
                            fontSize: "20px",
                            fontWeight: "300",
                            fontStyle: "normal",
                            lineHeight: "normar",
                            textDecorationLine: "underline",
                            marginTop: "30px",
                        }}
                    >
                        <a href="/signup">혹시 회원가입을 하지 않으셨나요?</a>
                    </div>

                    {/* <div
                        style={{
                            color: "#000",
                            textAlign: "center",
                            fontFamily: "Pretendard",
                            fontSize: "20px",
                            fontWeight: "300",
                            fontStyle: "normal",
                            lineHeight: "normar",
                            textDecorationLine: "underline",
                            marginTop: "30px",
                            marginBottom: "30px",
                        }}
                    >
                        <a href="/">아이디 또는 비밀번호를 잊으셨나요?</a>
                    </div> */}
                </LoginBox>
                {/* <DivisionLineBox>
                    <DivisionLine />
                    <DivisionText>또는</DivisionText>
                    <DivisionLine />
                </DivisionLineBox> */}
                {/* <SocialLoginBox> */}
                {/* <TextButton shape="googleLogin" text="Google 계정으로 로그인" /> */}
                {/* fix me! 구글로그인 API 존재X */}
                {/* <GoogleLoginButton type="button">
                        <GoogleLoginDiv>
                            <GoogleImage
                                src="https://airlingobucket.s3.ap-northeast-2.amazonaws.com/%EA%B5%AC%EA%B8%80%EC%9D%B4%EB%AF%B8%EC%A7%80.png"
                                alt=""
                            />
                            <GoogleLoginText>Google 계정으로 로그인</GoogleLoginText>
                        </GoogleLoginDiv>
                    </GoogleLoginButton> */}
                {/* <div
                        style={{
                            color: "#000",
                            textAlign: "center",
                            fontFamily: "Pretendard",
                            fontSize: "20px",
                            fontWeight: "300",
                            fontStyle: "normal",
                            lineHeight: "normar",
                            textDecorationLine: "underline",
                        }}
                    >
                        <a href="/signup">혹시 회원가입을 하지 않으셨나요?</a>
                    </div>
                </SocialLoginBox> */}
            </LoginContainer>
            <LoginFailModal isOpen={isOpen} onClickAgree={() => handleClickLoginFailModal()} />
        </PageLayout>
    );
}

const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 180px;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 501px;
    height: 400px;
    border-radius: 20px;
    border: 3px solid;
    margin-top: 30px;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 501px;
    height: 380px;
`;
// const DivisionLineBox = styled.div`
//     width: 500px;
//     height: 30px;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-top: 26px;
//     margin-bottom: 26px;
// `;

// const SocialLoginBox = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 501px;
//     height: 157px;
// `;

const LoginTitle = styled.div`
    margin-top: 10px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    justify-content: center;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 45px;
    font-style: normal;
    font-weight: 800;
    line-height: 44px; /* 97.778% */
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextInputBox = styled.input`
    box-sizing: border-box;
    width: 400px;
    height: 50px;
    outline: none;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #000;
    margin: 10px;
`;

// const DivisionLine = styled.hr`
//     width: 200px;
//     height: 2px;
//     flex-grow: 1;
//     border: none;
//     border-top: 1px solid black;
// `;

// const DivisionText = styled.span`
//     color: #000;
//     font-family: Pretendard;
//     font-size: 25px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
// `;

// const GoogleLoginButton = styled.button`
//     background-color: #fff;
//     align-items: center;
//     width: 450px;
//     height: 50px;
//     border: 1px solid #000;
//     border-radius: 10px;
// `;

// const GoogleLoginDiv = styled.div`
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
// `;

// const GoogleLoginText = styled.span`
//     height: 50px;
//     padding: 10px 20px;
//     font-size: 20px;
//     font-weight: 700;
// `;
// const GoogleImage = styled.img`
//     width: 20px;
//     height: 20px;
//     background: url();
// `;

export default Login;
