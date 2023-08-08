/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import defaultProfileImage from "@/assets/imgs/profiles/default-profile.png";
import { ReactComponent as SettingIcon } from "@/assets/icons/setting-icon.svg";
import { ReactComponent as GradeBackgroundIcon } from "@/assets/icons/grade-background-icon.svg";
import { ReactComponent as GradeFlagIcon } from "@/assets/icons/grade-flag-icon.svg";
import { ReactComponent as ModifyIcon } from "@/assets/icons/modify-icon.svg";
import { ReactComponent as KoreaFlagIcon } from "@/assets/icons/flag-korea-icon.svg";
import { ReactComponent as BritainFlagIcon } from "@/assets/icons/flag-britain-icon.svg";
import { ReactComponent as JapanFlagIcon } from "@/assets/icons/flag-japan-icon.svg";
import { ReactComponent as ChinaFlagIcon } from "@/assets/icons/flag-china-icon.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/close-icon.svg";
import { ReactComponent as CameraIcon } from "@/assets/icons/camera-icon.svg";
import { TextButton } from "@/components/common/button";
import theme from "@/assets/styles/Theme";
import Modal from "@/components/modal";
import { selectUser } from "@/features/User/UserSlice.js";
import {
    getUserProfile,
    updateUserNickname,
    updateUserBio,
    updateUserImage,
    deleteUserImage,
} from "@/api/user.js";

const { primary4 } = theme.colors;

