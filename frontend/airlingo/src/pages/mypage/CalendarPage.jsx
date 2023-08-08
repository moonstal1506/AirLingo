import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "@emotion/styled";
import theme from "@/assets/styles/Theme";

function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 날짜 포맷팅 함수
    const formatDate = (date) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return date.toLocaleDateString("ko-KR", options).replace(/. /g, "-").slice(0, -1);
    };

    const handleDayClick = (value) => {
        console.log("Clicked day:", formatDate(value));
    };

    return (
        <CalendarContainer>
            <Calendar
                locale="en-US"
                onChange={setSelectedDate}
                value={selectedDate}
                onClickDay={handleDayClick}
                id="Calendar"
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
        border: 5px solid ${theme.colors.selection};
        background: ${theme.colors.faintgray};
    }

    .react-calendar__tile--now {
        border-radius: 10px;
        border: 5px solid ${theme.colors.primary1};
        background: white;
        text-align: center;
    }

    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        border-radius: 10px;
        border: 5px solid ${theme.colors.selection};
        background: ${theme.colors.faintgray};
    }

    .react-calendar__tile--hasActive {
        background: ${theme.colors.faintgray};
    }

    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
        background: ${theme.colors.faintgray};
    }

    .react-calendar__tile--active {
        border-radius: 10px;
        background: ${theme.colors.faintgray};
    }

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        /* 날짜 선택 후 */
    }

    .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #e6e6e6;
    }
`;

export default CalendarPage;
