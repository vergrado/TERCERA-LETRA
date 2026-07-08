// ============================================================
// App.jsx
// Configuración principal de rutas
// ============================================================

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Casos from "./pages/Casos";
import Personas from "./pages/Personas";
import Documentos from "./pages/Documentos";
import Alertas from "./pages/Alertas";
import Reportes from "./pages/Reportes";
import Administracion from "./pages/Administracion";

import ProtectedRoute from "./routes/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {
    return (
        <Routes>
            {/* Redirección inicial */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />
            {/* Públicas */}
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/register"
                element={<Register />}
            />
            {/* Privadas */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />
                <Route
                    path="/casos"
                    element={<Casos />}
                />
                <Route
                    path="/personas"
                    element={<Personas />}
                />
                <Route
                    path="/documentos"
                    element={<Documentos />}
                />
                <Route
                    path="/alertas"
                    element={<Alertas />}
                />
                <Route
                    path="/reportes"
                    element={<Reportes />}
                />
                <Route
                    path="/administracion"
                    element={<Administracion />}
                />
            </Route>
            {/* Ruta inexistente */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}
export default App;