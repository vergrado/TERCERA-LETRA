// ============================================================
// PersonContext.jsx
// ------------------------------------------------------------
// Contexto encargado de compartir toda la información del
// módulo de Personas.
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
import usePersons from "../hooks/usePersons";
// ============================================================
// CONTEXTO
// ============================================================
const PersonContext = createContext();
// ============================================================
// HOOK
// ============================================================
export const usePersonContext = () => {
    return useContext(PersonContext);
};
// ============================================================
// PROVIDER
// ============================================================
export const PersonProvider = ({ children }) => {
    //----------------------------------------------------------
    // Estado completo del módulo
    //----------------------------------------------------------
    const personState = usePersons();
    //----------------------------------------------------------
    // Compartir estado
    //----------------------------------------------------------
    return (
        <PersonContext.Provider
            value={personState}
        >
            {children}
        </PersonContext.Provider>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default PersonContext;