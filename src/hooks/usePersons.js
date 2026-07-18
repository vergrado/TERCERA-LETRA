// ============================================================
// usePersons.js
// ------------------------------------------------------------
// Hook encargado de administrar toda la lógica del módulo
// de Personas.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Obtener todas las personas.
// • Obtener una persona por ID.
// • Crear personas.
// • Actualizar personas.
// • Eliminar personas.
// • Buscar personas por RUT.
// • Administrar persona seleccionada.
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
    getPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson,
    getPersonByRut
} from "../services/personService";
// ============================================================
// HOOK
// ============================================================
const usePersons = () => {
    // ---------------------------------------------------------
    // Lista de personas
    // ---------------------------------------------------------
    const [persons, setPersons] = useState([]);
    // ---------------------------------------------------------
    // Persona seleccionada
    // ---------------------------------------------------------
    const [selectedPerson, setSelectedPerson] = useState(null);
    // ---------------------------------------------------------
    // Loading
    // ---------------------------------------------------------
    const [loading, setLoading] = useState(true);
    // ---------------------------------------------------------
    // Error
    // ---------------------------------------------------------
    const [error, setError] = useState(null);
    // ---------------------------------------------------------
    // Obtener todas las personas
    // ---------------------------------------------------------
    const loadPersons = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPersons();
            setPersons(data);
        } catch (err) {
            console.error(
                "Error al obtener las personas:",
                err
            );
            setError(
                err.message ||
                "No fue posible obtener las personas."
            );
        } finally {
            setLoading(false);
        }
    }, []);
    // ---------------------------------------------------------
    // Obtener una persona por ID
    // ---------------------------------------------------------
    const loadPerson = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            setSelectedPerson(null);
            const data = await getPersonById(id);
            setSelectedPerson(data);
            return data;
        } catch (err) {
            console.error(
                "Error al obtener la persona:",
                err
            );
            setSelectedPerson(null);
            setError(
                err.message ||
                "No fue posible obtener la persona."
            );
            return null;
        } finally {
            setLoading(false);
        }
    }, []);
    // ---------------------------------------------------------
    // Crear persona
    // ---------------------------------------------------------
    const addPerson = async (personData) => {
        try {
            setLoading(true);
            setError(null);
            const documentReference = await createPerson(
                personData
            );
            await loadPersons();
            return documentReference;
        } catch (err) {
            console.error(
                "Error al crear la persona:",
                err
            );
            setError(
                err.message ||
                "No fue posible crear la persona."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };
    // ---------------------------------------------------------
    // Editar persona
    // ---------------------------------------------------------
    const editPerson = async (
        id,
        personData
    ) => {
        try {
            setLoading(true);
            setError(null);
            await updatePerson(
                id,
                personData
            );
            const updatedPerson = {
                id,
                ...personData
            };
            setSelectedPerson(updatedPerson);
            await loadPersons();
            return updatedPerson;
        } catch (err) {
            console.error(
                "Error al actualizar la persona:",
                err
            );
            setError(
                err.message ||
                "No fue posible actualizar la persona."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };
    // ---------------------------------------------------------
    // Eliminar persona
    // ---------------------------------------------------------
    const removePerson = async (id) => {
        try {
            setLoading(true);
            setError(null);
            await deletePerson(id);
            setSelectedPerson(currentPerson => {
                if (currentPerson?.id === id) {
                    return null;
                }
                return currentPerson;
            });
            await loadPersons();
        } catch (err) {
            console.error(
                "Error al eliminar la persona:",
                err
            );
            setError(
                err.message ||
                "No fue posible eliminar la persona."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    };
    // ---------------------------------------------------------
    // Buscar persona por RUT
    // ---------------------------------------------------------
    const loadPersonByRut = async (rut) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getPersonByRut(rut);
            setPersons(data);
            return data;
        } catch (err) {
            console.error(
                "Error al buscar la persona por RUT:",
                err
            );
            setError(
                err.message ||
                "No fue posible buscar la persona."
            );
            return [];
        } finally {
            setLoading(false);
        }
    };
    // ---------------------------------------------------------
    // Limpiar persona seleccionada
    // ---------------------------------------------------------
    const clearSelectedPerson = useCallback(() => {
        setSelectedPerson(null);
    }, []);
    // ---------------------------------------------------------
    // Primera carga
    // ---------------------------------------------------------
    useEffect(() => {
        loadPersons();
    }, [loadPersons]);
    // ---------------------------------------------------------
    // Información compartida
    // ---------------------------------------------------------
    return {
        persons,
        selectedPerson,
        loading,
        error,
        loadPersons,
        loadPerson,
        addPerson,
        editPerson,
        removePerson,
        loadPersonByRut,
        clearSelectedPerson
    };
};
export default usePersons;