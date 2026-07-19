// ============================================================
// useDocuments.js
// ------------------------------------------------------------
// Hook encargado de administrar toda la lógica del módulo
// de Documentos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Obtener todos los documentos.
// • Obtener un documento por ID.
// • Crear documentos.
// • Actualizar documentos.
// • Eliminar documentos.
// • Obtener documentos por caso.
// • Obtener documentos por persona.
// • Administrar loading.
// • Administrar errores.
//
// ============================================================
// ============================================================
// IMPORTACIONES
// ============================================================
import {
    useState,
    useEffect,
    useCallback
} from "react";
import {
    getDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocumentsByCase,
    getDocumentsByPerson
} from "../services/documentService";
// ============================================================
// HOOK
// ============================================================
const useDocuments = () => {
    //----------------------------------------------------------
    // Estado de los documentos
    //----------------------------------------------------------
    const [documents, setDocuments] = useState([]);
    //----------------------------------------------------------
    // Documento seleccionado
    //----------------------------------------------------------
    const [selectedDocument, setSelectedDocument] = useState(null);
    //----------------------------------------------------------
    // Estado de carga
    //----------------------------------------------------------
    const [loading, setLoading] = useState(true);
    //----------------------------------------------------------
    // Estado de error
    //----------------------------------------------------------
    const [error, setError] = useState(null);
    //----------------------------------------------------------
    // Cargar todos los documentos
    //----------------------------------------------------------
    const loadDocuments = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getDocuments();

            setDocuments(data);
            setError(null);
        }
        catch (err) {
            console.error(err);
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }, []);
    //----------------------------------------------------------
    // Obtener documento por ID
    //----------------------------------------------------------
    const loadDocument = async id => {
        try {
            const document = await getDocumentById(id);

            setSelectedDocument(document);

            return document;
        }
        catch (err) {
            console.error(err);
            setError(err);
            throw err;
        }
    };
    //----------------------------------------------------------
    // Crear documento
    //----------------------------------------------------------
    const addDocument = async documentData => {
        try {
            setLoading(true);

            const documentId = await createDocument(
                documentData
            );

            await loadDocuments();

            return documentId;
        }
        catch (err) {
            console.error(err);
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Editar documento
    //----------------------------------------------------------
    const editDocument = async (
        id,
        documentData
    ) => {
        try {
            setLoading(true);

            await updateDocument(
                id,
                documentData
            );

            await loadDocuments();
        }
        catch (err) {
            console.error(err);
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Eliminar documento
    //----------------------------------------------------------
    const removeDocument = async id => {
        try {
            setLoading(true);
            await deleteDocument(id);
            setSelectedDocument(null);
            await loadDocuments();
        }
        catch (err) {
            console.error(err);
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Obtener documentos por caso
    //----------------------------------------------------------
    const loadDocumentsByCase = async caseId => {
        try {
            setLoading(true);
            const data = await getDocumentsByCase(
                caseId
            );
            setDocuments(data);
            setError(null);
            return data;
        }
        catch (err) {
            console.error(err);
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Obtener documentos por persona
    //----------------------------------------------------------
    const loadDocumentsByPerson = async personId => {
        try {
            setLoading(true);

            const data = await getDocumentsByPerson(
                personId
            );

            setDocuments(data);
            setError(null);

            return data;
        }
        catch (err) {
            console.error(err);
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Primera carga
    //----------------------------------------------------------
    useEffect(() => {
        loadDocuments();
    }, [loadDocuments]);
    //----------------------------------------------------------
    // Información compartida
    //----------------------------------------------------------
    return {
        documents,
        selectedDocument,
        loading,
        error,
        setSelectedDocument,
        loadDocuments,
        loadDocument,
        addDocument,
        editDocument,
        removeDocument,
        loadDocumentsByCase,
        loadDocumentsByPerson
    };
};
export default useDocuments;