import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary4, warning, faintgray } = theme.colors;
const iconConfig = {
    size: {
        small: "25px",
        big: "50px",
    },
    color: {
        black: "#000000",
        white: "#ffffff",
        primary: `${primary4}`,
        red: `${warning}`,
        gray: `${faintgray}`,
    },
};

// ----------------------------------------------------------------------------------------------------

export default iconConfig;
