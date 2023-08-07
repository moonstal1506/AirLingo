import isKeyInObj from "./common";

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
        remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
}

function formatLanguage(Language) {
    if (
        !Language ||
        !isKeyInObj(Language, "languageId") ||
        !isKeyInObj(Language, "languageKorName") ||
        !isKeyInObj(Language, "imageUrl")
    ) {
        return {
            id: "1",
            label: "한국어",
            img: "public/favicon-192x192.png",
        };
    }
    const { languageId, languageKorName, imageUrl } = Language;
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
        };
    }
    const { reportItemId, reportItem } = item;
    return {
        id: reportItemId,
        label: reportItem,
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
            id: "0",
            label: "실력을 알 수 없음",
        };
    }
    const { gradeId, gradeName, gradeKorName } = grade;
    return {
        id: gradeId,
        label: `${gradeKorName}(${gradeName})`,
    };
}

export { formatTime, formatLanguage, formatReportItem, formatGrade };
