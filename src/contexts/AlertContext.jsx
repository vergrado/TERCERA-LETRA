// ============================================================
// AlertContext.jsx
// ------------------------------------------------------------
// Contexto global del módulo de Alertas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import {
    createContext,
    useContext
} from "react";
import useAlerts from "../hooks/useAlerts";
const AlertContext = createContext();
export const AlertProvider = ({ children }) => {
    const alerts = useAlerts();
    return (
        <AlertContext.Provider value={alerts}>
            {children}
        </AlertContext.Provider>
    );
};
export const useAlertContext = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error(
            "useAlertContext debe utilizarse dentro de AlertProvider."
        );
    }
    return context;
};
export default AlertContext;