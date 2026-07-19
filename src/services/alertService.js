// ============================================================
// alertService.js
// ------------------------------------------------------------
// Servicio de alertas.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Crear alertas.
// • Consultar alertas.
// • Actualizar alertas.
// • Eliminar alertas.
// • Consultar alertas asociadas a casos.
// • Consultar alertas asociadas a personas.
// ============================================================
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from "firebase/firestore";
import db from "../firebase/firestore";
// ============================================================
// COLECCIÓN
// ============================================================
const alertsCollection = collection(db, "alertas");
// ============================================================
// CREAR ALERTA
// ============================================================
export const createAlert = async (alertData) => {
    try {
        const newAlert = {
            ...alertData,
            titulo: alertData.titulo?.trim() ?? "",
            descripcion: alertData.descripcion?.trim() ?? "",
            tipo: alertData.tipo ?? "",
            prioridad: alertData.prioridad ?? "Media",
            estado: alertData.estado ?? "Pendiente",
            fechaVencimiento:
                alertData.fechaVencimiento ?? "",
            casoId:
                alertData.casoId ?? "",
            personaId:
                alertData.personaId ?? "",
            notificar:
                alertData.notificar ?? true,
            observaciones:
                alertData.observaciones?.trim() ?? "",
            fechaCreacion: serverTimestamp(),
            fechaActualizacion: serverTimestamp()
        };
        const alertReference = await addDoc(
            alertsCollection,
            newAlert
        );
        return {
            id: alertReference.id,
            ...newAlert
        };
    } catch (error) {
        console.error(
            "Error al crear la alerta:",
            error
        );
        throw error;
    }
};
// ============================================================
// OBTENER TODAS LAS ALERTAS
// ============================================================
export const getAlerts = async () => {
    try {
        const alertsQuery = query(
            alertsCollection,
            orderBy("fechaCreacion", "desc")
        );
        const snapshot = await getDocs(alertsQuery);
        return snapshot.docs.map((alertItem) => ({
            id: alertItem.id,
            ...alertItem.data()
        }));
    } catch (error) {
        console.error(
            "Error al obtener las alertas:",
            error
        );
        throw error;
    }
};
// ============================================================
// OBTENER ALERTA POR ID
// ============================================================
export const getAlertById = async (alertId) => {
    try {
        const alertReference = doc(
            db,
            "alertas",
            alertId
        );
        const snapshot = await getDoc(alertReference);
        if (!snapshot.exists()) {
            return null;
        }
        return {
            id: snapshot.id,
            ...snapshot.data()
        };
    } catch (error) {
        console.error(
            "Error al obtener la alerta:",
            error
        );
        throw error;
    }
};
// ============================================================
// ACTUALIZAR ALERTA
// ============================================================
export const updateAlert = async (
    alertId,
    alertData
) => {
    try {
        const alertReference = doc(
            db,
            "alertas",
            alertId
        );
        const updatedData = {
            ...alertData,
            titulo: alertData.titulo?.trim() ?? "",
            descripcion: alertData.descripcion?.trim() ?? "",
            tipo: alertData.tipo ?? "",
            prioridad: alertData.prioridad ?? "Media",
            estado: alertData.estado ?? "Pendiente",
            fechaVencimiento:
                alertData.fechaVencimiento ?? "",
            casoId:
                alertData.casoId ?? "",
            personaId:
                alertData.personaId ?? "",
            notificar:
                alertData.notificar ?? true,
            observaciones:
                alertData.observaciones?.trim() ?? "",
            fechaActualizacion: serverTimestamp()
        };
        await updateDoc(
            alertReference,
            updatedData
        );
        return {
            id: alertId,
            ...updatedData
        };
    } catch (error) {
        console.error(
            "Error al actualizar la alerta:",
            error
        );
        throw error;
    }
};
// ============================================================
// ELIMINAR ALERTA
// ============================================================
export const deleteAlert = async (alertId) => {
    try {
        const alertReference = doc(
            db,
            "alertas",
            alertId
        );
        await deleteDoc(alertReference);
        return alertId;
    } catch (error) {
        console.error(
            "Error al eliminar la alerta:",
            error
        );
        throw error;
    }
};
// ============================================================
// OBTENER ALERTAS POR CASO
// ============================================================
export const getAlertsByCase = async (caseId) => {
    try {
        const alertsQuery = query(
            alertsCollection,
            where("casoId", "==", caseId)
        );
        const snapshot = await getDocs(alertsQuery);
        return snapshot.docs.map((alertItem) => ({
            id: alertItem.id,
            ...alertItem.data()
        }));
    } catch (error) {
        console.error(
            "Error al obtener alertas del caso:",
            error
        );
        throw error;
    }
};
// ============================================================
// OBTENER ALERTAS POR PERSONA
// ============================================================
export const getAlertsByPerson = async (personId) => {
    try {
        const alertsQuery = query(
            alertsCollection,
            where("personaId", "==", personId)
        );
        const snapshot = await getDocs(alertsQuery);
        return snapshot.docs.map((alertItem) => ({
            id: alertItem.id,
            ...alertItem.data()
        }));
    } catch (error) {
        console.error(
            "Error al obtener alertas de la persona:",
            error
        );
        throw error;
    }
};