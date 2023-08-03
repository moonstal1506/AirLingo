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
        !("languageId" in Language) ||
        !("languageKorName" in Language) ||
        !("imageUrl" in Language)
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

export { formatTime, formatLanguage };
