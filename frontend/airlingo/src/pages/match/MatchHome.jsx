/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/User/UserSlice";
import { formatLanguage } from "@/utils/format";
import ticketBackground from "@/assets/imgs/ticket-background.svg";
import { ReactComponent as RightArrowIcon } from "@/assets/icons/arrow-right-icon.svg";
import { ReactComponent as koreaFlagIcon } from "@/assets/icons/korea-flag-icon.svg";
import { ReactComponent as japanFlagIcon } from "@/assets/icons/japan-flag-icon.svg";
import { ReactComponent as PremiumIcon } from "@/assets/icons/premium-icon.svg";
import { ReactComponent as AlertIcon } from "@/assets/icons/alert-icon.svg";
import { TextButton } from "@/components/common/button";
import Tooltip from "@/components/common/tooltip/Tooltip";
import Dropdown from "@/components/common/dropdown";
import LanguageRankBox from "@/assets/imgs/language-rank-box.png";
import { useRouter } from "@/hooks";
import { getConcurrentUser, getPremiumMatching } from "@/api";
import Modal from "../../components/modal";

function MatchHome() {
    const { routeTo } = useRouter();
    const { userNickname, userNativeLanguage, userLanguages, userId } = useSelector(selectUser);
    const [modalOpen, setModalOpen] = useState(false);
    const [concurrentUser, setConcurrentUser] = useState({
        waitingUsersSize: 0,
        concurrentUsersSize: 0,
    });

    const skillLanguageList = useMemo(
        () => [formatLanguage(userNativeLanguage)],
        [userNativeLanguage],
    );
    const studyLanguageList = useMemo(
        () => (userLanguages.length === 0 ? [{}] : userLanguages).map((cur) => formatLanguage(cur)),
        [userLanguages],
    );

    const [skillLanguage, setSkillLanguage] = useState({ ...skillLanguageList[0] });
    const [studyLanguage, setStudyLanguage] = useState({ ...studyLanguageList[0] });

    const [mileage, setMileage] = useState([]);
    const [alertModalOpen, setAlertModalOpen] = useState(false);

    const handleAlertModalOpen = (mileage) => {
        setMileage(mileage);
        setAlertModalOpen(true);
    };

    const isUserInfoValid = () =>
        userNickname &&
        Object.keys(userNativeLanguage).length > 0 &&
        userLanguages.length > 0 &&
        skillLanguageList.length > 0 &&
        studyLanguageList.length > 0;

    const fetchConcurrentUser = async () => {
        await getConcurrentUser({
            responseFunc: {
                200: (response) => setConcurrentUser({ ...response.data }),
            },
        });
    };

    useEffect(() => {
        if (isUserInfoValid()) {
            fetchConcurrentUser();
        }
        // else {
        //     routeTo("/");
        // }
    }, [skillLanguageList, studyLanguage]);

    const handleMatching = (premium) => {
        if (studyLanguage) {
            routeTo("/matchqueue", {
                state: { premium, studyLanguageId: studyLanguage.id },
            });
        } else {
            alert("관심언어를 설정해주세요!");
        }
    };

    const handleClickNormalMatching = () => handleMatching(false);
    const handleClickPremiumMatching = () => setModalOpen(true);
    const handleClickPremiumSelect = async () => {
        await getPremiumMatching({
            responseFunc: {
                200: (response) => {
                    console.log(response.data.data);
                    if (!response.data.data.possiblePremium) {
                        setModalOpen(false);
                        handleAlertModalOpen(response.data.data.mileage);
                        return;
                    }
                    handleMatching(true);
                },
            },
            data: {
                userId,
            },
        });
    };

    return (
        <MatchHomeContainer>
            {modalOpen && (
                <Modal title="프리미엄 매칭" modalOpen={modalOpen} Icon={PremiumIcon}>
                    <ModalTextBox>
                        <div>
                            <ModalTextWrapper color="black">
                                프리미엄 매칭 시,
                                <ModalTextWrapper color="red"> 마일리지 3,000점</ModalTextWrapper>이
                                소모됩니다.
                            </ModalTextWrapper>
                        </div>
                        <ModalTextWrapper>프리미엄 매칭을 진행하시겠습니까?</ModalTextWrapper>
                    </ModalTextBox>
                    <ModalButtonBox>
                        <TextButton
                            shape="positive-curved"
                            text="확인"
                            onClick={handleClickPremiumSelect}
                        />
                        <TextButton
                            shape="positive-curved"
                            text="취소"
                            onClick={() => setModalOpen(false)}
                        />
                    </ModalButtonBox>
                </Modal>
            )}
            {alertModalOpen && (
                <Modal
                    title="마일리지 부족"
                    modalOpen={alertModalOpen}
                    Icon={AlertIcon}
                    iconColor="red"
                    titleColor="red"
                    messages={mileage}
                >
                    <ModalTextBox>
                        <ModalTextWrapper>마일리지가 부족합니다</ModalTextWrapper>
                        <ModalSubTextWrapper>현재 마일리지: {mileage}</ModalSubTextWrapper>
                    </ModalTextBox>
                    <ModalButtonBox>
                        <TextButton
                            shape="positive-curved"
                            text="확인"
                            onClick={() => setAlertModalOpen(false)}
                        />
                    </ModalButtonBox>
                </Modal>
            )}
            <MatchHomeTitle>자, 이제 떠나볼까요!</MatchHomeTitle>
            <TicketBackgroundBox>
                <TicketContentBox>
                    <TicketContentUpperBox>
                        <DestinationContentWrapper>
                            <TextWrapper size="title">출발지</TextWrapper>
                            <TextWrapper size="subTitle">DEPERATURE</TextWrapper>
                            <Dropdown
                                width="175px"
                                shape="negative"
                                data={skillLanguageList}
                                defaultOption={{ id: "135", label: "한국어", img: koreaFlagIcon }}
                                selectedOption={skillLanguage}
                                onChange={setSkillLanguage}
                            />
                        </DestinationContentWrapper>
                        <RightArrowIcon />
                        <DestinationContentWrapper>
                            <TextWrapper size="title">도착지</TextWrapper>
                            <TextWrapper size="subTitle">ARRIVAL</TextWrapper>
                            <Dropdown
                                width="175px"
                                shape="negative"
                                data={studyLanguageList}
                                defaultOption={{ id: "242", label: "일본어", img: japanFlagIcon }}
                                selectedOption={studyLanguage}
                                onChange={setStudyLanguage}
                            />
                        </DestinationContentWrapper>
                    </TicketContentUpperBox>
                    <TicketButtonDownWrapper>
                        <TextButton
                            shape="positive-curved-large"
                            text="일반 매칭"
                            onClick={handleClickNormalMatching}
                        />
                        <TextButton
                            shape="positive-curved-large"
                            text="프리미엄 매칭"
                            onClick={handleClickPremiumMatching}
                        />
                        <TooltipBox>
                            <Tooltip
                                position={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                    direction: "up",
                                }}
                            >
                                <TooltipContentContainer />
                            </Tooltip>
                        </TooltipBox>
                    </TicketButtonDownWrapper>
                </TicketContentBox>
                <TicketSubContentBox>
                    <div>
                        <TextWrapper size="title">랭커이름</TextWrapper>
                        <TextWrapper size="subTitle">LANGKER NAME</TextWrapper>
                        <TextWrapper size="langker">{userNickname}</TextWrapper>
                    </div>
                    <div>
                        <TextWrapper size="title">현재 접속 중인 랭커</TextWrapper>
                        <TextWrapper size="subTitle">LANGKER ONLINE</TextWrapper>
                        <TextWrapper size="langker">
                            {concurrentUser.concurrentUsersSize}
                        </TextWrapper>
                    </div>
                    <div>
                        <TextWrapper size="title">현재 매칭 중인 랭커</TextWrapper>
                        <TextWrapper size="subTitle">LANGKER ON BOARD</TextWrapper>
                        <TextWrapper size="langker">{concurrentUser.waitingUsersSize}</TextWrapper>
                    </div>
                </TicketSubContentBox>
            </TicketBackgroundBox>
        </MatchHomeContainer>
    );
}

const ModalTextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ModalTextWrapper = styled.span`
    color: ${({ color }) => color};
    text-align: center;
    font-size: 25px;
    font-weight: 400;
    line-height: 44px;
`;

const ModalSubTextWrapper = styled.div`
    font-size: 25px;
    font-weight: 700;
`;

const ModalButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;

const MatchHomeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
`;

const MatchHomeTitle = styled.div`
    color: #000;
    text-align: center;
    font-size: 45px;
    font-weight: 800;
    line-height: 44px;
`;

const TicketBackgroundBox = styled.div`
    width: 802px; // add this
    height: 306px; // add this
    background-image: url(${ticketBackground});
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`;

const TicketContentBox = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-direction: column;
    width: 464px;
    top: 50%;
    transform: translate(0, -36%);
    left: 60px;
    z-index: 100;
`;

const TicketSubContentBox = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 200px;
    top: 80px;
    left: 600px;
    gap: 18px;
    z-index: 99;
`;

const TicketContentUpperBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 40px;
    svg {
        padding-bottom: 10px;
    }
    div > svg {
        padding-bottom: 0px;
    }
    position: relative;
    z-index: 101;
`;

const DestinationContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    position: relative;
`;

const TicketButtonDownWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    z-index: 100;
`;

const TextWrapper = styled.div`
    position: relative;
    color: #000000;
    text-align: center;
    line-height: normal;
    ${({ size }) => {
        switch (size) {
            case "title":
                return `
                    font-size: 15px;
                    font-weight: 700;
                `;
            case "subTitle":
                return `
                    font-size: 10px;
                    font-weight: 400;
                `;
            case "langker":
                return `
                    font-size: 17px;
                    font-weight: 700;
                `;
            default:
                return "";
        }
    }}
`;

const TooltipContentContainer = styled.div`
    position: relative;
    width: 400px;
    height: 400px;
    background-image: url(${LanguageRankBox});
    background-size: cover;
    border-radius: 20px;
    background-color: transparent;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const TooltipBox = styled.div`
    position: relative;
    z-index: 100;
`;

export default MatchHome;
