// ============================================================
// Sidebar.jsx
// ------------------------------------------------------------
// Menú lateral principal de la plataforma TERCERA LETRA.
//
// Este componente:
//
// • Muestra el nombre de la plataforma.
// • Genera automáticamente el menú.
// • Utiliza SidebarItem.
// • Está preparado para permisos por rol.
// ============================================================


// ============================================================
// IMPORTACIONES
// ============================================================

import SidebarItem from "./SidebarItem";
// Estilos del Sidebar.
import "../../styles/layout/sidebar.css";
// React Icons
import {
    FaHome,
    FaFolderOpen,
    FaUsers,
    FaFileAlt,
    FaBell,
    FaChartBar,
    FaCog
} from "react-icons/fa";
// ============================================================
// CONFIGURACIÓN DEL MENÚ
// ============================================================
const menuItems = [
    {
        title: "Dashboard",
        to: "/dashboard",
        icon: <FaHome />,
        roles: ["ADMIN", "PROFESIONAL"]
    },
    {
        title: "Gestión de Casos",
        to: "/casos",
        icon: <FaFolderOpen />,
        roles: ["ADMIN", "PROFESIONAL"]
    },
    {
        title: "Personas Atendidas",
        to: "/personas",
        icon: <FaUsers />,
        roles: ["ADMIN", "PROFESIONAL"]
    },
    {
        title: "Gestión Documental",
        to: "/documentos",
        icon: <FaFileAlt />,
        roles: ["ADMIN", "PROFESIONAL"]
    },
    {
        title: "Alertas",
        to: "/alertas",
        icon: <FaBell />,
        roles: ["ADMIN", "PROFESIONAL"]
    },
    {
        title: "Reportes",
        to: "/reportes",
        icon: <FaChartBar />,
        roles: ["ADMIN", "PROFESIONAL"]
    },
    {
        title: "Administración",
        to: "/administracion",
        icon: <FaCog />,
        roles: ["ADMIN"]
    }
];
// ============================================================
// COMPONENTE
// ============================================================
const Sidebar = () => {
    //----------------------------------------------------------
    // Más adelante el rol se obtendrá desde AuthContext.
    //----------------------------------------------------------
    const userRole = "ADMIN";
    //----------------------------------------------------------
    // Filtramos únicamente las opciones permitidas.
    //----------------------------------------------------------
    const visibleItems = menuItems.filter(

        (item) => item.roles.includes(userRole)
    );
    //----------------------------------------------------------
    // Interfaz.
    //----------------------------------------------------------
    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-header">
                <h3>
                    TERCERA LETRA
                </h3>
            </div>
            {/* Menú */}
            <nav className="sidebar-menu">
                {
                    visibleItems.map(
                        (item) => (
                            <SidebarItem
                                key={item.to}
                                icon={item.icon}
                                title={item.title}
                                to={item.to}
                            />
                        )
                    )
                }
            </nav>
        </aside>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default Sidebar;