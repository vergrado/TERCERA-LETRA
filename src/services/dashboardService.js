// ============================================================
// dashboardService.js
// ------------------------------------------------------------
// Servicio encargado de obtener toda la información necesaria
// para el Dashboard.
//
// Ningún componente del Dashboard consultará Firestore
// directamente.
//
// Plataforma:
// TERCERA LETRA
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import {
    collection,
    getCountFromServer,
    getDocs,
    query,
    orderBy,
    limit
} from "firebase/firestore";
import { db } from "../firebase";
// ============================================================
// TOTAL DE CASOS
// ============================================================
export const getTotalCases = async () => {
    const snapshot = await getCountFromServer(
        collection(db, "casos")
    );
    return snapshot.data().count;
};
// ============================================================
// TOTAL DE PERSONAS
// ============================================================
export const getTotalPeople = async () => {
    const snapshot = await getCountFromServer(
        collection(db, "personas")
    );
    return snapshot.data().count;
};
// ============================================================
// TOTAL DE DOCUMENTOS
// ============================================================
export const getTotalDocuments = async () => {
    const snapshot = await getCountFromServer(
        collection(db, "documentos")
    );
    return snapshot.data().count;
};
// ============================================================
// TOTAL DE ALERTAS
// ============================================================
export const getTotalAlerts = async () => {
    const snapshot = await getCountFromServer(
        collection(db, "alertas")
    );
    return snapshot.data().count;
};
// ============================================================
// ÚLTIMOS CASOS
// ============================================================
export const getRecentCases = async () => {
    const q = query(
        collection(db, "casos"),
        orderBy("fechaCreacion", "desc"),
        limit(5)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};
// ============================================================
// ACTIVIDAD RECIENTE
// ============================================================
export const getRecentActivity = async () => {
    const q = query(
        collection(db, "actividad"),
        orderBy("fecha", "desc"),
        limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};