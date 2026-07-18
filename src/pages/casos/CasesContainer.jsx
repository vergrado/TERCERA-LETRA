// ============================================================
// CasesContainer.jsx
// ------------------------------------------------------------
// Contenedor principal del módulo de Casos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================

import { useCaseContext } from "../../contexts/CaseContext";

import CasesDashboard from "./CasesDashboard";
import CasesTable from "./CasesTable";
const CasesContainer = () => {
    //----------------------------------------------------------
    // Contexto
    //----------------------------------------------------------
    const { cases } = useCaseContext();
    //----------------------------------------------------------
    return (
        <>
            <CasesDashboard
                cases={cases}
            />
            <CasesTable />
        </>
    );
};
export default CasesContainer;