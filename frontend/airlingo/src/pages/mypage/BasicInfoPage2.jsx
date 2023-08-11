/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "@/components/common/dropdown";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";
import { IconButton, TextButton } from "@/components/common/button";
import { TextInput } from "@/components/common/input";
import Grade from "@/components/grade/Grade";
import Tooltip from "@/components/common/tooltip/Tooltip";
import theme from "@/assets/styles/Theme";
import Modal from "@/components/modal";
import ValidationItem from "@/components/validationList";
import LanguageRankBox from "@/assets/imgs/language-rank-box.png";
import { ReactComponent as ModifyIcon } from "@/assets/icons/modify-icon.svg";
import { ReactComponent as KeyIcon } from "@/assets/icons/key-icon.svg";
import { ReactComponent as AlertIcon } from "@/assets/icons/alert-icon.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart-icon.svg";
import * as Icons from "@/assets/icons";
import { logoutUser, selectUser } from "@/features/User/UserSlice";
import { getUserProfile, deleteUser, updateUserPassword, updateLanguage } from "@/api/user.js";
import { getLanguage, getGrade } from "@/api/language";
import { formatLanguage, formatGrade } from "@/utils/format";
import { useRouter } from "@/hooks";

const { faintgray, primary4, primary1 } = theme.colors;

function checkPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
}

function checkConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

