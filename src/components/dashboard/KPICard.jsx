// ============================================================
// KPICards.jsx
// ------------------------------------------------------------
// Contenedor de indicadores principales del Dashboard.
//
// Responsabilidades:
//
// • Mostrar los KPIs principales.
// • Obtener la información desde DashboardContext.
// • Mostrar placeholders durante la carga.
//
// Plataforma:
// TERCERA LETRA
// ============================================================


// ============================================================
// IMPORTACIONES
// ============================================================

import {
    FaFolderOpen,
    FaUsers,
    FaFileAlt,
    FaBell
} from "react-icons/fa";
import Placeholder from "react-bootstrap/Placeholder";
import KPICard from "./KPICard";
import { useDashboardContext } from "../../contexts/DashboardContext";
import "../../styles/dashboard/kpi-cards.css";
// ============================================================
// COMPONENTE
// ============================================================
const KPICards = () => {
    //----------------------------------------------------------
    // Información compartida del Dashboard.
    //----------------------------------------------------------
    const {
        kpis,
        loading
    } = useDashboardContext();
    //----------------------------------------------------------
    // Configuración de tarjetas.
    //----------------------------------------------------------
    const cards = [
        {
            title: "Casos",
            value: kpis.cases,
            icon: <FaFolderOpen />,
            color: "primary",
            route: "/casos"
        },
        {
            title: "Personas",
            value: kpis.people,
            icon: <FaUsers />,
            color: "success",
            route: "/personas"
        },
        {
            title: "Documentos",
            value: kpis.documents,
            icon: <FaFileAlt />,
            color: "warning",
            route: "/documentos"
        },
        {
            title: "Alertas",
            value: kpis.alerts,
            icon: <FaBell />,
            color: "danger",
            route: "/alertas"

        }
    ];
    //----------------------------------------------------------
    // Mientras se cargan los datos.
    //----------------------------------------------------------
    if (loading) {
        return (
            <section className="kpi-grid">
                {
                    Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="card shadow-sm p-4"
                        >
                            <Placeholder animation="glow">
                                <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder animation="glow">
                                <Placeholder xs={4} />
                            </Placeholder>
                        </div>
                    ))
                }
            </section>
        );
    }
    //----------------------------------------------------------
    // Vista normal.
    //----------------------------------------------------------
    return (
        <section className="kpi-grid">
            {
                cards.map((card) => (
                    <KPICard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                        route={card.route}
                    />
                ))
            }
        </section>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default KPICards;