function BasicInfoPage2() {
    const storeUser = useSelector(selectUser);
    const { userId } = storeUser;
    const [userProfile, setUserProfile] = useState({});
    const [nickname, setNickname] = useState("에어링고");
    const [bio, setBio] = useState("안녕하세요. 만나서 반갑습니다.");
    const bioInputRef = useRef(null);
    const nicknameInputRef = useRef(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [uplodeImage, setUplodeImage] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const totalLanguage = [
        { id: 1, label: "한국어", img: KoreaFlagIcon },
        { id: 2, label: "영어", img: BritainFlagIcon },
        { id: 3, label: "일본어", img: JapanFlagIcon },
        { id: 4, label: "중국어", img: ChinaFlagIcon },
    ];

    useEffect(() => {
        async function fetchData() {
            await getUserProfile({
                responseFunc: {
                    200: (response) => {
                        setUserProfile({ ...response.data.data });
                    },
                },
                data: { userId },
            });
        }
        fetchData();
    }, []);

    useEffect(() => {
        setNickname(userProfile.userNickname);
        setBio(userProfile.userBio);
        setImage(userProfile.userImgUrl);
        setSelectedImage(userProfile.userImgUrl);
    }, [userProfile]);

    const handleUserNicknameSubmit = async () => {
        await updateUserNickname({
            responseFunc: {
                200: () => {
                    console.log("수정 성공!");
                },
                400: () => {
                    console.log("수정 실패!");
                },
            },
            data: { userNickname: nickname, userId },
        });
    };

    const handleUserBioSubmit = async () => {
        await updateUserBio({
            responseFunc: {
                200: () => {
                    console.log("수정 성공!");
                },
                400: () => {
                    console.log("수정 실패!");
                },
            },
            data: { userBio: bio, userId },
        });
    };

    const handleImageUpload = (files) => {
        if (files && files.length > 0) {
            const selectedFile = files[0];
            const formData = new FormData();
            formData.append("files", selectedFile);
            setFile(formData);
            setSelectedImage(URL.createObjectURL(selectedFile));
            setUplodeImage(true);
        }
    };

    const handleImageDelete = () => {
        setUplodeImage(false);
        setSelectedImage(defaultProfileImage);
    };

    const updateImage = async () => {
        try {
            // 이미지 수정
            if (uplodeImage) {
                await updateUserImage({
                    responseFunc: {
                        200: (response) => {
                            console.log(response.data.data.uploadFileUrl);
                            setSelectedImage(response.data.data.uploadFileUrl);
                            setImage(response.data.data.uploadFileUrl);
                            setImageModalOpen(false);
                            console.log("수정 성공!");
                        },
                        400: () => {
                            console.log("수정 실패!");
                        },
                    },
                    data: { files: file, userId },
                });
                return;
            }

            // 이미지 삭제
            await deleteUserImage({
                responseFunc: {
                    200: () => {
                        setSelectedImage(defaultProfileImage);
                        setImage(defaultProfileImage);
                        setImageModalOpen(false);
                        console.log("삭제 성공!");
                    },
                    400: () => {
                        console.log("삭제 실패!");
                    },
                },
                data: { userId },
            });
        } catch (error) {
            console.error("Error updating user image:", error);
        }
    };

    useEffect(() => {
        setNickname(userProfile.userNickname);
        setBio(userProfile.userBio);
        setImage(userProfile.userImgUrl);
        setSelectedImage(userProfile.userImgUrl);
    }, [userProfile]);

    const handleImageModalOpen = () => {
        setImageModalOpen(true);
    };

    const handleNicknameChange = (event) => {
        const newNickname = event.target.value.trim();
        setNickname(newNickname);
    };

    const handleBioChange = (event) => {
        const newBio = event.target.value;
        setBio(newBio);
    };

    const LanguageImg = totalLanguage.find(
        (language) =>
            language.id ===
            (userProfile.userNativeLanguage ? userProfile.userNativeLanguage.languageId : 1),
    ).img;

    return (
        <LeftPassportPage>
            {imageModalOpen && (
                <Modal title="프로필 이미지 편집" modalOpen={imageModalOpen} Icon={CameraIcon}>
                    <ProfileImageBox>
                        <ProfileImage src={selectedImage || defaultProfileImage} />
                        <CloseIconWrapper onClick={() => setImageModalOpen(false)}>
                            <CloseIcon />
                        </CloseIconWrapper>
                    </ProfileImageBox>

                    <ModalButtonBox>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files)}
                            style={{ display: "none" }}
                            ref={fileInputRef}
                        />
                        <TextButton
                            shape="positive-curved"
                            text="변경"
                            onClick={() => fileInputRef.current.click()}
                        />
                        <TextButton
                            shape="positive-curved"
                            text="삭제"
                            onClick={() => handleImageDelete()}
                        />
                        <TextButton
                            shape="positive-curved"
                            text="확인"
                            onClick={() => updateImage()}
                        />
                    </ModalButtonBox>
                </Modal>
            )}
            <ProfileContainer>
                <ProfileImageBox>
                    <GradeBackgroundIconWrapper>
                        <GradeBackgroundIcon />
                    </GradeBackgroundIconWrapper>
                    <GradeFlagIconWrapper>
                        <GradeFlagIcon />
                    </GradeFlagIconWrapper>
                    <GradeTextWrapper>1</GradeTextWrapper>
                    <ProfileImage src={image} />
                    <SettingIconWrapper>
                        <SettingIcon onClick={handleImageModalOpen} />
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
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleUserNicknameSubmit(event);
                                        nicknameInputRef.current.blur();
                                    }
                                }}
                            />
                            <ModifyIcon onClick={handleUserNicknameSubmit} />
                        </NicknameInputBox>
                    </TitleRowBox>
                    <TitleRowContainer>
                        <TitleRowBox>
                            <TitleBox>
                                <TitleWrapper>평점</TitleWrapper>
                                <SubTitleWrapper>RATING</SubTitleWrapper>
                            </TitleBox>
                            <ContentBox>
                                <ContentWrapper>{userProfile.userRating}</ContentWrapper>
                            </ContentBox>
                        </TitleRowBox>
                        <TitleRowBox>
                            <TitleBox>
                                <TitleWrapper>등급</TitleWrapper>
                                <SubTitleWrapper>CLASS</SubTitleWrapper>
                            </TitleBox>
                            <ContentBox>
                                <ContentWrapper>{userProfile.userMileageGrade}</ContentWrapper>
                            </ContentBox>
                        </TitleRowBox>
                    </TitleRowContainer>

                    <TitleRowContainer>
                        <TitleRowBox>
                            <TitleBox>
                                <TitleWrapper>대표 언어</TitleWrapper>
                                <SubTitleWrapper>NATIVE LANGUAGE</SubTitleWrapper>
                            </TitleBox>
                            <ContentBox>
                                <LanguageImg />

                                <ContentWrapper>
                                    {userProfile.userNativeLanguage
                                        ? userProfile.userNativeLanguage.languageKorName
                                        : "에어"}
                                </ContentWrapper>
                            </ContentBox>
                        </TitleRowBox>
                        <TitleRowBox>
                            <TitleBox>
                                <TitleWrapper>누적 마일리지</TitleWrapper>
                                <SubTitleWrapper>TOTAL MILEAGE</SubTitleWrapper>
                            </TitleBox>
                            <ContentBox>
                                <ContentWrapper>{userProfile.userTotalMileage}</ContentWrapper>
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
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleUserBioSubmit(event);
                                        bioInputRef.current.blur();
                                    }
                                }}
                            />
                            <ModifyIcon onClick={handleUserBioSubmit} />
                        </BioAreaBox>
                    </TitleRowBox>
                </ProfileContentContainer>
            </ProfileContainer>
        </LeftPassportPage>
    );
}

const CloseIconWrapper = styled.div`
    position: absolute;
    top: -120px;
    right: -180px;
    cursor: pointer;
`;

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding-top: 10px;
`;

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
    &:hover {
        cursor: pointer;
    }
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
    padding: 0px 20px;
    justify-content: center;
    align-items: center;
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
