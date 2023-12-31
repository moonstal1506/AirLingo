/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import styled from "@emotion/styled";
import moment from "moment";
import { logoutUser, selectUser } from "@/features/User/UserSlice.js";
import { getDailyGrid } from "@/api/user.js";
import theme from "@/assets/styles/Theme";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "@/hooks";

const { primary2, primary3, primary4, primary6, selection, faintgray } = theme.colors;

function CalendarPage() {
    const storeUser = useSelector(selectUser);
    const { userId } = storeUser;
    const { routeTo } = useRouter();
    const dispatch = useDispatch();
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
                    400: () => {
                        alert("응답에 실패하였습니다. 다시 시도해주세요.");
                    },
                    470: () => {
                        dispatch(logoutUser());
                        routeTo("/error");
                    },
                },
                data: { userId },
                routeTo,
            });
        }
        fetchData();
    }, [userId]);

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

    return (
        <CalendarContainer>
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                locale="en-US"
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
    );
}

const CalendarContainer = styled.div`
    margin-top: 200px;
    margin-left: 200px;
    margin-top: 200px;

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
        height: 70px;
        margin-bottom: 0.5em;
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
        font-size: 26px;
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

    .react-calendar__year-view__months__month {
        flex: 0 0 33.3333% !important;
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

export default CalendarPage;
