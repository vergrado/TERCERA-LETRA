// ============================================================
// Navbar.jsx
// ------------------------------------------------------------
// Barra superior principal.
//
// Este componente únicamente muestra información.
//
// NO consulta Firebase.
//
// Toda la información llega mediante props.
//
// ============================================================
import {
    FaSearch,
    FaBell,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";
import "../../styles/layout/navbar.css";
const Navbar = ({
    user,
    profile,
    onLogout
}) => {
    return (
        <header className="navbar-custom">
            {/* ========================================
                Buscador
            ======================================== */}
            <div className="navbar-search">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Buscar..."
                />
            </div>
            {/* ========================================
                Zona derecha
            ======================================== */}
            <div className="navbar-right">
                {/* Notificaciones */}
                <button
                    className="navbar-icon"
                    type="button"
                >
                    <FaBell />
                </button>
                {/* Usuario */}
                <div className="navbar-user">
                    <FaUserCircle
                        className="user-avatar"
                    />
                    <div>
                        <h6>
                            {
                                profile?.nombre ||
                                user?.email ||
                                "Usuario"
                            }
                        </h6>
                        <small>
                            {
                                profile?.rol ||
                                "Sin Rol"
                            }
                        </small>
                    </div>
                </div>
                {/* Botón salir */}
                <button
                    className="btn btn-danger"
                    onClick={onLogout}
                >
                    <FaSignOutAlt />
                    <span className="ms-2">
                        Salir
                    </span>
                </button>
            </div>
        </header>
    );
};
export default Navbar;