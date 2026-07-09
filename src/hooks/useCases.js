// ============================================================
// useCases.js
// ------------------------------------------------------------
// Hook encargado de administrar toda la lógica del módulo
// de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Obtener todos los casos.
// • Crear casos.
// • Actualizar casos.
// • Eliminar casos.
// • Obtener casos por usuario.
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
    getCases,
    createCase,
    updateCase,
    deleteCase,
    getCasesByUser,
    getCasesByStatus
} from "../services/caseService";
// ============================================================
// HOOK
// ============================================================
const useCases = () => {
    //----------------------------------------------------------
    // Estado de los casos.
    //----------------------------------------------------------
    const [cases, setCases] = useState([]);
    //----------------------------------------------------------
    // Estado de carga.
    //----------------------------------------------------------
    const [loading, setLoading] = useState(true);
    //----------------------------------------------------------
    // Estado de error.
    //----------------------------------------------------------
    const [error, setError] = useState(null);
    //----------------------------------------------------------
    // Cargar todos los casos.
    //----------------------------------------------------------
    const loadCases = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getCases();
            setCases(data);
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
    // Crear un caso.
    //----------------------------------------------------------
    const addCase = async (caseData) => {
        await createCase(caseData);
        await loadCases();
    };
    //----------------------------------------------------------
    // Actualizar un caso.
    //----------------------------------------------------------
    const editCase = async (id, caseData) => {
        await updateCase(id, caseData);
        await loadCases();
    };
    //----------------------------------------------------------
    // Eliminar un caso.
    //----------------------------------------------------------
    const removeCase = async (id) => {
        await deleteCase(id);
        await loadCases();
    };
    //----------------------------------------------------------
    // Obtener casos por usuario.
    //----------------------------------------------------------
    const loadCasesByUser = async (uid) => {
        try {
            setLoading(true);
            const data = await getCasesByUser(uid);
            setCases(data);
        }
        catch (err) {
            console.error(err);
            setError(err);
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Obtener casos por estado.
    //----------------------------------------------------------
    const loadCasesByStatus = async (status) => {
        try {
            setLoading(true);
            const data = await getCasesByStatus(status);
            setCases(data);
        }
        catch (err) {
            console.error(err);
            setError(err);
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Primera carga.
    //----------------------------------------------------------
    useEffect(() => {
        loadCases();
    }, [loadCases]);
    //----------------------------------------------------------
    // Información compartida.
    //----------------------------------------------------------
    return {
        cases,
        loading,
        error,
        loadCases,
        addCase,
        editCase,
        removeCase,
        loadCasesByUser,
        loadCasesByStatus
    };
};
export default useCases;