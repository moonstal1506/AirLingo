import styled from "@emotion/styled";
import { useState } from "react";
import catchphraseBackground from "@/assets/imgs/catchphrase-background.png";
import { ReactComponent as SettingIcon } from "@/assets/imgs/icons/setting-icon.svg";
import { ReactComponent as GradeBackgroundIcon } from "@/assets/imgs/icons/grade-background-icon.svg";
import { ReactComponent as GradeFlagIcon } from "@/assets/imgs/icons/grade-flag-icon.svg";
import { ReactComponent as ModifyIcon } from "@/assets/imgs/icons/modify-icon.svg";
import { TextInput, TextArea } from "@/components/common/input";

function BasicInfoPage2() {
    const [nickname, setNickname] = useState("suhwan2004");
    const handleNicknameChange = (event) => {
        const newNickname = event.target.value.trim();
        setNickname(newNickname);
    };

    return (
        <ProfileContainer>
            <GradeBackgroundIcon />
            <GradeFlagIcon />
            <GradeTextWrapper>3</GradeTextWrapper>
            <ProfileImage src={catchphraseBackground} />
            <SettingIcon />
            <TitleBox>
                <TitleWrapper>닉네임</TitleWrapper>
                <SubTitleWrapper>NICKNAME</SubTitleWrapper>
            </TitleBox>
            <TextInput
                width="400px"
                height="50px"
                value={nickname}
                onChange={handleNicknameChange}
            />
            <ModifyIcon />
            <TitleRowContainer>
                <TitleRowBox>
                    <TitleBox>
                        <TitleWrapper>평점</TitleWrapper>
                        <SubTitleWrapper>RATING</SubTitleWrapper>
                    </TitleBox>
                    <TextInput
                        width="195px"
                        height="50px"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                </TitleRowBox>
                <TitleRowBox>
                    <TitleBox>
                        <TitleWrapper>등급</TitleWrapper>
                        <SubTitleWrapper>CLASS</SubTitleWrapper>
                    </TitleBox>
                    <TextInput
                        width="195px"
                        height="50px"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                </TitleRowBox>
            </TitleRowContainer>

            <TitleRowContainer>
                <TitleRowBox>
                    <TitleBox>
                        <TitleWrapper>대표 언어</TitleWrapper>
                        <SubTitleWrapper>NATIVE LANGUAGE</SubTitleWrapper>
                    </TitleBox>
                    <TextInput
                        width="195px"
                        height="50px"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                </TitleRowBox>
                <TitleRowBox>
                    <TitleBox>
                        <TitleWrapper>누적 마일리지</TitleWrapper>
                        <SubTitleWrapper>TOTAL MILEAGE</SubTitleWrapper>
                    </TitleBox>
                    <TextInput
                        width="195px"
                        height="50px"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                </TitleRowBox>
            </TitleRowContainer>
            <TitleBox>
                <TitleWrapper>자기소개</TitleWrapper>
                <SubTitleWrapper>SELF-INTRODUCTION</SubTitleWrapper>
            </TitleBox>
            <TextArea
                width="400px"
                height="90px"
                value={nickname}
                onChange={handleNicknameChange}
            />
            <ModifyIcon />
        </ProfileContainer>
    );
}

const ProfileContainer = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 20px 0px 0px 20px;
    border: 1px solid #000;
    background: #fff;
`;

const GradeTextWrapper = styled.div`
    display: flex;
    width: 41.762px;
    height: 31.322px;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    text-align: center;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);
    font-size: 45px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const TitleRowContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TitleRowBox = styled.div`
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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

const ProfileImage = styled.img`
    width: 250px;
    height: 250px;
    flex-shrink: 0;
    border-radius: 250px;
    border: 1px solid #000;
`;

export default BasicInfoPage2;
