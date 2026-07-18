// ============================================================
// Personas.jsx
// ------------------------------------------------------------
// Página principal del módulo de Personas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PersonasHeader from "../components/personas/PersonasHeader";
import PersonasContainer from "../components/personas/PersonasContainer";
import "../styles/personas/personas.css";
// ============================================================
const Personas = () => {
    // ---------------------------------------------------------
    // Navegación
    // ---------------------------------------------------------
    const navigate = useNavigate();
    // ---------------------------------------------------------
    const handleNewPerson = () => {
        navigate("/personas/nuevo");
    };
    // ---------------------------------------------------------
    return (
        <div className="persons-page">
            <PersonasHeader />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                    Gestión de Personas
                </h2>
                <Button
                    variant="primary"
                    onClick={handleNewPerson}
                >
                    <FaPlus className="me-2" />
                    Nueva Persona
                </Button>
            </div>
            <PersonasContainer />
        </div>
    );
};
export default Personas;