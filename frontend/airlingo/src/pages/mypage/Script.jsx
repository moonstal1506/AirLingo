/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import moment from "moment";
import { useRouter } from "@/hooks";
import leftPassportPages from "@/assets/imgs/profiles/left-passport-pages.png";
import rightPassportPages from "@/assets/imgs/profiles/right-passport-pages.png";
import TabBar from "@/components/common/tab/TabBar.jsx";
import { TextButton } from "@/components/common/button";
import { ReactComponent as RightArrow } from "@/assets/icons/right-arrow-mini-Icon.svg";
import { ReactComponent as LeftIcon } from "@/assets/icons/left-icon.svg";
import { ReactComponent as RightIcon } from "@/assets/icons/right-icon.svg";
import { ReactComponent as NoscriptBackground } from "@/assets/icons/no-data-icon.svg";
import { ReactComponent as BackButton } from "@/assets/icons/back-button.svg";
import scriptBackground from "@/assets/imgs/script-background.png";
import { getScriptList } from "@/api/script";
import { logoutUser, selectUser } from "@/features/User/UserSlice.js";
import { getDailyGrid } from "@/api/user.js";
import theme from "@/assets/styles/Theme";
import "react-calendar/dist/Calendar.css";
import ScriptLookingUpModal from "@/components/modal/mypage/ScriptLookingUpModal";

const { primary2, primary3, primary4, primary6, selection, faintgray } = theme.colors;

function createScriptList(data) {
    const arr = [];
    data.forEach((cur) => {
        const { imageUrl, languageKorName, nativeLanguageDto, partnerNickName } = cur;
        if (cur.scripts) {
            cur.scripts.forEach((curScript) => {
                const { korCard, scriptUrl, scriptContent, createdDate, modifiedDate } = curScript;
                arr.push({
                    imageUrl,
                    languageKorName,
                    nativeLanguageDto,
                    partnerNickName,
                    korCard,
                    scriptUrl,
                    scriptContent,
                    createdDate,
                    modifiedDate,
                });
            });
        }
    });
    return arr;
}

