// ============================================================
// KPICard.jsx
// ------------------------------------------------------------
// Tarjeta reutilizable para mostrar un indicador (KPI)
// dentro del Dashboard.
//
// Plataforma:
// TERCERA LETRA
// ============================================================


// ============================================================
// IMPORTACIONES
// ============================================================
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard/kpi-card.css";
// ============================================================
// COMPONENTE
// ============================================================

const KPICard = ({
    title,
    value,
    icon,
    color,
    route
}) => {
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Ir al módulo
    //----------------------------------------------------------
    const handleClick = () => {
        navigate(route);
    };
    //----------------------------------------------------------
    // Vista
    //----------------------------------------------------------
    return (
        <Card
            className="kpi-card shadow-sm"
            onClick={handleClick}
        >
            <Card.Body>
                <div className="kpi-card-content">
                    <div>
                        <h6 className="kpi-title">
                            {title}
                        </h6>
                        <h2 className="kpi-value">
                            {value}
                        </h2>
                    </div>
                    <div
                        className={`kpi-icon bg-${color}`}
                    >
                        {icon}
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default KPICard;