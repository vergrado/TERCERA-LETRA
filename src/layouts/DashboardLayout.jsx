// ============================================================
// DashboardLayout.jsx
// ------------------------------------------------------------
// Layout principal de la plataforma TERCERA LETRA.
//
// Responsabilidades:
//
// • Mostrar Sidebar.
// • Mostrar Navbar.
// • Compartir DashboardContext.
// • Mostrar el contenido dinámico.
// • Obtener la información del usuario desde AuthContext.
// • Administrar el cierre de sesión.
//
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import {
    Outlet,
    useNavigate
} from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { DashboardProvider } from "../contexts/DashboardContext";
import { logout } from "../services/authService";
import "../styles/layout/dashboard-layout.css";

// ============================================================
// COMPONENTE
// ============================================================
const DashboardLayout = () => {
    //----------------------------------------------------------
    // Usuario autenticado.
    //----------------------------------------------------------
    const {
        user,
        profile
    } = useAuth();
    //----------------------------------------------------------
    // Navegación.
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Cerrar sesión.
    //----------------------------------------------------------
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        }
        catch (error) {
            console.error(error);
        }
    };
    //----------------------------------------------------------
    // Interfaz.
    //----------------------------------------------------------
    return (
        <DashboardProvider>
            <div className="dashboard-layout">
                <Sidebar />
                <main className="dashboard-main">
                    <Navbar
                        user={user}
                        profile={profile}
                        onLogout={handleLogout}
                    />
                    <section className="dashboard-content">
                        <Outlet />
                    </section>
                </main>
            </div>
        </DashboardProvider>
    );
};
export default DashboardLayout;