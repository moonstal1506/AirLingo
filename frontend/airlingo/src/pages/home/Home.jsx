import styled from "@emotion/styled";
import { useState } from "react";
import catchphraseBackground from "@/assets/imgs/catchphrase-background.png";
import subcatchphrase1Background from "@/assets/imgs/subcatchphrase1-background.png";
import subcatchphrase2Background from "@/assets/imgs/subcatchphrase2-background.png";
import subcatchphrase3Background from "@/assets/imgs/subcatchphrase3-background.png";
import downIcon from "@/assets/imgs/down-icon.png";
import developersLogo from "@/assets/imgs/developers-logo.png";
import { TextButton } from "@/components/common/button";
import { useRouter } from "@/hooks";

const HomeContainer = styled.div`
    width: 100%;
    height: calc(100% - 120px);
    position: relative;
    font-family: Pretendard;
    padding-top: 120px;
`;

function Home() {
    const { routeTo } = useRouter();

    const [setCurrentContainerIndex] = useState(0);

    const scrollToNextContainer = (containerIndex) => {
        const nextContainerIndex = containerIndex + 1;
        const nextContainerElement = document.getElementById(`container-${nextContainerIndex}`);
        if (nextContainerElement) {
            nextContainerElement.scrollIntoView({ behavior: "smooth", block: "end" });
            setCurrentContainerIndex(nextContainerIndex);
        }
    };

    return (
        <HomeContainer>
            <MainCatchphraseBox id="container-0">
                <CatchphraseWrapper>
                    <div>
                        <CatchphraseAirLingo>에어링고</CatchphraseAirLingo>
                        <WithSpan>와 함께</WithSpan>
                    </div>
                    <WithDiv>세계로 떠납니다</WithDiv>
                    <SmallCatchphraseWrapper>
                        <div>전세계 사람들과 대화를 나누며 언어를 마스터해 보세요!</div>
                    </SmallCatchphraseWrapper>
                </CatchphraseWrapper>
                <ArrowIcon onClick={() => scrollToNextContainer(0)} src={downIcon} />
            </MainCatchphraseBox>

            <WhiteSubCatchphraseBox1 id="container-1">
                <CatchphraseImage src={subcatchphrase1Background} />
                <CatchphraseTextWrapper1>
                    <CatchphraseTitle>
                        <CatchphraseTitleColor>실시간</CatchphraseTitleColor>으로 진행되는{" "}
                        <CatchphraseTitleColor>원어민</CatchphraseTitleColor>과의 대화!
                    </CatchphraseTitle>
                    <CatchphraseContent>
                        언어 학습 방법 중 최선은{" "}
                        <CatchphraseContentBold>원어민과 대화하며 배우는 것</CatchphraseContentBold>
                        입니다. <br />
                        에어링고를 사용해 전 세계 각지의 원어민과 원격으로 만날 수 있습니다. <br />
                        이제{" "}
                        <CatchphraseContentBold>서로에게 언어를 배우고 대화</CatchphraseContentBold>
                        해 보세요!
                    </CatchphraseContent>
                </CatchphraseTextWrapper1>
                <ArrowIcon onClick={() => scrollToNextContainer(1)} src={downIcon} />
            </WhiteSubCatchphraseBox1>

            <WhiteSubCatchphraseBox2 id="container-2">
                <CatchphraseTextWrapper2>
                    <CatchphraseTitle>
                        <CatchphraseTitleColor>다양한 주제로 대화</CatchphraseTitleColor>하며,
                        서로를 <CatchphraseTitleColor>공유</CatchphraseTitleColor>해 보세요!
                    </CatchphraseTitle>
                    <CatchphraseContent>
                        서로 다른 출신 때문에{" "}
                        <CatchphraseContentBold>
                            하나의 대화 주제로도 많은 것을 공유
                        </CatchphraseContentBold>
                        할 수 있습니다! <br />
                        에어링고에서 제공하는 대화 카드를 통해 서로의 삶과 문화를 공유해 보세요.
                        <CatchphraseContentBold>별도의 녹음 파일</CatchphraseContentBold>과{" "}
                        <CatchphraseContentBold>자동 생성된 스크립트</CatchphraseContentBold>도
                        제공됩니다!
                    </CatchphraseContent>
                </CatchphraseTextWrapper2>
                <CatchphraseImage src={subcatchphrase2Background} />
                <ArrowIcon onClick={() => scrollToNextContainer(2)} src={downIcon} />
            </WhiteSubCatchphraseBox2>

            <WhiteSubCatchphraseBox1 id="container-3">
                <CatchphraseImage src={subcatchphrase3Background} />
                <CatchphraseTextWrapper2>
                    <CatchphraseTitle>
                        <CatchphraseTitleColor>랭커(Langker)</CatchphraseTitleColor>가 되세요!
                    </CatchphraseTitle>
                    <CatchphraseContent>
                        에어링고에서는 원어민과 대화하고, 이를 복습하며 나아가는 모든 유저들을
                        <br />
                        <CatchphraseContentBold>
                            랭커(Langker: Language + Speaker)
                        </CatchphraseContentBold>
                        라고 부릅니다. <br />
                        에어링고를 통해 배우고 싶은 언어의 랭커가 되길 바랍니다!
                    </CatchphraseContent>
                </CatchphraseTextWrapper2>
                <ArrowIcon onClick={() => scrollToNextContainer(3)} src={downIcon} />
            </WhiteSubCatchphraseBox1>

            <JoinContainer id="container-4">
                <JoinTextContainer>
                    <JoinText>
                        에어링고에서는 <JoinTextColor>이외에도 다양한 기능</JoinTextColor>을
                        랭커에게 <JoinTextColor>제공</JoinTextColor>하고 있어요!
                    </JoinText>
                </JoinTextContainer>
                <TextButton
                    shape="positive-home"
                    text="세계 여행 시작하기"
                    onClick={() => routeTo("/matchhome")}
                />
            </JoinContainer>

            <FooterBox>
                <LogoImage src={developersLogo} />
                <FooterText>
                    <ServiceTitle>AirLingo</ServiceTitle>
                    <CopyrightTextWrapper>
                        <CopyrightText>
                            Copyright 2023. <CopyrightTextBold>Developers.</CopyrightTextBold> All
                            Rights Reserved.
                        </CopyrightText>
                    </CopyrightTextWrapper>
                    <AddressText>
                        주소 : 서울특별시 강남구 역삼동 테헤란로 21(멀티캠퍼스 역삼) 1201호
                    </AddressText>
                    <LinkTextWrapper>
                        <LinkText>
                            <LinkTextUnderline>개인정보 처리방침</LinkTextUnderline>&nbsp; &nbsp; |
                            &nbsp; &nbsp;
                            <LinkTextUnderline>서비스 이용 약관</LinkTextUnderline>&nbsp; &nbsp; |
                            &nbsp; &nbsp;
                            <LinkTextUnderline>About Developers</LinkTextUnderline>
                        </LinkText>
                    </LinkTextWrapper>
                </FooterText>
            </FooterBox>
        </HomeContainer>
    );
}

const MainCatchphraseBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background: url(${catchphraseBackground}), black;
    background-repeat: no-repeat;
    background-size: cover;
`;

const CatchphraseWrapper = styled.div`
    position: absolute;
    bottom: 30%;
    right: 15%;
    text-shadow: 0px 0px 10px black;
    font-size: 55px;
    font-weight: 900;
`;

const CatchphraseAirLingo = styled.span`
    color: ${({ theme }) => theme.colors.primary4};
`;

const WithSpan = styled.span`
    color: white;
`;

const WithDiv = styled.div`
    color: white;
`;

const SmallCatchphraseWrapper = styled.div`
    margin-top: 23px;
    color: #fff;
    text-shadow: 0px 0px 10px 0px black;
    font-size: 18px;
    font-weight: 400;
`;

const WhiteSubCatchphraseBox1 = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 70px;
    flex-shrink: 0;
    background: white;
`;

const WhiteSubCatchphraseBox2 = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 70px;
    flex-shrink: 0;
    background: #e6f6f7;
`;

const CatchphraseImage = styled.img`
    width: 300px;
    height: 300px;
    flex-shrink: 0;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.75));
    border-radius: 20px;
`;

const CatchphraseTextWrapper1 = styled.div`
    display: flex;
    width: 700px;
    height: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    flex-shrink: 0;
`;

const CatchphraseTextWrapper2 = styled.div`
    display: flex;
    width: 750px;
    height: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    flex-shrink: 0;
`;

const CatchphraseTitle = styled.div`
    height: 50px;
    flex-shrink: 0;
    align-self: stretch;
    text-align: center;
    font-size: 40px;
    color: black;
    font-weight: 700;
`;

const CatchphraseTitleColor = styled.span`
    color: ${({ theme }) => theme.colors.primary4};
    font-weight: 900;
`;

const CatchphraseContent = styled.div`
    color: black;
    text-align: center;
    font-size: 25px;
    font-weight: 400;
    line-height: 40px;
`;

const CatchphraseContentBold = styled.span`
    font-weight: 700;
`;

const JoinContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    flex-shrink: 0;
    background: #e6f6f7;
`;

const JoinTextContainer = styled.div`
    display: flex;
    width: 1200px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    text-align: center;
    font-size: 45px;
    font-weight: 800;
`;

const JoinText = styled.span`
    color: black;
`;

const JoinTextColor = styled.span`
    color: ${({ theme }) => theme.colors.primary4};
`;

const FooterBox = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-shrink: 0;
    background: var(--secondary, #2a2b2d);
    box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.25);
`;

const LogoImage = styled.img`
    display: flex;
    width: 150px;
    height: 150px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const FooterText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    color: #fff;
`;

const ServiceTitle = styled.div`
    display: flex;
    height: 35px;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
`;

const CopyrightTextWrapper = styled.div`
    display: flex;
    height: 35px;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;
`;

const CopyrightText = styled.span`
    font-weight: 400;
`;

const CopyrightTextBold = styled.span`
    font-weight: 700;
`;

const AddressText = styled.div`
    display: flex;
    height: 35px;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;
    font-weight: 400;
`;

const LinkTextWrapper = styled.div`
    display: flex;
    height: 35px;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
`;

const LinkText = styled.span``;

const LinkTextUnderline = styled.span`
    text-decoration-line: underline;
`;

const ArrowIcon = styled.img`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    cursor: pointer;
`;

export default Home;
