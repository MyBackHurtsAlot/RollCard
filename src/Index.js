import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { ThemeProvider } from "styled-components";
import ResetStyle from "./GlobalStyle/ResetStyle.js";
import GlobalStyle from "./GlobalStyle/GlobalStyle.js";

const theme = {
    colors: {
        primary_Dark: "#0D0D0D",
        primary_Grey: "#404040",
        primary_Lightgrey: "#A6A6A6",
        primary_white: "#f2f2f2",
        highLight: "#F2B705",
        Error: "#aa0000",
    },
};

createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <ResetStyle />
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
