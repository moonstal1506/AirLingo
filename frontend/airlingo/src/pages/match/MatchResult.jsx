/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { selectMeeting } from "../../features/Meeting/MeetingSlice";
import receiptPaper from "@/assets/imgs/receipt-paper.jpg";
import { formatTime } from "@/utils/format";
import loginSuccessImage from "@/assets/imgs/Login-Success-Image.png";
import { useRouter } from "@/hooks";

function MatchResult() {
    const { otherUser } = useSelector(selectMeeting);
    const [time, setTime] = useState(10);
    const { routeTo } = useRouter();
    console.log(otherUser);
    useEffect(() => {
        if (time === 0) {
            routeTo("/matchstandby");
        }
    }, [time, routeTo]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

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
                        <ContentMainTitle>{otherUser.userNickname}</ContentMainTitle>
                    </ContentTitleWrapper>
                    <ContentImageWrapper src={otherUser.userImgUrl} />
                    <ContentLine />
                    <ContentScoreBox>
                        <ContentScoreTextBox>
                            <ContentScoreText weight="400">매칭 점수</ContentScoreText>
                            <ContentScoreText weight="400">|</ContentScoreText>
                            <ContentScoreText weight="700">
                                {otherUser.userRating?.toFixed(1)}
                            </ContentScoreText>
                        </ContentScoreTextBox>
                        <ContentScoreTextBox>
                            <ContentScoreText weight="400">등급</ContentScoreText>
                            <ContentScoreText weight="400">|</ContentScoreText>
                            <ContentScoreText weight="700">
                                {otherUser.mileageGrade}
                            </ContentScoreText>
                        </ContentScoreTextBox>
                    </ContentScoreBox>
                    <ContentLine />
                    <ProfileBox>
                        <span>대표 언어</span>
                        <ProfileContentBox>
                            <FlagWrapper>
                                <img src={otherUser.userNativeLanguage.imageUrl} alt="flagIcon" />
                                <span>{otherUser.userNativeLanguage.languageKorName}</span>
                            </FlagWrapper>
                        </ProfileContentBox>
                    </ProfileBox>
                    <ProfileBox>
                        <span>관심 언어</span>
                        <ProfileContentBox>
                            {/* 관심언어 개수만큼 반복 */}
                            {otherUser.userInterestLanguages.map((language) => (
                                <FlagWrapper key={language.languageKorName}>
                                    <img src={language.imageUrl} alt="flagIcon" />
                                    <span>{language.languageKorName}</span>
                                </FlagWrapper>
                            ))}
                        </ProfileContentBox>
                    </ProfileBox>
                    <ProfileBox>
                        <span>자기소개</span>
                        <ProfileIntroduceText>{otherUser.userBio}</ProfileIntroduceText>
                    </ProfileBox>
                </MatchResultContentBox>
            </MatchResultContainer>
        </PageLayout>
    );
}

const PageLayout = styled.div`
    width: 100%;
    height: calc(100% + 300px);
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
    box-sizing: border-box;
    padding: 25px;
    background-image: url(${receiptPaper});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
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
    gap: 6px;

    span {
        color: #000;
        text-align: center;
        font-family: Pretendard;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 106.667% */
    }
`;

const ContentScoreBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ContentScoreTextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 16px;
`;

const ContentScoreText = styled.span`
    color: #000;
    text-align: center;
    font-size: 15px;
    font-weight: ${({ weight }) => weight};
    line-height: 22px; /* 146.667% */
`;

const ProfileContentBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
`;

const FlagWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50px;
    gap: 6px;
    img {
        width: 30px;
        height: 30px;
    }
`;

const ProfileIntroduceText = styled.div`
    width: 80%;
    color: #000;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px; /* 120% */
    text-align: center;
`;
export default MatchResult;
