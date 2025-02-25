import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

import { ThemeProvider } from "./components/theme-provider";
import { CameraProvider } from "./contexts/CameraContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <CameraProvider>
                <App />
            </CameraProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
