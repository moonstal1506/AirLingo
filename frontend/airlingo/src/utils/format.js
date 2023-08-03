import { ReactComponent as KoreaFlagIcon } from "@/assets/imgs/icons/flag-korea-icon.svg";

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
        return { id: "1", label: "한국어", img: KoreaFlagIcon };
    }
    const { languageId, languageKorName, imageUrl } = Language;
    return {
        id: languageId,
        label: languageKorName,
        img: imageUrl,
    };
}

export { formatTime, formatLanguage };
