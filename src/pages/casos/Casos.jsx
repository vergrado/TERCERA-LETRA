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
// • Compartir CaseContext.
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
import { CaseProvider } from "../../contexts/CaseContext";
import CasesHeader from "../../components/casos/CasesHeader";
import CaseFilters from "../../components/casos/CaseFilters";
import CasesTable from "../../components/casos/CasesTable";
import "../../styles/cases/cases.css";
// ============================================================
// COMPONENTE
// ============================================================
const Casos = () => {
    //----------------------------------------------------------
    // Navegación.
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Ir al formulario.
    //----------------------------------------------------------
    const handleNewCase = () => {
        navigate("/casos/nuevo");
    };
    //----------------------------------------------------------
    // Interfaz.
    //----------------------------------------------------------
    return (
        <CaseProvider>
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
                        <FaPlus className="me-2"/>
                        Nuevo Caso
                    </Button>
                </div>
                <CaseFilters />
                <CasesTable />
            </div>
        </CaseProvider>
    );
};
export default Casos;