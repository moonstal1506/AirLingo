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
        !("languageId" in language) ||
        !("languageKorName" in language) ||
        !("imageUrl" in language)
    ) {
        return {
            id: "1",
            label: "한국어",
            img: "https://airlingobucket.s3.ap-northeast-2.amazonaws.com/flag-korea-icon.svg",
        };
    }
    const { languageId, languageKorName, imageUrl } = language;
    return {
        id: languageId,
        label: languageKorName,
        img: imageUrl,
    };
}

function formatGrade(grade) {
    const { gradeId, gradeName, gradeKorName } = grade;
    return {
        id: gradeId,
        label: `${gradeKorName}(${gradeName})`,
        img: null,
    };
}

// ----------------------------------------------------------------------------------------------------

export { formatTime, formatLanguage, formatGrade };