function Script() {
    const storeUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const { routeTo } = useRouter();
    const { userId } = storeUser;
    const [desiredDate, setDesiredDate] = useState();
    const [scriptList, setScriptList] = useState([]);
    const [currentScriptIdx, setCurrentScriptIdx] = useState(0);
    const [openScriptModal, setOpenScriptModal] = useState(false);

    // -------------------------------------------------------------------------------------------

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dailyGridList, setDailyGridList] = useState({});
    const [gridCountByDate, setGridCountByDate] = useState({});

    useEffect(() => {
        async function fetchData() {
            await getDailyGrid({
                responseFunc: {
                    200: (response) => {
                        setDailyGridList({ ...response.data.data });
                    },
                    470: () => {
                        setDailyGridList({});
                    },
                    400: () => {
                        alert("응답에 실패했습니다. 다시 시도해주세요.");
                    },
                },
                data: { userId },
                routeTo,
            });
        }
        fetchData();
    }, [userId, routeTo]);

    useEffect(() => {
        const emptyGridCountByDate = {};
        Object.keys(dailyGridList).forEach((key) => {
            const { createdDate, dailyGridCount } = dailyGridList[key];
            const originalDate = createdDate.split("T")[0];
            const parts = originalDate.split("-");
            const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

            emptyGridCountByDate[formattedDate] = dailyGridCount;
        });
        setGridCountByDate({ ...emptyGridCountByDate });
    }, [dailyGridList]);

    // 날짜 포맷팅 함수
    const formatDate = (date) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return date.toLocaleDateString("ko-KR", options).replace(/. /g, "-").slice(0, -1);
    };

    const handleDayClick = async (value) => {
        const newDate = formatDate(value);
        setDesiredDate(newDate); // 선택한 날짜를 변경
        setCurrentScriptIdx(0); // 페이지를 초기화
    };
    useEffect(() => {
        async function fetchData() {
            await getScriptList({
                responseFunc: {
                    200: (response) => {
                        setScriptList(createScriptList(response.data.data));
                    },
                    492: () => {
                        setScriptList([]);
                    }, // 스크립트가 없는 경우
                    400: () => {
                        alert("응답에 실패했습니다. 다시 시도해주세요.");
                    },
                    500: () => {
                        dispatch(logoutUser());
                        routeTo("/error");
                    },
                },
                data: { userId, date: desiredDate },
                routeTo,
            });
        }
        if (userId && desiredDate) fetchData();
    }, [userId, desiredDate, routeTo]);

    const handleLookupScript = () => {
        setOpenScriptModal(true);
    };

    // 다음 페이지로 이동하는 함수
    const nextPage = () => {
        if (currentScriptIdx === scriptList.length - 1) {
            setCurrentScriptIdx(0);
        } else {
            setCurrentScriptIdx((prev) => prev + 1);
        }
    };

    // 이전 페이지로 이동하는 함수
    const prevPage = () => {
        if (currentScriptIdx === 0) {
            setCurrentScriptIdx(scriptList.length - 1);
        } else {
            setCurrentScriptIdx((prev) => prev - 1);
        }
    };

    const handleCloseModal = () => {
        setOpenScriptModal(false);
    };

    return (
        <ScriptHomeContainer id="SC">
            <ScriptLookingUpModal
                isOpen={openScriptModal}
                script={scriptList[currentScriptIdx]}
                onClick={handleCloseModal}
            />
            <PassportContainer id="PC">
                <LeftPageBox>
                    <LeftPassportPages src={leftPassportPages} />
                    <TabBarContainer>
                        <TabBar activeTab="statistic" id="TabBar" />
                    </TabBarContainer>
                    <LeftPassportPage>
                        <BackButtonIcon onClick={() => routeTo("/statistic")} />
                        <CalendarContainer>
                            <Calendar
                                onChange={setSelectedDate}
                                value={selectedDate}
                                locale="en-US"
                                onClickDay={handleDayClick}
                                id="Calendar"
                                tileClassName={({ date }) => {
                                    const formattedDate = moment(date).format("DD-MM-YYYY");
                                    const gridCount = gridCountByDate[formattedDate];

                                    if (gridCount !== undefined) {
                                        const highlightClass = `count-${gridCount}`;
                                        return `highlight ${highlightClass}`;
                                    }
                                    return `highlight count-0`;
                                }}
                            />
                        </CalendarContainer>
                    </LeftPassportPage>
                </LeftPageBox>
                <RightPageBox>
                    <LeftPassportPages src={rightPassportPages} />
                    <RightPassportPage>
                        <ScriptBox>
                            <ScriptTextBox>
                                <ScriptText>대화기록</ScriptText>
                                <ScriptDate>
                                    {desiredDate &&
                                        new Date(desiredDate).toLocaleDateString("ko-KR", {
                                            month: "long",
                                            day: "numeric",
                                        })}
                                </ScriptDate>
                            </ScriptTextBox>
                            {scriptList.length === 0 ? (
                                <NoScriptContentBox>
                                    <NoscriptBackground />
                                </NoScriptContentBox>
                            ) : (
                                <ScriptTextAndIcons>
                                    <LeftIcon onClick={prevPage} />
                                    <ScriptContentBox>
                                        <ScriptDetailText>
                                            <ScriptOrder>
                                                {scriptList.length}개 중 {currentScriptIdx + 1}번째
                                            </ScriptOrder>
                                        </ScriptDetailText>
                                        <ScirptDetailContent>
                                            <LanguageSection>
                                                <ScriptLanguage>
                                                    <SkillLanguage>
                                                        <img
                                                            src={
                                                                scriptList[currentScriptIdx]
                                                                    .nativeLanguageDto.imageUrl
                                                            }
                                                            alt="nativeLangImg"
                                                        />
                                                        <LanguageName>
                                                            {
                                                                scriptList[currentScriptIdx]
                                                                    .nativeLanguageDto
                                                                    .languageKorName
                                                            }
                                                        </LanguageName>
                                                    </SkillLanguage>
                                                    <RightArrow />
                                                    <StudyLanguage>
                                                        <img
                                                            src={
                                                                scriptList[currentScriptIdx]
                                                                    .imageUrl
                                                            }
                                                            alt="langImg"
                                                        />
                                                        <LanguageName>
                                                            {
                                                                scriptList[currentScriptIdx]
                                                                    .languageKorName
                                                            }
                                                        </LanguageName>
                                                    </StudyLanguage>
                                                </ScriptLanguage>
                                            </LanguageSection>
                                            <ScriptDetail>
                                                <ScriptDetailItem>
                                                    <ScriptLabel>대화 주제</ScriptLabel>
                                                    <ScriptValue>
                                                        {scriptList[currentScriptIdx].korCard}
                                                    </ScriptValue>
                                                </ScriptDetailItem>
                                                <ScriptDetailItem>
                                                    <ScriptLabel>상대 랭커</ScriptLabel>
                                                    <ScriptValue>
                                                        {
                                                            scriptList[currentScriptIdx]
                                                                .partnerNickName
                                                        }
                                                    </ScriptValue>
                                                </ScriptDetailItem>
                                                <ScriptDetailItem>
                                                    <ScriptLabel>시작 시간</ScriptLabel>
                                                    <ScriptValue>
                                                        {new Date(
                                                            scriptList[
                                                                currentScriptIdx
                                                            ].createdDate,
                                                        ).toLocaleTimeString("ko-KR", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </ScriptValue>
                                                </ScriptDetailItem>
                                                <ScriptDetailItem>
                                                    <ScriptLabel>종료 시간</ScriptLabel>
                                                    <ScriptValue>
                                                        {new Date(
                                                            scriptList[
                                                                currentScriptIdx
                                                            ].modifiedDate,
                                                        ).toLocaleTimeString("ko-KR", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </ScriptValue>
                                                </ScriptDetailItem>
                                            </ScriptDetail>
                                            <ScriptButton>
                                                <TextButton
                                                    shape="script"
                                                    text="스크립트 조회"
                                                    onClick={handleLookupScript}
                                                />
                                            </ScriptButton>
                                        </ScirptDetailContent>
                                    </ScriptContentBox>
                                    <RightIcon onClick={nextPage} />
                                </ScriptTextAndIcons>
                            )}
                        </ScriptBox>
                    </RightPassportPage>
                </RightPageBox>
            </PassportContainer>
        </ScriptHomeContainer>
    );
}

const ScriptHomeContainer = styled.div`
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

// ----------------------------------------------------------------------------------------

const ScriptBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* gap: 15px;
    width: 352px;
    height: 450px; */
    gap: 30px;
`;

const ScriptTextBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

// 대화기록
const ScriptText = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 100px;
    height: 30px;
    flex-direction: column;
    justify-content: center;
`;
// 날짜
const ScriptDate = styled.div`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    width: 300px;
    height: 75px;
    flex-direction: column;
    justify-content: center;
`;

// 스크립트 배경
const ScriptContentBox = styled.div`
    position: relative;
    width: 400px;
    height: 475px;
    background: url(${scriptBackground}), white;
`;

// x개중 x번째 담는 곳
const ScriptDetailText = styled.div`
    display: flex;
    width: 350px;
    padding: 10px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    position: absolute;
    left: 20px;
    top: 10px;
`;
// x개중 x번째 글씨
const ScriptOrder = styled.div`
    color: #fff;
    text-align: right;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ScirptDetailContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 11px 0px;
    width: 100%;
    align-items: center;
    position: absolute;
    bottom: 25px;
`;

const ScriptLanguage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LanguageSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 7px;
`;

const SkillLanguage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StudyLanguage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LanguageName = styled.div`
    display: flex;
    width: 150px;
    height: 50px;
    flex-direction: column;
    justify-content: center;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ScriptDetail = styled.div`
    display: flex;
    padding: 10px 0px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

const ScriptButton = styled.div`
    border: 1px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ScriptDetailItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 300px;
`;

const ScriptLabel = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
`;

const ScriptValue = styled.div`
    text-align: left;
    color: #000;
    font-family: Pretendard;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 30px;
    width: 170px;
    //글자 수 너무 길어지면 ... 으로 표시
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
const ScriptTextAndIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    & > svg {
        cursor: pointer;
    }
`;

// 스크립트X
const NoScriptContentBox = styled.div`
    position: relative;
    height: 414px;
    padding-top: 60px;
    justify-content: center;
    align-items: center;
`;

// --------------------------------------------------------------------------------------------------------------
// const LogoImage = styled.img`
//     width: 343px;
//     height: 173px;
// `;

const CalendarContainer = styled.div`
    margin-top: 40px;
    margin-left: 50px;
    /* margin-top: 200px; */

    .react-calendar {
        width: 400px;
        height: 450px;
        border: 0;
    }

    .react-calendar--doubleView {
        width: 700px;
    }

    .react-calendar--doubleView .react-calendar__viewContainer {
        display: flex;
        margin: -0.5em;
    }

    .react-calendar--doubleView .react-calendar__viewContainer > * {
        width: 50%;
        margin: 0.5em;
    }

    .react-calendar,
    .react-calendar *,
    .react-calendar *:before,
    .react-calendar *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .react-calendar button {
        outline: none;
    }

    .react-calendar button:enabled:hover {
        cursor: pointer;
    }

    .react-calendar__navigation {
        display: flex;
        height: 150px;
        margin-bottom: 30px;
    }

    .react-calendar__navigation button {
        min-width: 44px;
        background: none;
    }

    .react-calendar__navigation button:disabled {
        background-color: #f0f0f0;
    }

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #e6e6e6;
    }

    .react-calendar__navigation__label__labelText {
        font-size: 40px;
        font-weight: 700;
    }

    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75em;
        margin-bottom: 1em;
    }

    .react-calendar__month-view__days {
        gap: 10px;
        justify-content: center;
    }

    .react-calendar__month-view__weekdays__weekday {
        padding: 0.5em;
    }

    .react-calendar__year-view__months {
        gap: 10px;
    }

    .react-calendar__year-view__months__month {
        flex: 0 0 calc(33.3333% - 10px) !important;
    }

    .react-calendar__decade-view__years {
        gap: 10px;
    }

    .react-calendar__decade-view__years__year {
        flex: 0 0 calc(50% - 10px) !important;
    }

    .react-calendar__century-view__decades {
        gap: 10px;
    }

    .react-calendar__century-view__decades__decade {
        flex: 0 0 calc(50% - 10px) !important;
    }

    .react-calendar__month-view__weekNumbers .react-calendar__tile {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75em;
        font-weight: bold;
    }

    .react-calendar__month-view__days__day {
        flex: 0 0 calc(14.2857% - 10px) !important;
        color: black;
    }

    .react-calendar__month-view__days__day--weekend {
        color: #d10000;
    }

    .react-calendar__month-view__days__day--neighboringMonth {
        color: #757575;
    }

    .react-calendar__year-view .react-calendar__tile,
    .react-calendar__decade-view .react-calendar__tile,
    .react-calendar__century-view .react-calendar__tile {
    }

    .react-calendar__tile {
        width: 45px;
        height: 45px;
        margin-top: 10px;
        background: none;
        text-align: center;
        line-height: 16px;
        padding: 0px;
    }

    .react-calendar__tile:disabled {
        background-color: #f0f0f0;
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        border-radius: 10px;
        border: 5px solid ${selection};
    }

    .react-calendar__tile--now {
        border-radius: 10px;
        background: white;
        text-align: center;
    }

    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        border-radius: 10px;
        border: 5px solid ${selection};
    }

    .react-calendar__tile--hasActive {
    }

    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
        background: ${faintgray};
    }

    .react-calendar__tile--active {
        border-radius: 10px;
        background: ${faintgray};
    }

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        /* 날짜 선택 후 */
    }

    .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #e6e6e6;
    }

    .highlight {
        border-radius: 10px;

        &.count-0 {
            background: ${faintgray};
        }

        &.count-1 {
            background: ${primary2};
        }

        &.count-2 {
            background: ${primary3};
        }

        &.count-3 {
            background: ${primary4};
        }

        &.count-4 {
            background: ${primary6};
        }
    }
`;

const BackButtonIcon = styled(BackButton)`
    cursor: pointer;
    margin-top: 22px;
    margin-left: 21px;
    position: absolute;
`;

export default Script;
