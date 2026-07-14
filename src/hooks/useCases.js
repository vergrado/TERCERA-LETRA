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
// • Obtener un caso por ID.
// • Crear casos.
// • Actualizar casos.
// • Eliminar casos.
// • Obtener casos por usuario.
// • Obtener casos por estado.
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
    getCaseById,
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
    // Estado de los casos
    //----------------------------------------------------------
    const [cases, setCases] = useState([]);
    //----------------------------------------------------------
    // Estado de carga
    //----------------------------------------------------------
    const [loading, setLoading] = useState(true);
    //----------------------------------------------------------
    // Estado de error
    //----------------------------------------------------------
    const [error, setError] =useState(null);
    //----------------------------------------------------------
    // Cargar todos los casos
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
    // Obtener un caso por ID
    //----------------------------------------------------------
    const loadCase = async (id) => {
        try {
            return await getCaseById(id);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    };
    //----------------------------------------------------------
    // Crear caso
    //----------------------------------------------------------
    const addCase = async (caseData) => {
        await createCase(caseData);
        await loadCases();
    };
    //----------------------------------------------------------
    // Editar caso
    //----------------------------------------------------------
    const editCase = async (id, caseData) => {
        await updateCase(id, caseData);
        await loadCases();
    };
    //----------------------------------------------------------
    // Eliminar caso
    //----------------------------------------------------------
    const removeCase = async (id) => {
        await deleteCase(id);
        await loadCases();
    };
    //----------------------------------------------------------
    // Obtener casos por usuario
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
    // Obtener casos por estado
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
    // Primera carga
    //----------------------------------------------------------
    useEffect(() => {
        loadCases();
    }, [loadCases]);
    //----------------------------------------------------------
    // Información compartida
    //----------------------------------------------------------
    return {
        cases,
        loading,
        error,
        loadCases,
        loadCase,
        addCase,
        editCase,
        removeCase,
        loadCasesByUser,
        loadCasesByStatus
    };
};

export default useCases;