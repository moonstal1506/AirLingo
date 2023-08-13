import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as TitleLogoIcon } from "@/assets/icons/title-logo-icon.svg";
import { logoutUser, selectUser } from "@/features/User/UserSlice";
import ProfileBar from "../profileBar";
import { TextButton } from "../common/button";
import { getLogout } from "@/api";
import { useRouter } from "@/hooks";

// ----------------------------------------------------------------------------------------------------

const Header = React.memo(() => {
    const dispatch = useDispatch();
    const { isLogIn, userNickname, userLoginId, userImgUrl } = useSelector(selectUser);
    const { routeTo } = useRouter();

    const handleClickLogout = async () => {
        await getLogout({
            responseFunc: {
                200: () => {
                    dispatch(logoutUser());
                    routeTo("/");
                },
            },
            data: { userLoginId },
            routeTo,
        });
    };

    return (
        <HeaderContainer>
            <HeaderInnerContainer>
                <TitleLogoIcon onClick={() => routeTo("/")} />
                <HeaderRightBox>
                    {isLogIn ? (
                        <>
                            <ProfileBar
                                imgSize="small"
                                imgSrc={userImgUrl}
                                nickname={userNickname}
                            />
                            <TextButton
                                shape="positive-normal"
                                text="로그아웃"
                                onClick={handleClickLogout}
                            />
                        </>
                    ) : (
                        <>
                            <TextButton
                                shape="positive-normal"
                                text="로그인"
                                onClick={() => routeTo("/login")}
                            />
                            <TextButton
                                shape="positive-normal"
                                text="회원가입"
                                onClick={() => routeTo("/signup")}
                            />
                        </>
                    )}
                </HeaderRightBox>
            </HeaderInnerContainer>
        </HeaderContainer>
    );
});

// ----------------------------------------------------------------------------------------------------

const HeaderContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: rgba(42, 43, 45, 0.95);
    position: fixed;
    z-index: 999;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderInnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 160px;
    & > svg {
        cursor: pointer;
    }
`;

const HeaderRightBox = styled.div`
    display: flex;
    gap: 16px;
    justify-content: space-between;
`;

// ----------------------------------------------------------------------------------------------------

export default Header;
