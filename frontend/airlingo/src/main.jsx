import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, Global } from "@emotion/react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import App from "@/App";
import GlobalStyle from "@/assets/styles/GlobalStyle";
import theme from "@/assets/styles/Theme";
import store, { persistor } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <Global styles={GlobalStyle} />
                    <App />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
