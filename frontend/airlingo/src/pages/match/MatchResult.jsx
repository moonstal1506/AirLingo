import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { selectMeeting } from "../../features/Meeting/MeetingSlice";
import receiptPaper from "@/assets/imgs/img/receipt-paper.jpg";
import { formatTime } from "@/utils/format";
import loginSuccessImage from "@/assets/imgs/img/Login-Success-Image.png";
/*

premium: false
userId: 2
userInterestLanguages: ['한국어']
userNativeLanguage: "영어"
userNickname: "user2"
userRating: 4
userStudyLanguage: "한국어"
userStudyLanguageGradeName: "B1"
userStudyLanguageGradeScore: 3
userStudyLanguageId: 1

*/
function MatchResult() {
    const { otherUser } = useSelector(selectMeeting);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    console.log(otherUser);
    return (
        <PageLayout>
            <MatchResultContainer>
                <MatchResultHeaderBox>
                    <HeaderTitle>탑승 완료! 탑승권을 확인해 주세요.</HeaderTitle>
                    <HeaderSubTitleWrapper>
                        <HeaderSubTitle>남은 확인 시간</HeaderSubTitle>
                        <HeaderSubTitle bold>{formatTime(time)}</HeaderSubTitle>
                    </HeaderSubTitleWrapper>
                </MatchResultHeaderBox>
                <MatchResultContentBox>
                    <ContentTitleWrapper>
                        <ContentSubTitle>다음 랭커와 매칭에 성공하였습니다!</ContentSubTitle>
                        <ContentMainTitle>#{otherUser.userNickname}</ContentMainTitle>
                    </ContentTitleWrapper>
                    <ContentImageWrapper />
                    <ContentLine />
                    <ProfileBox>box</ProfileBox>
                    <ProfileBox>box</ProfileBox>
                    <ProfileBox>box</ProfileBox>
                </MatchResultContentBox>
            </MatchResultContainer>
        </PageLayout>
    );
}

const PageLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MatchResultContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    padding: 25px;
`;

const MatchResultHeaderBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;

const MatchResultContentBox = styled.div`
    width: 360px;
    height: 740px;
    background-image: url(${receiptPaper});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
`;

const HeaderSubTitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 30px;
`;

const HeaderTitle = styled.span`
    color: #000;
    text-align: center;
    font-size: 45px;
    font-weight: 800;
    line-height: 44px; /* 97.778% */
`;

const HeaderSubTitle = styled.span`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: ${(props) => (props.bold ? 700 : 400)};
    line-height: normal;
`;

const ContentTitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ContentSubTitle = styled.span`
    color: #000;
    font-size: 15px;
    font-weight: 400;
    line-height: 22px; /* 146.667% */
`;

const ContentMainTitle = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
`;

const ContentImageWrapper = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 150px;
    background:
        url(${loginSuccessImage}),
        lightgray -81.312px -4.17px / 206.818% 206.818%;
    background-repeat: no-repeat;
    background-size: cover;
`;

const ContentLine = styled.hr`
    background-color: #000;
    border-radius: 2px solid black;
    width: 100%;
`;

const ProfileBox = styled.div`
    border-radius: 10px;
    border: 1px solid #000;
    display: flex;
    width: 300px;
    height: 100px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
`;

export default MatchResult;
