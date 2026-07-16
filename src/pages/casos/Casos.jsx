// ============================================================
// Casos.jsx
// ------------------------------------------------------------
// Página principal del módulo de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Mostrar encabezado.
// • Mostrar filtros.
// • Mostrar listado.
// • Preparar navegación hacia Nuevo Caso.
//
// ============================================================
// ============================================================
// IMPORTACIONES
// ============================================================
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CasesHeader from "../../components/casos/CasesHeader";
//import CaseFilters from "../../components/casos/CaseFilters";
import CasesTable from "../../components/casos/CasesTable";
import "../../styles/cases/cases.css";
// ============================================================
// COMPONENTE
// ============================================================
const Casos = () => {
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Nuevo caso
    //----------------------------------------------------------
    const handleNewCase = () => {
        navigate("/casos/nuevo");
    };
    //----------------------------------------------------------
    // Interfaz
    //----------------------------------------------------------
    return (
        <div className="cases-page">
            <CasesHeader />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                    Gestión de Casos
                </h2>
                <Button
                    variant="primary"
                    onClick={handleNewCase}
                >
                    <FaPlus className="me-2" />
                    Nuevo Caso
                </Button>
            </div>
    
            <CasesTable />
        </div>
    );
};
export default Casos;