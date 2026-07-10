// ============================================================
// KPICards.jsx
// ------------------------------------------------------------
// Contenedor de indicadores del Dashboard.
//
// Plataforma:
// TERCERA LETRA
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
const KPICards = () => {
    //----------------------------------------------------------
    // Información del Dashboard.
    //----------------------------------------------------------
    const {
        kpis,
        loading
    } = useDashboardContext();
    //----------------------------------------------------------
    // Configuración.
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
    // Loading.
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
                        {...card}
                    />
                ))
            }
        </section>
    );
};
export default KPICards;

