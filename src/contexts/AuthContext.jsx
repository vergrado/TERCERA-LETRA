// ============================================================
// DashboardContext.jsx
// ------------------------------------------------------------
// Contexto encargado de compartir toda la información del
// Dashboard entre los componentes.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import {
    createContext,
    useContext
} from "react";
import useDashboard from "../hooks/useDashboard";
// ============================================================
// Contexto
// ============================================================
const DashboardContext = createContext();
// ============================================================
// Hook personalizado
// ============================================================
export const useDashboardContext = () => {
    return useContext(DashboardContext);
};
// ============================================================
// Provider
// ============================================================
export const DashboardProvider = ({ children }) => {
    //----------------------------------------------------------
    // Toda la información proviene del hook.
    //----------------------------------------------------------
    const dashboard = useDashboard();
    return (
        <DashboardContext.Provider value={dashboard}>
            {children}
        </DashboardContext.Provider>
    );
};