function BasicInfoPage2() {
    const dispatch = useDispatch();
    const { routeTo } = useRouter();
    const storeUser = useSelector(selectUser);
    const { userId } = storeUser;
    const [userProfile, setUserProfile] = useState([]);
    const [password, setPassword] = useState({ value: "", valid: false, dirty: false });
    const [confirmPassword, setConfirmPassword] = useState({
        value: "",
        valid: false,
        dirty: false,
    });
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [quitModalOpen, setQuitModalOpen] = useState(false);
    const [languageModalOpen, setLanguageModalOpen] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [grades, setGrades] = useState([]);
    const [learningLangs, setLearningLangs] = useState({
        value: [],
        valid: [].length > 0,
        dirty: [].length > 0,
    });
    const [selectedLang, setSelectedLang] = useState({ id: 0, label: "", img: "" });
    const [selectedGrade, setSelectedGrade] = useState({ id: 0, label: "", img: "" });

    // 프로필 조회
    useEffect(() => {
        async function fetchData() {
            await getUserProfile({
                responseFunc: {
                    200: (response) => {
                        setUserProfile({ ...response.data.data });
                        console.log(userProfile);
                    },
                },
                data: { userId },
            });
            await getLanguage({
                responseFunc: {
                    200: (response) =>
                        setLanguages(
                            response.data.data.map((language) => formatLanguage(language)),
                        ),
                    400: (response) => console.log(response),
                },
            });
            await getGrade({
                responseFunc: {
                    200: (response) =>
                        setGrades(response.data.data.map((grade) => formatGrade(grade))),
                    400: (response) => console.log(response),
                },
            });
        }
        fetchData();
    }, []);

    // 언어 모달
    const handleLanguageModalOpen = () => {
        setLanguageModalOpen(true);
    };
    const addSelectedLanguage = () => {
        if (selectedLang.label && selectedGrade.label) {
            const newLanguage = {
                langId: selectedLang.id,
                langLabel: selectedLang.label,
                langImg: selectedLang.img,
                gradeId: selectedGrade.id,
                gradeLabel: selectedGrade.label,
            };
            setLearningLangs((prev) => ({
                ...prev,
                value: [...prev.value, newLanguage],
                valid: true,
                dirty: true,
            }));

            // 선택된 값을 초기화
            setSelectedLang({ id: 0, label: "", img: "" });
            setSelectedGrade({ id: 0, label: "", img: "" });
        }
    };

    const deleteSelectedLanguage = (language) => {
        setLearningLangs((prev) => ({
            ...prev,
            value: prev.value.filter((lang) => lang.langId !== language.langId),
            valid: learningLangs.value.length > 1,
        }));
    };

    // 관심 언어 추가
    const handleLanguageSubmit = async () => {
        await updateLanguage({
            responseFunc: {
                200: () => {
                    console.log("관심 언어 수정 성공!");
                    setLanguageModalOpen(false);
                },
                400: () => {
                    console.log("관심 언어 수정 실패!");
                },
            },
            data: {
                userId,
                userInterestLanguageList: learningLangs.value.map((language) => ({
                    languageId: language.langId,
                    gradeId: language.gradeId,
                })),
            },
        });
        await getUserProfile({
            responseFunc: {
                200: (response) => {
                    setUserProfile({ ...response.data.data });
                    console.log(userProfile);
                },
            },
            data: { userId },
        });
    };

    // password modal
    const handlePasswordModalOpen = () => {
        setPasswordModalOpen(true);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value.trim();
        setPassword((prev) => ({
            ...prev,
            value: newPassword,
            valid: checkPassword(newPassword),
            dirty: true,
        }));
        setConfirmPassword((prev) => ({
            ...prev,
            valid: checkConfirmPassword(newPassword, confirmPassword.value),
        }));
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value.trim();
        setConfirmPassword((prev) => ({
            ...prev,
            value: newConfirmPassword,
            valid: checkConfirmPassword(password.value, newConfirmPassword),
            dirty: true,
        }));
    };

    const handlePasswordSubmit = async () => {
        await updateUserPassword({
            responseFunc: {
                200: () => {
                    console.log("수정 성공!");
                    setPasswordModalOpen(false);
                    setPassword({ value: "", valid: false, dirty: false });
                    setConfirmPassword({ value: "", valid: false, dirty: false });
                },
                400: () => {
                    console.log("수정 실패!");
                },
            },
            data: { userPassword: password.value, userId },
        });
    };

    // quit modal
    const handleQuitModalOpen = () => {
        setQuitModalOpen(true);
    };

    const handleDeleteUser = async () => {
        await deleteUser({
            responseFunc: {
                200: () => {
                    dispatch(logoutUser());
                    setQuitModalOpen(false);
                    console.log("회원 탈퇴 성공!");
                    routeTo("/");
                },
                400: () => {
                    console.log("회원 탈퇴 실패!");
                },
            },
            data: { userId },
        });
    };

    return (
        <RightPageBox>
            <LeftPassportPages src={rightPassportPages} />
            <RightPassportPage>
                {passwordModalOpen && (
                    <Modal title="비밀번호 변경" modalOpen={passwordModalOpen} Icon={KeyIcon}>
                        <TextInput
                            type="password"
                            placeholder="비밀번호"
                            width="500px"
                            value={password.value}
                            onChange={handlePasswordChange}
                            color={primary1}
                        />
                        <TextInput
                            type="password"
                            placeholder="비밀번호 확인"
                            width="500px"
                            value={confirmPassword.value}
                            onChange={handleConfirmPasswordChange}
                            color={primary1}
                        />
                        <ValidationList>
                            <ValidationItem
                                isValid={password.valid}
                                isDirty={password.dirty}
                                text="비밀번호는 8 ~ 20자의 영어 대 · 소문자, 숫자, 특수문자의 조합입니다."
                            />
                            <ValidationItem
                                isValid={confirmPassword.valid}
                                isDirty={confirmPassword.dirty}
                                text="비밀번호와 비밀번호 확인은 동일해야 합니다."
                            />
                        </ValidationList>
                        <ModalButtonBox>
                            <TextButton
                                shape="positive-curved"
                                text="확인"
                                onClick={() => handlePasswordSubmit()}
                            />
                            <TextButton
                                shape="positive-curved"
                                text="취소"
                                onClick={() => setPasswordModalOpen(false)}
                            />
                        </ModalButtonBox>
                    </Modal>
                )}
                {languageModalOpen && (
                    <Modal title="관심언어 추가" modalOpen={languageModalOpen} Icon={HeartIcon}>
                        <InputBox>
                            <LearningLangBox>
                                <Dropdown
                                    width="180px"
                                    data={languages.filter(
                                        (language) =>
                                            ![
                                                userProfile.userNativeLanguage.languageId,
                                                ...userProfile.userLanguages.map(
                                                    (lang) => lang.languageId,
                                                ),
                                                ...learningLangs.value.map((lang) => lang.langId),
                                            ].includes(language.id),
                                    )}
                                    iconColor="primary"
                                    shape="negative"
                                    selectedOption={selectedLang}
                                    placeholder="관심 언어 설정"
                                    onChange={setSelectedLang}
                                />
                                <Dropdown
                                    width="160px"
                                    data={grades}
                                    iconColor="primary"
                                    shape="negative"
                                    selectedOption={selectedGrade}
                                    placeholder="숙련도 설정"
                                    onChange={setSelectedGrade}
                                />
                                <Tooltip
                                    position={{
                                        horizontal: "right",
                                        vertical: "bottom",
                                        direction: "down",
                                    }}
                                >
                                    <TooltipContent />
                                </Tooltip>
                                <TextButton text="추가하기" onClick={addSelectedLanguage} />
                            </LearningLangBox>
                        </InputBox>
                        {learningLangs.value.length > 0 && (
                            <LearningLangList>
                                {learningLangs.value.map((language, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <LearningLanguageItem key={index}>
                                        <LanguageImg src={language.langImg} alt="languageIcon" />
                                        <LanguageNameWrapper>
                                            {language.langLabel}
                                        </LanguageNameWrapper>
                                        <LanguageGradeWrapper>
                                            {language.gradeLabel}
                                        </LanguageGradeWrapper>
                                        <DeleteButton
                                            onClick={() => deleteSelectedLanguage(language)}
                                        >
                                            <Icons.ValidationInvalidIcon />
                                        </DeleteButton>
                                    </LearningLanguageItem>
                                ))}
                            </LearningLangList>
                        )}
                        <ModalButtonBox>
                            <TextButton
                                shape="positive-curved"
                                text="확인"
                                onClick={() => handleLanguageSubmit()}
                            />
                            <TextButton
                                shape="positive-curved"
                                text="취소"
                                onClick={() => setLanguageModalOpen(false)}
                            />
                        </ModalButtonBox>
                    </Modal>
                )}
                {quitModalOpen && (
                    <Modal
                        title="회원 탈퇴"
                        modalOpen={quitModalOpen}
                        Icon={AlertIcon}
                        iconColor="red"
                        titleColor="red"
                    >
                        <ModalDescriptionTextBox>
                            <DescriptionTextWrapper>
                                정말 회원 탈퇴를 진행하시겠습니까?
                            </DescriptionTextWrapper>
                            <WaitingTimeTextWrapper>
                                계정이 삭제되며, 이 작업은 되돌릴 수 없습니다!
                            </WaitingTimeTextWrapper>
                        </ModalDescriptionTextBox>
                        <ModalButtonBox>
                            <TextButton
                                shape="warning-curved"
                                text="회원 탈퇴"
                                onClick={() => handleDeleteUser()}
                            />
                            <TextButton
                                shape="positive-curved"
                                text="취소"
                                onClick={() => setQuitModalOpen(false)}
                            />
                        </ModalButtonBox>
                    </Modal>
                )}
                <LanguageContainer>
                    <TitleContainer>
                        <TitleBox>
                            <TitleWrapper>관심 언어</TitleWrapper>
                            <SubTitleWrapper>LANGUAGE WANTING TO LEARN</SubTitleWrapper>
                        </TitleBox>
                        <TooltipBox>
                            <Tooltip
                                position={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                    direction: "down",
                                }}
                            >
                                <TooltipContent />
                            </Tooltip>
                        </TooltipBox>
                        <IconButton
                            shape="blacklined"
                            icon={ModifyIcon}
                            onClick={handleLanguageModalOpen}
                        />
                    </TitleContainer>
                    <LanguageContentBox>
                        {userProfile.userLanguages &&
                            userProfile.userLanguages.map((langueage) => (
                                <LanguageBox>
                                    <LanguageFlag
                                        src={languages[langueage.languageId - 1]?.img || ""}
                                        alt="Korean Flag"
                                    />
                                    <LanguageNameRankBox>
                                        <LanguageName>{langueage.languageKorName}</LanguageName>
                                        <Grade gradeName={langueage?.gradeName || ""} />
                                    </LanguageNameRankBox>
                                </LanguageBox>
                            ))}
                    </LanguageContentBox>
                    <ButtonBar>
                        <TextButton
                            text="비밀번호 변경"
                            width="160px"
                            shape="negative-normal"
                            onClick={handlePasswordModalOpen}
                        />
                        <TextButton
                            text="회원탈퇴"
                            width="120px"
                            shape="warning-quit"
                            onClick={handleQuitModalOpen}
                        />
                    </ButtonBar>
                </LanguageContainer>
            </RightPassportPage>
        </RightPageBox>
    );
}

