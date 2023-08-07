import isKeyInObj from "./common";

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
        remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
}

function formatLanguage(language) {
    if (
        !language ||
        !isKeyInObj(language, "languageId") ||
        !isKeyInObj(language, "languageKorName") ||
        !isKeyInObj(language, "imageUrl")
    ) {
        return {
            id: 0,
            label: "",
            img: "",
        };
    }
    const { languageId, languageKorName, imageUrl } = language;
    return {
        id: languageId,
        label: languageKorName,
        img: imageUrl,
    };
}

function formatReportItem(item) {
    if (!item || !isKeyInObj(item, "reportItemId") || !isKeyInObj(item, "reportItem")) {
        return {
            id: "0",
            label: "잘못된 신고 사유",
            img: "",
        };
    }
    const { reportItemId, reportItem } = item;
    return {
        id: reportItemId,
        label: reportItem,
        img: "",
    };
}

function formatGrade(grade) {
    if (
        !grade ||
        !isKeyInObj(grade, "gradeId") ||
        !isKeyInObj(grade, "gradeName") ||
        !isKeyInObj(grade, "gradeKorName")
    ) {
        return {
            id: 0,
            label: "실력을 알 수 없음",
            img: "",
        };
    }
    const { gradeId, gradeName, gradeKorName } = grade;
    return {
        id: gradeId,
        label: `${gradeKorName}(${gradeName})`,
        img: "",
    };
}

// ----------------------------------------------------------------------------------------------------

export { formatTime, formatLanguage, formatReportItem, formatGrade };
