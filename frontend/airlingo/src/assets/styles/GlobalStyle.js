import { css } from "@emotion/react";

const GlobalStyle = css`
    @font-face {
        font-family: "Pretendard";
        font-weight: 100;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Thin.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 200;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Extralight.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 300;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Light.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 400;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Regular.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 500;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Medium.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 600;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Semibold.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 700;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Bold.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 800;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-ExtraBold.otf") format("opentype");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 900;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Black.otf") format("opentype");
    }
    html,
    body {
        font-family: "Pretendard";
        font-weight: 400;
        line-height: 1;
    }
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    ol,
    ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: "";
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`;

export default GlobalStyle;
