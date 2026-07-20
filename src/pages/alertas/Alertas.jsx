// ============================================================
// Alertas.jsx
// ------------------------------------------------------------
// Página principal del módulo de Alertas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AlertsHeader from "../../components/alertas/AlertsHeader";
import AlertsContainer from "../../components/alertas/AlertsContainer";
import "../../styles/alerts/alerts.css";
const Alertas = () => {
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    return (
        <div className="alerts-page">
            <AlertsHeader />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                    Gestión de Alertas
                </h2>
                <Button
                    variant="primary"
                    onClick={() => navigate("/alertas/nueva")}
                >
                    <FaPlus className="me-2" />
                    Nueva Alerta
                </Button>
            </div>
            <AlertsContainer />
        </div>
    );
};
export default Alertas;