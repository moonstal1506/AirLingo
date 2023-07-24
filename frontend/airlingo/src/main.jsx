import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, Global } from "@emotion/react";
import App from "@/App";
import GlobalStyle from "@/assets/styles/GlobalStyle";
import theme from "@/assets/styles/Theme";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Global styles={GlobalStyle} />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
