// ============================================================
// App.jsx
// ------------------------------------------------------------
// Configuración principal de rutas de la aplicación.
//
// Plataforma:
// TERCERA LETRA
//
// Contiene:
//
// • Rutas públicas.
// • Rutas protegidas.
// • DashboardLayout.
// • Módulos funcionales.
//
// ============================================================
import { Routes, Route, Navigate } from "react-router-dom";
// ============================================================
// Páginas públicas
// ============================================================
import Login from "./pages/Login";
import Register from "./pages/Register";
// ============================================================
// Dashboard
// ============================================================
import Dashboard from "./pages/Dashboard"
// ============================================================
// Módulo Casos
// ============================================================
import Casos from "./pages/casos/Casos";
import CasoForm from "./pages/casos/CasoForm";
import CaseDetail from "./pages/casos/CaseDetail";
import CaseEdit from "./pages/casos/CaseEdit";
// ============================================================
// Otros módulos
// ============================================================
import Personas from "./pages/Personas";
import NuevaPersona from "./pages/personas/NuevaPersona";
import PersonaDetail from "./pages/personas/PersonaDetail";
import PersonaEdit from "./pages/personas/PersonaEdit";

import Documentos from "./pages/Documentos";
import Alertas from "./pages/Alertas";
import Reportes from "./pages/Reportes";
import Administracion from "./pages/Administracion";
// ============================================================
// Layout y Seguridad
// ============================================================
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { CaseProvider } from "./contexts/CaseContext";
import { ToastProvider } from "./contexts/ToastContext";
import { PersonProvider } from "./contexts/PersonContext";
// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
function App() {
    return (
        <ToastProvider>
            <Routes>
            {/* =======================================================
                Ruta inicial
            ======================================================= */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />
            {/* =======================================================
                Rutas públicas
            ======================================================= */}
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/register"
                element={<Register />}
            />
            {/* =======================================================
                Rutas privadas
            ======================================================= */}
            <Route
                element={
            <ProtectedRoute>
                <CaseProvider>
                    <PersonProvider>
                        <DashboardLayout />
                    </PersonProvider>
                </CaseProvider>
            </ProtectedRoute>
                }
            >
                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                {/* Casos */}
                <Route
                    path="/casos"
                    element={<Casos />}
                />
                <Route
                    path="/casos/nuevo"
                    element={<CasoForm />}
                />
                <Route
                    path="/casos/:id"
                    element={<CaseDetail />}
                />
                <Route
                    path="/casos/:id/editar"
                    element={<CaseEdit />}
                />
                {/* Personas */}
            <Route
                path="/personas"
                element={<Personas />}
            />

            <Route
                path="/personas/nuevo"
                element={<NuevaPersona />}
            />

            <Route
                path="/personas/:id"
                element={<PersonaDetail />}
            />

            <Route
                path="/personas/:id/editar"
                element={<PersonaEdit />}
            />
                {/* Documentos */}
                <Route
                    path="/documentos"
                    element={<Documentos />}
                />
                {/* Alertas */}
                <Route
                    path="/alertas"
                    element={<Alertas />}
                />
                {/* Reportes */}

                <Route
                    path="/reportes"
                    element={<Reportes />}
                />
                {/* Administración */}

                <Route
                    path="/administracion"
                    element={<Administracion />}
                />
            </Route>
            {/* =======================================================
                Ruta inexistente
            ======================================================= */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
            </Routes>
        </ToastProvider>
    );
}
export default App;