const RightPageBox = styled.div`
    width: 507px;
    height: 705px;
`;

const LeftPassportPages = styled.img`
    margin-top: 55px;
    margin-left: 5px;
    position: absolute;
    z-index: -1;
`;

const RightPassportPage = styled.div`
    width: 500px;
    height: 700px;
    border-radius: 0px 20px 20px 0px;
    border: 1px solid #000;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;

const ValidationList = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    margin-top: 25px;
`;

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;

const ModalDescriptionTextBox = styled.div`
    display: flex;
    width: 600px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    color: #000;
    text-align: center;
    font-size: 25px;
    padding: 20px 0px;
`;

// 언어 모달
const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const LearningLangBox = styled.div`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TooltipContent = styled.div`
    position: relative;
    z-index: 999;
    width: 400px;
    height: 400px;
    background-image: url(${LanguageRankBox});
    background-size: cover;
    border-radius: 20px;
    background-color: transparent;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const LearningLangList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 25px;
`;

const LearningLanguageItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${faintgray};
    border-radius: 25px;
    width: 500px;
    height: 50px;
    color: black;
    font-size: 20px;
`;

const LanguageImg = styled.img`
    width: 25px;
    height: 25px;
`;

const LanguageNameWrapper = styled.div`
    width: 100px;
    text-align: center;
    font-weight: 700;
`;

const LanguageGradeWrapper = styled.div`
    width: 120px;
    text-align: center;
    color: ${primary4};
    font-weight: 500;
`;

const DeleteButton = styled.button`
    background: transparent;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 24px;
`;

// 회원 탈퇴 모달
const DescriptionTextWrapper = styled.div`
    font-weight: 400;
    line-height: 44px;
`;

const WaitingTimeTextWrapper = styled.div`
    font-size: 25px;
    font-weight: 700;
`;

// 여권 오른쪽
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

const TooltipBox = styled.div`
    position: relative;
    z-index: 0;
    width: 30px;
    height: 24px;
`;

const LanguageContentBox = styled.div`
    display: grid;
    width: 450px;
    height: 500px;
    border-radius: 10px;
    border: 1px solid #000;
    padding: 10px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
`;

const LanguageBox = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

const LanguageFlag = styled.img`
    width: 100px;
    height: 100px;
    margin-right: 10px;
`;

const LanguageNameRankBox = styled.div`
    flex-direction: column;
`;

const LanguageName = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 10px;
`;

const ButtonBar = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
`;

export default BasicInfoPage2;
