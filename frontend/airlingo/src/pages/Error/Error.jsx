import styled from "@emotion/styled";
import { useRouter } from "@/hooks";
import { TextButton } from "@/components/common/button";
import Header from "@/components/header";

function Error() {
    const { routeTo } = useRouter();

    const handleClickButton = () => {
        routeTo("/", { replace: false });
    };

    return (
        <PageLayout>
            <Header />
            <ErrorTitleBox>
                <ErrorTitle>서버 에러 또는 올바르지 않은 접근입니다!</ErrorTitle>
                <ErrorSubTitle>아래 버튼을 통해 홈 페이지로 이동해주세요.</ErrorSubTitle>
            </ErrorTitleBox>
            <ErrorImgWrapper src="public/error-page.png" alt="errorPage" />
            <TextButton
                text="홈으로 가기"
                onClick={handleClickButton}
                shape="positive-normal-large"
            />
        </PageLayout>
    );
}

const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
    width: 100%;
    padding-top: 180px;
`;

const ErrorTitleBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ErrorTitle = styled.span`
    color: #000;
    font-size: 45px;
    font-weight: 700;
    line-height: normal;
`;

const ErrorImgWrapper = styled.img`
    border-radius: 20px;
`;

const ErrorSubTitle = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 400;
    line-height: normal;
`;

export default Error;
