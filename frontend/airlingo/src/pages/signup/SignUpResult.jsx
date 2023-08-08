import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { postSignUp } from "@/api";
import successImage from "@/assets/imgs/signup-success.gif";
import { useRouter } from "@/hooks";
import { TextButton } from "@/components/common/button";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { distinctgray } = theme.colors;

// ----------------------------------------------------------------------------------------------------

function SignUpResult({ totalState }) {
    const { routeTo } = useRouter();

    useEffect(() => {
        async function fetchSignUp() {
            await postSignUp({
                responseFunc: {
                    200: () => console.log("회원가입 성공!"),
                    400: () => console.log("회원가입 실패!"),
                },
                data: {
                    userLoginId: totalState.id,
                    userPassword: totalState.password,
                    userNickname: totalState.nickname,
                    userEmail: totalState.email,
                    userNativeLanguageId: totalState.primaryLang.id,
                    userInterestLanguageList: totalState.learningLangs.map((language) => ({
                        languageId: language.langId,
                        gradeId: language.gradeId,
                    })),
                },
            });
        }
        fetchSignUp();
    }, [
        totalState.id,
        totalState.password,
        totalState.nickname,
        totalState.email,
        totalState.primaryLang,
        totalState.learningLangs,
    ]);

    return (
        <ResultContainer>
            <TitleWrapper>랭커가 되신 것을 환영합니다!</TitleWrapper>
            <ResultLine />
            <SubTitleWrapper>지금 바로 여정을 떠나보세요!</SubTitleWrapper>
            <SuccessImg />
            <ButtonWrapper>
                <TextButton
                    shape="positive-normal"
                    text="로그인 하러 가기"
                    width="300px"
                    onClick={() => routeTo("/login")}
                />
            </ButtonWrapper>
        </ResultContainer>
    );
}

SignUpResult.propTypes = {
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
};

// ----------------------------------------------------------------------------------------------------

const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 25px;
    color: ${distinctgray};
    font-size: 45px;
    font-weight: 800;
`;

const ResultLine = styled.div`
    width: 600px;
    height: 3px;
    background-color: ${distinctgray};
    border-radius: 50px;
    margin-bottom: 25px;
`;

const SubTitleWrapper = styled.div`
    margin-bottom: 25px;
    color: ${distinctgray};
    font-size: 30px;
    font-weight: 400;
`;

const SuccessImg = styled.div`
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background-image: url(${successImage});
    background-size: cover;
    background-position: center center;
    margin-top: 25px;
    margin-bottom: 25px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
    width: 500px;
`;

// ----------------------------------------------------------------------------------------------------

export default SignUpResult;
