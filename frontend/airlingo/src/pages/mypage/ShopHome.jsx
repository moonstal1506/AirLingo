import styled from "@emotion/styled";
import TabBar from "@/components/common/tab/TabBar.jsx";
import { ReactComponent as NoscriptBackground } from "@/assets/icons/no-shop-icon.svg";
import { ReactComponent as ShopLogoIcon } from "@/assets/icons/shop-logo-icon.svg";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";

function BasicInfoHome() {
    return (
        <ShopHomeContainer id="SC">
            <PassportContainer id="PC">
                <LeftPageBox>
                    <LeftPassportPages src={leftPassportPages} />
                    <TabBarContainer>
                        <TabBar activeTab="shop" id="TabBar" />
                    </TabBarContainer>
                    <LeftPassportPage>
                        <ShopLogoIcon />
                    </LeftPassportPage>
                </LeftPageBox>
                <RightPageBox>
                    <LeftPassportPages src={rightPassportPages} />
                    <RightPassportPage>
                        <NoscriptBackground />
                    </RightPassportPage>
                </RightPageBox>
            </PassportContainer>
        </ShopHomeContainer>
    );
}

const ShopHomeContainer = styled.div`
    position: relative;
    font-family: Pretendard;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PassportContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 151px;
`;

const LeftPageBox = styled.div`
    width: 510px;
    height: 755px;
    flex-shrink: 0;
`;

const RightPageBox = styled.div`
    width: 507px;
    height: 705px;
    flex-shrink: 0;
`;

const LeftPassportPages = styled.img`
    margin-top: 55px;
    margin-left: 5px;
    position: absolute;
    z-index: -1;
`;

const LeftPassportPage = styled.div`
    width: 500px;
    height: 700px;
    flex-shrink: 0;
    border-radius: 20px 0px 0px 20px;
    border: 1px solid #000;
    background: #fff;
    margin-right: 10px;
    margin-top: 50px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RightPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 0px 20px 20px 0px;
    border: 1px solid #000;
    background: #fff;
    margin-right: 7px;
    margin-top: 50px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TabBarContainer = styled.div`
    position: relative;
    top: 50px;
`;

export default BasicInfoHome;
