// ============================================================
// SidebarItem.jsx
// ------------------------------------------------------------
// Componente reutilizable para representar una opción
// del menú lateral.
//
// Este componente:
//
// • Muestra un icono.
// • Muestra un texto.
// • Navega mediante React Router.
// • Resalta automáticamente la ruta activa.
//
// Será utilizado por Sidebar.jsx.
// ============================================================


// ============================================================
// IMPORTACIONES
// ============================================================

// Componente NavLink de React Router.
//
// NavLink permite conocer automáticamente
// si la ruta actual coincide con el enlace.
import { NavLink } from "react-router-dom";
// ============================================================
// COMPONENTE
// ============================================================
const SidebarItem = ({
    icon,
    title,
    to
}) => {
    return (
        <NavLink
            //--------------------------------------------------
            // Ruta de destino.
            //--------------------------------------------------
            to={to}
            //--------------------------------------------------
            // Clase dinámica.
            //
            // Cuando la ruta está activa agregamos la clase
            // sidebar-item-active.
            //--------------------------------------------------
            className={({ isActive }) =>
                isActive
                    ? "sidebar-item sidebar-item-active"
                    : "sidebar-item"
            }
        >
            {/* Icono */}
            <span className="sidebar-item-icon">
                {icon}
            </span>
            {/* Texto */}
            <span className="sidebar-item-title">
                {title}
            </span>
        </NavLink>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default SidebarItem;