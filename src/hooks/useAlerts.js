// ============================================================
// useAlerts.js
// ------------------------------------------------------------
// Hook principal del módulo de Alertas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { useCallback, useEffect, useState } from "react";
import {
    createAlert,
    deleteAlert,
    getAlertById,
    getAlerts,
    updateAlert
} from "../services/alertService";
const useAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    // ========================================================
    // CARGAR ALERTAS
    // ========================================================
    const refreshAlerts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getAlerts();
            setAlerts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);
    // ========================================================
    // CREAR
    // ========================================================
    const addAlert = async (alertData) => {
        setSaving(true);
        try {
            const newAlert = await createAlert(alertData);
            setAlerts(previous => [
                newAlert,
                ...previous
            ]);
            return newAlert;
        } finally {
            setSaving(false);
        }
    };
    // ========================================================
    // EDITAR
    // ========================================================
    const editAlert = async (id, alertData) => {
        setSaving(true);
        try {
            const updated = await updateAlert(
                id,
                alertData
            );
            setAlerts(previous =>
                previous.map(item =>
                    item.id === id
                        ? {
                              ...item,
                              ...updated
                          }
                        : item
                )
            );
            return updated;
        } finally {
            setSaving(false);
        }
    };
    // ========================================================
    // ELIMINAR
    // ========================================================
    const removeAlert = async (id) => {
        setSaving(true);
        try {
            await deleteAlert(id);
            setAlerts(previous =>
                previous.filter(item =>
                    item.id !== id
                )
            );
        } finally {
            setSaving(false);
        }
    };
    // ========================================================
    // OBTENER POR ID
    // ========================================================
    const getAlert = async (id) => {
        return await getAlertById(id);
    };
    // ========================================================
    // INICIO
    // ========================================================
    useEffect(() => {
        refreshAlerts();
    }, [refreshAlerts]);
    return {
        alerts,
        loading,
        saving,
        refreshAlerts,
        addAlert,
        editAlert,
        removeAlert,
        getAlert
    };
};
export default useAlerts;