import styled from "@emotion/styled";
import catchphraseBackground from "@/assets/imgs/catchphrase-background.png";
import subcatchphrase1Background from "@/assets/imgs/subcatchphrase1-background.png";

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

function Home() {
    return (
        <HomeContainer>
            <MainCatchphraseBox>
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
            </MainCatchphraseBox>
            <WhiteSubCatchphraseBox>
                <Rectangle1 />
                <CatchphraseTextWrapper>
                    <CatchphraseTitle>실시간으로 진행되는 원어민과의 대화!</CatchphraseTitle>
                    <CatchphraseContent>
                        언어 학습 방법 중 최선은 원어민과 대화하며 배우는 것입니다. 에어링고를
                        사용해 전 세계 각지의 원어민과 원격으로 만날 수 있습니다. 이제 서로에게
                        언어를 배우고 대화해 보세요!
                    </CatchphraseContent>
                </CatchphraseTextWrapper>
            </WhiteSubCatchphraseBox>
        </HomeContainer>
    );
}

const MainCatchphraseBox = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background: url(${catchphraseBackground}), #000000;
    background-repeat: no-repeat;
    background-size: cover;
`;

const CatchphraseWrapper = styled.div`
    position: absolute;
    bottom: 20%;
    right: 20%;
    text-shadow: 0px 0px 10px #000;
    font-family: Pretendard;
    font-size: 65px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
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
    text-shadow: 0px 0px 10px 0px #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const WhiteSubCatchphraseBox = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 70px;
    flex-shrink: 0;
    background: white;
`;

const Rectangle1 = styled.div`
    width: 300px;
    height: 300px;
    flex-shrink: 0;
    fill:
        url(${subcatchphrase1Background}),
        lightgray 50% / cover no-repeat,
        white;
`;

const CatchphraseTextWrapper = styled.div`
    display: flex;
    width: 700px;
    height: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    flex-shrink: 0;
    font-family: Pretendard;
`;

const CatchphraseTitle = styled.div`
    height: 50px;
    flex-shrink: 0;
    align-self: stretch;
    color: var(--primary, #00a8b3);
    text-align: center;
    font-size: 40px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
`;

const CatchphraseContent = styled.div`
    width: 700px;
    color: #000;
    text-align: center;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px; /* 160% */
`;

export default Home;
