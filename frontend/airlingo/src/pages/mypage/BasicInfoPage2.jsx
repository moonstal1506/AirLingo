import styled from "@emotion/styled";
import Tooltip from "@/components/common/tooltip/Tooltip";
import LanguageRankBox from "@/assets/imgs/language-rank-box.jpg";
import { IconButton, TextButton } from "@/components/common/button";
import { ReactComponent as ModifyIcon } from "@/assets/imgs/icons/modify-icon.svg";

function BasicInfoPage2() {
    return (
        <RightPassportPage>
            <LanguageContainer>
                <TitleContainer>
                    <TitleBox>
                        <TitleWrapper>평점</TitleWrapper>
                        <SubTitleWrapper>RATING</SubTitleWrapper>
                    </TitleBox>
                    <TooltipBox>
                        <Tooltip
                            position={{
                                horizontal: "right",
                                vertical: "bottom",
                                direction: "down",
                            }}
                        >
                            <TooltipContentContainer />
                        </Tooltip>
                    </TooltipBox>
                    <IconButton shape="blacklined" icon={ModifyIcon} />
                </TitleContainer>
                <LanguageContentBox />
                <ButtonBar>
                    <TextButton text="비밀번호 변경" shape="negative-normal" />
                    <TextButton text="회원탈퇴" shape="warning-quit" />
                </ButtonBar>
            </LanguageContainer>
        </RightPassportPage>
    );
}

const RightPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 0px 20px 20px 0px;
    border: 1px solid #000;
    background: #fff;
`;

const LanguageContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 25px;
`;

const TitleContainer = styled.div`
    display: flex;
    width: 450px;
    justify-content: space-between;
    align-items: center;
`;

const TitleBox = styled.div`
    display: flex;
`;

const TitleWrapper = styled.div`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const SubTitleWrapper = styled.div`
    color: #000;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: flex-end;
    padding-left: 5px;
`;

const TooltipContentContainer = styled.div`
    position: relative;
    z-index: 999;
    width: 398px;
    height: 396px;
    background-image: url(${LanguageRankBox});
    border-radius: 20px;
    background-color: transparent;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const TooltipBox = styled.div`
    position: relative;
    z-index: 0;
    width: 30px;
    height: 24px;
`;

const LanguageContentBox = styled.div`
    display: flex;
    width: 450px;
    height: 500px;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    border-radius: 10px;
    border: 1px solid #000;
`;

const ButtonBar = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
`;

export default BasicInfoPage2;
