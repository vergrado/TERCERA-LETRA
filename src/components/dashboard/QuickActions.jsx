// ============================================================
// QuickActions.jsx
// ------------------------------------------------------------
// Accesos rápidos del Dashboard.
//
// Muestra los accesos principales de la plataforma.
//
// En futuras versiones estos accesos podrán variar según
// el rol del usuario.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { Link } from "react-router-dom";
import {
    FaPlusCircle,
    FaUserPlus,
    FaFileMedical,
    FaChartBar
} from "react-icons/fa";
import "../../styles/dashboard/quick-actions.css";
const QuickActions = () => {
    //----------------------------------------------------------
    // Configuración de acciones.
    //----------------------------------------------------------
    const actions = [
        {
            title: "Nuevo Caso",
            icon: <FaPlusCircle />,
            route: "/casos",
            color: "primary"
        },
        {
            title: "Nueva Persona",
            icon: <FaUserPlus />,
            route: "/personas",
            color: "success"
        },
        {
            title: "Nuevo Documento",
            icon: <FaFileMedical />,
            route: "/documentos",
            color: "warning"
        },
        {
            title: "Ver Reportes",
            icon: <FaChartBar />,
            route: "/reportes",
            color: "danger"
        }
    ];
    return (
        <section className="quick-actions">
            <div className="quick-actions-header">
                <h3>
                    Acciones rápidas
                </h3>
                <p>
                    Accesos directos a las funciones más utilizadas.
                </p>
            </div>
            <div className="quick-actions-grid">
                {
                    actions.map((action) => (
                        <Link
                            key={action.title}
                            to={action.route}
                            className={`btn btn-${action.color} quick-action-btn`}
                        >
                            <span className="quick-action-icon">
                                {action.icon}
                            </span>
                            <span>
                                {action.title}
                            </span>
                        </Link>
                    ))
                }
            </div>
        </section>
    );
};
export default QuickActions;