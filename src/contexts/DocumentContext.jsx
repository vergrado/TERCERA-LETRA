// ============================================================
// DocumentContext.jsx
// ------------------------------------------------------------
// Contexto encargado de compartir toda la información del
// módulo de Documentos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import {
    createContext,
    useContext
} from "react";
import useDocuments from "../hooks/useDocuments";
// ============================================================
// CONTEXTO
// ============================================================
const DocumentContext = createContext(undefined);
// ============================================================
// HOOK PERSONALIZADO
// ============================================================
export const useDocumentContext = () => {
    const context = useContext(DocumentContext);
    if (context === undefined) {
        throw new Error(
            "useDocumentContext debe utilizarse dentro de un DocumentProvider."
        );
    }
    return context;
};
// ============================================================
// PROVIDER
// ============================================================
export const DocumentProvider = ({ children }) => {
    const documentState = useDocuments();

    return (
        <DocumentContext.Provider value={documentState}>
            {children}
        </DocumentContext.Provider>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default DocumentContext;