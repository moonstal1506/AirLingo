import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TitleLogoIcon } from "@/assets/imgs/icons/title-logo-icon.svg";
import { selectUser } from "@/features/User/UserSlice";
import ProfileBar from "../profileBar";
import { TextButton } from "../common/button";
import Dropdown from "../common/dropdown";
import logout from "@/api/auth";

function Header() {
    const { isLogIn, userNickname, userLoginId, userImg } = useSelector(selectUser);
    const navigate = useNavigate();

    const handleClickLogout = async () => {
        await logout({
            responseFunc: { 200: () => {}, 400: () => {} },
            data: { userLoginId },
        });
    };

    return (
        <HeaderContainer>
            <HeaderInnerContainer>
                <TitleLogoIcon />
                <HeaderRightBox>
                    {isLogIn ? (
                        <>
                            <ProfileBar imgSize="small" imgSrc={userImg} nickname={userNickname} />
                            <TextButton
                                shape="positive-normal"
                                text="로그아웃"
                                onClick={handleClickLogout}
                            />
                            <Dropdown />
                        </>
                    ) : (
                        <>
                            <TextButton
                                shape="positive-normal"
                                text="로그인"
                                onClick={() => navigate("login")}
                            />
                            <TextButton
                                shape="positive-normal"
                                text="회원가입"
                                onClick={() => navigate("signup")}
                            />
                            <Dropdown />
                        </>
                    )}
                </HeaderRightBox>
            </HeaderInnerContainer>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: rgba(42, 43, 45, 0.95);
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderInnerContainer = styled.div`
    width: 100%;
    padding: 0 160px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderRightBox = styled.div`
    display: flex;
    gap: 16px;
    justify-content: space-between;
`;

export default Header;
