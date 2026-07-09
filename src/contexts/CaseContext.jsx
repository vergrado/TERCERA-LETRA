// ============================================================
// CaseContext.jsx
// ------------------------------------------------------------
// Contexto encargado de compartir toda la información del
// módulo de Casos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import {
    createContext,
    useContext
} from "react";
import useCases from "../hooks/useCases";
// ============================================================
// CONTEXTO
// ============================================================
const CaseContext = createContext();
// ============================================================
// HOOK PERSONALIZADO
// ============================================================
export const useCaseContext = () => {
    return useContext(CaseContext);
};
// ============================================================
// PROVIDER
// ============================================================
export const CaseProvider = ({ children }) => {
    //----------------------------------------------------------
    // Estado completo del módulo de Casos.
    //----------------------------------------------------------
    const caseState = useCases();
    //----------------------------------------------------------
    // Compartimos el estado.
    //----------------------------------------------------------
    return (
        <CaseContext.Provider value={caseState}>
            {children}
        </CaseContext.Provider>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default CaseContext;