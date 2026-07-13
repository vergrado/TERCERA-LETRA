// ============================================================
// DashboardContext.jsx
// ------------------------------------------------------------
// Contexto encargado de compartir toda la información del
// Dashboard entre los componentes.
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
import useDashboard from "../hooks/useDashboard";
// ============================================================
// CONTEXTO
// ============================================================
const DashboardContext = createContext();
// ============================================================
// HOOK PERSONALIZADO
// ============================================================
export const useDashboardContext = () => {
    return useContext(DashboardContext);
};
// ============================================================
// PROVIDER
// ============================================================
export const DashboardProvider = ({ children }) => {
    //----------------------------------------------------------
    // Toda la información proviene del hook useDashboard.
    //----------------------------------------------------------
    const dashboard = useDashboard();
    //----------------------------------------------------------
    // Información compartida.
    //
    // El operador spread permite incorporar nuevas propiedades
    // al contexto sin modificar los componentes consumidores.
    //----------------------------------------------------------
    const value = {
        ...dashboard
    };
    //----------------------------------------------------------
    // Compartimos el contexto con todos los componentes hijos.
    //----------------------------------------------------------
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default DashboardContext;