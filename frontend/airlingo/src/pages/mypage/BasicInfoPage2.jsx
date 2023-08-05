import styled from "@emotion/styled";
import { useState } from "react";
import { IconButton, TextButton } from "@/components/common/button";
import { TextInput } from "@/components/common/input";
import Tooltip from "@/components/common/tooltip/Tooltip";
import theme from "@/assets/styles/Theme";
import Modal from "@/components/modal";
import Validation from "@/components/validationList";
import LanguageRankBox from "@/assets/imgs/language-rank-box.jpg";
import { ReactComponent as ModifyIcon } from "@/assets/imgs/icons/modify-icon.svg";
import { ReactComponent as KeyIcon } from "@/assets/imgs/icons/key-icon.svg";
import { ReactComponent as AlertIcon } from "@/assets/imgs/icons/alert-icon.svg";

const { primary1 } = theme.colors;

function checkPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
}

function checkConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

function BasicInfoPage2() {
    // password modal
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const handlePasswordModalOpen = () => {
        setPasswordModalOpen(true);
    };

    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEqualPassword, setIsEqualPassword] = useState(false);

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value.trim();
        setPassword(newPassword);
        setIsValidPassword(checkPassword(newPassword));
        setIsEqualPassword(checkConfirmPassword(newPassword, confirmPassword));
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value.trim();
        setConfirmPassword(newConfirmPassword);
        setIsEqualPassword(checkConfirmPassword(password, newConfirmPassword));
    };

    // quit modal
    const [quitModalOpen, setQuitModalOpen] = useState(false);
    const handleQuitModalOpen = () => {
        setQuitModalOpen(true);
    };

    return (
        <RightPassportPage>
            {passwordModalOpen && (
                <Modal title="비밀번호 변경" modalOpen={passwordModalOpen} Icon={KeyIcon}>
                    <TextInput
                        type="password"
                        placeholder="비밀번호"
                        color={primary1}
                        width="500px"
                        height="50px"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <TextInput
                        type="password"
                        placeholder="비밀번호 확인"
                        color={primary1}
                        width="500px"
                        height="50px"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    <ModalValidationContainer>
                        <ModalValidationBox>
                            <Validation
                                isValid={isValidPassword}
                                text="비밀번호는 8자 이상, 20자 이하의 영어 대·소문자, 숫자, 특수문자의 조합입니다."
                            />
                            <Validation
                                isValid={isEqualPassword}
                                text="비밀번호와 비밀번호 확인은 동일해야 합니다."
                            />
                        </ModalValidationBox>
                    </ModalValidationContainer>
                    <ModalButtonBox>
                        <TextButton
                            shape="positive-curved"
                            text="확인"
                            onClick={() => setPasswordModalOpen(false)}
                        />
                        <TextButton
                            shape="positive-curved"
                            text="취소"
                            onClick={() => setPasswordModalOpen(false)}
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
                            onClick={() => setQuitModalOpen(false)}
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
                            <TooltipContentContainer />
                        </Tooltip>
                    </TooltipBox>
                    <IconButton shape="blacklined" icon={ModifyIcon} />
                </TitleContainer>
                <LanguageContentBox>
                    <LanguageBox>
                        <LanguageFlag
                            src="https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-korea-icon.svg"
                            alt="Korean Flag"
                        />
                        <LanguageNameRankBox>
                            <LanguageName>한국어</LanguageName>
                            <LanguageRankContainer>
                                <LanguageRank>상급</LanguageRank>
                                <LanguageGrade>(C1)</LanguageGrade>
                            </LanguageRankContainer>
                        </LanguageNameRankBox>
                    </LanguageBox>
                    <LanguageBox>
                        <LanguageFlag
                            src="https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-japan-icon.svg"
                            alt="Japanese Flag"
                        />
                        <LanguageNameRankBox>
                            <LanguageName>일본어</LanguageName>
                            <LanguageRankContainer>
                                <LanguageRank>상급</LanguageRank>
                                <LanguageGrade>(C1)</LanguageGrade>
                            </LanguageRankContainer>
                        </LanguageNameRankBox>
                    </LanguageBox>
                </LanguageContentBox>
                <ButtonBar>
                    <TextButton
                        text="비밀번호 변경"
                        shape="negative-normal"
                        onClick={handlePasswordModalOpen}
                    />
                    <TextButton
                        text="회원탈퇴"
                        shape="warning-quit"
                        onClick={handleQuitModalOpen}
                    />
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ModalValidationContainer = styled.div`
    display: flex;
    width: 650px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
`;

const ModalValidationBox = styled.div`
    display: flex;
    height: 60px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
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

const DescriptionTextWrapper = styled.div`
    font-weight: 400;
    line-height: 44px;
`;

const WaitingTimeTextWrapper = styled.div`
    font-size: 25px;
    font-weight: 700;
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
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 5px;
    border-radius: 10px;
    border: 1px solid #000;
    justify-content: space-between;
    padding: 10px;
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

const LanguageRankContainer = styled.div`
    display: flex;
    color: var(--rainbow-blue, #35b1c9);
    width: 90px;
`;

const LanguageRank = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

const LanguageGrade = styled.div`
    font-size: 15px;
    font-weight: 400;
    display: flex;
    align-items: flex-end;
`;

const ButtonBar = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
`;

export default BasicInfoPage2;
