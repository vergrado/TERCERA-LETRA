// ============================================================
// KPICards.jsx
// ------------------------------------------------------------
// Contenedor de indicadores del Dashboard.
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
    FaBell,
    FaPlayCircle,
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";
import KPICard from "./KPICard";
import "../../styles/dashboard/kpi-cards.css";
// ============================================================
// COMPONENTE
// ============================================================
const KPICards = ({
    kpis = {},
    caseStatistics = {}
}) => {
    //----------------------------------------------------------
    // Valores principales.
    //----------------------------------------------------------
    const {
        cases = 0,
        people = 0,
        documents = 0,
        alerts = 0
    } = kpis;
    //----------------------------------------------------------
    // Estadísticas de casos.
    //----------------------------------------------------------
    const {
        activeCases = 0,
        closedCases = 0,
        highPriorityCases = 0
    } = caseStatistics;
    //----------------------------------------------------------
    // Configuración de tarjetas.
    //----------------------------------------------------------
    const cards = [
        {
            title: "Casos",
            value: cases,
            icon: <FaFolderOpen />,
            color: "primary",
            route: "/casos"
        },
        {
            title: "Personas",
            value: people,
            icon: <FaUsers />,
            color: "success",
            route: "/personas"
        },
        {
            title: "Documentos",
            value: documents,
            icon: <FaFileAlt />,
            color: "warning",
            route: "/documentos"
        },
        {
            title: "Alertas",
            value: alerts,
            icon: <FaBell />,
            color: "danger",
            route: "/alertas"
        },
        {
            title: "Casos activos",
            value: activeCases,
            icon: <FaPlayCircle />,
            color: "info",
            route: "/casos"
        },
        {
            title: "Casos cerrados",
            value: closedCases,
            icon: <FaCheckCircle />,
            color: "success",
            route: "/casos"
        },
        {
            title: "Prioridad alta",
            value: highPriorityCases,
            icon: <FaExclamationTriangle />,
            color: "danger",
            route: "/casos"
        }
    ];
    //----------------------------------------------------------
    // Vista.
    //----------------------------------------------------------
    return (
        <section className="kpi-grid">
            {cards.map(card => (
                <KPICard
                    key={card.title}
                    {...card}
                />
            ))}
        </section>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default KPICards;