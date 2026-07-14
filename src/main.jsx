// ============================================================
// main.jsx
// ------------------------------------------------------------
// Punto de entrada de la aplicación.
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./contexts/AuthContext";
import { CaseProvider } from "./contexts/CaseContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CaseProvider>
                    <App />
                </CaseProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);