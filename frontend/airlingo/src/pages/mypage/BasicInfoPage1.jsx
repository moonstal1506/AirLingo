import styled from "@emotion/styled";
import { useState, useRef } from "react";
import catchphraseBackground from "@/assets/imgs/catchphrase-background.png";
import { ReactComponent as SettingIcon } from "@/assets/imgs/icons/setting-icon.svg";
import { ReactComponent as GradeBackgroundIcon } from "@/assets/imgs/icons/grade-background-icon.svg";
import { ReactComponent as GradeFlagIcon } from "@/assets/imgs/icons/grade-flag-icon.svg";
import { ReactComponent as ModifyIcon } from "@/assets/imgs/icons/modify-icon.svg";
import { ReactComponent as KoreaFlagIcon } from "@/assets/imgs/icons/flag-korea-icon.svg";
import { ReactComponent as BritainFlagIcon } from "@/assets/imgs/icons/flag-britain-icon.svg";
import { ReactComponent as JapanFlagIcon } from "@/assets/imgs/icons/flag-japan-icon.svg";
import { ReactComponent as ChinaFlagIcon } from "@/assets/imgs/icons/flag-china-icon.svg";
import theme from "@/assets/styles/Theme";
import Dropdown from "@/components/common/dropdown";

const { primary4 } = theme.colors;

function BasicInfoPage2() {
    const totalLanguage = [
        { id: "135", label: "한국어", img: KoreaFlagIcon },
        { id: "136", label: "영어", img: BritainFlagIcon },
        { id: "137", label: "일본어", img: JapanFlagIcon },
        { id: "138", label: "중국어", img: ChinaFlagIcon },
    ];
    const [nativeLanguage, setNativeStudyLanguage] = useState({
        id: "136",
        label: "영어",
        img: BritainFlagIcon,
    });

    const [nickname, setNickname] = useState("suhwan2004");
    const handleNicknameChange = (event) => {
        const newNickname = event.target.value.trim();
        setNickname(newNickname);
    };

    const [bio, setBio] = useState("안녕하세요. 만나서 반갑습니다.");
    const handleBioChange = (event) => {
        const newBio = event.target.value;
        setBio(newBio);
    };

    const bioInputRef = useRef(null);
    const handleBioIModifyIconClick = () => {
        if (bioInputRef.current) {
            bioInputRef.current.focus();
        }
    };

    const nicknameInputRef = useRef(null);
    const handleNicknameIModifyIconClick = () => {
        if (nicknameInputRef.current) {
            nicknameInputRef.current.focus();
        }
    };

    return (
        <LeftPassportPage>
            <ProfileContainer>
                <ProfileImageBox>
                    <GradeBackgroundIconWrapper>
                        <GradeBackgroundIcon />
                    </GradeBackgroundIconWrapper>
                    <GradeFlagIconWrapper>
                        <GradeFlagIcon />
                    </GradeFlagIconWrapper>
                    <GradeTextWrapper>3</GradeTextWrapper>
                    <ProfileImage src={catchphraseBackground} />
                    <SettingIconWrapper>
                        <SettingIcon />
                    </SettingIconWrapper>
                </ProfileImageBox>

                <ProfileContentContainer>
                    <TitleRowBox>
                        <TitleBox>
                            <TitleWrapper>닉네임</TitleWrapper>
                            <SubTitleWrapper>NICKNAME</SubTitleWrapper>
                        </TitleBox>
                        <NicknameInputBox>
                            <NicknameInputWrapper
                                ref={nicknameInputRef}
                                value={nickname}
                                onChange={handleNicknameChange}
                            />
                            <ModifyIcon onClick={handleNicknameIModifyIconClick} />
                        </NicknameInputBox>
                    </TitleRowBox>
                    <TitleRowContainer>
                        <TitleRowBox>
                            <TitleBox>
                                <TitleWrapper>평점</TitleWrapper>
                                <SubTitleWrapper>RATING</SubTitleWrapper>
                            </TitleBox>
                            <ContentBox>
                                <ContentWrapper>4.36</ContentWrapper>
                            </ContentBox>
                        </TitleRowBox>
                        <TitleRowBox>
                            <TitleBox>
                                <TitleWrapper>등급</TitleWrapper>
                                <SubTitleWrapper>CLASS</SubTitleWrapper>
                            </TitleBox>
                            <ContentBox>
                                <ContentWrapper>이코노미</ContentWrapper>
                            </ContentBox>
                        </TitleRowBox>
                    </TitleRowContainer>

                    <TitleRowContainer>
                        <TitleRowBox>
                            <TitleBox>
                                <TitleWrapper>대표 언어</TitleWrapper>
                                <SubTitleWrapper>NATIVE LANGUAGE</SubTitleWrapper>
                            </TitleBox>
                            <Dropdown
                                width="195px"
                                shape="negative"
                                height="50px"
                                data={totalLanguage}
                                selectedOption={nativeLanguage}
                                onChange={setNativeStudyLanguage}
                            />
                        </TitleRowBox>
                        <TitleRowBox>
                            <TitleBox>
                                <TitleWrapper>누적 마일리지</TitleWrapper>
                                <SubTitleWrapper>TOTAL MILEAGE</SubTitleWrapper>
                            </TitleBox>
                            <ContentBox>
                                <ContentWrapper>13,156</ContentWrapper>
                            </ContentBox>
                        </TitleRowBox>
                    </TitleRowContainer>
                    <TitleRowBox>
                        <TitleBox>
                            <TitleWrapper>자기소개</TitleWrapper>
                            <SubTitleWrapper>SELF-INTRODUCTION</SubTitleWrapper>
                        </TitleBox>
                        <BioAreaBox>
                            <BioAreaWrapper
                                ref={bioInputRef}
                                value={bio}
                                onChange={handleBioChange}
                            />
                            <ModifyIcon onClick={handleBioIModifyIconClick} />
                        </BioAreaBox>
                    </TitleRowBox>
                </ProfileContentContainer>
            </ProfileContainer>
        </LeftPassportPage>
    );
}

const LeftPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 20px 0px 0px 20px;
    border: 1px solid #000;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProfileContainer = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileImageBox = styled.div`
    display: inline-block;
    position: relative;
    width: 250px;
    height: 250px;
`;

const GradeBackgroundIconWrapper = styled.div`
    position: absolute;
    z-index: 3;
`;

const GradeFlagIconWrapper = styled.div`
    position: absolute;
    z-index: 2;
    left: 3%;
    top: 20%;
`;

const GradeTextWrapper = styled.div`
    position: absolute;
    z-index: 4;
    display: flex;
    width: 41.762px;
    height: 31.322px;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    text-align: center;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.75);
    font-size: 45px;
    font-weight: 700;
    left: 6%;
    top: 10%;
`;

const ProfileImage = styled.img`
    position: absolute;
    z-index: 1;
    width: 250px;
    height: 250px;
    flex-shrink: 0;
    border-radius: 250px;
    border: 1px solid #000;
`;

const SettingIconWrapper = styled.div`
    position: absolute;
    z-index: 5;
    bottom: 0;
    right: 0;
`;

const ProfileContentContainer = styled.div`
    gap: 10px;
    display: inline-flex;
    flex-direction: column;
`;

const TitleRowContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TitleRowBox = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 700;
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

const ContentBox = styled.div`
    display: flex;
    width: 190px;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #ffffff;
    border: 3px solid ${primary4};
    color: ${primary4};
`;

const ContentWrapper = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: 700;
`;

const NicknameInputBox = styled.div`
    display: flex;
    width: 400px;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #ffffff;
    border: 3px solid ${primary4};
    color: ${primary4};
    &:hover {
        cursor: pointer;
    }
`;

const NicknameInputWrapper = styled.input`
    border: none;
    outline: none;
    width: 330px;
    color: #000;
    font-size: 20px;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
`;

const BioAreaBox = styled.div`
    display: flex;
    width: 400px;
    height: 90px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #ffffff;
    border: 3px solid ${primary4};
    color: ${primary4};
    &:hover {
        cursor: pointer;
    }
`;

const BioAreaWrapper = styled.textarea`
    border: none;
    outline: none;
    width: 330px;
    height: 70px;
    color: #000;
    font-size: 15px;
    font-weight: 400;
    &:hover {
        cursor: pointer;
    }
`;

export default BasicInfoPage2;
