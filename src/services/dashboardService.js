// ============================================================
// dashboardService.js
// ------------------------------------------------------------
// Servicio encargado de obtener toda la información necesaria
// para el Dashboard.
//
// Ningún componente del Dashboard consulta Firestore
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

    try {

        const snapshot = await getCountFromServer(

            collection(db, "casos")

        );

        return snapshot.data().count;

    }

    catch (error) {

        console.error(error);

        return 0;

    }

};


// ============================================================
// TOTAL DE PERSONAS
// ============================================================

export const getTotalPeople = async () => {

    try {

        const snapshot = await getCountFromServer(

            collection(db, "personas")

        );

        return snapshot.data().count;

    }

    catch (error) {

        console.error(error);

        return 0;

    }

};


// ============================================================
// TOTAL DE DOCUMENTOS
// ============================================================

export const getTotalDocuments = async () => {

    try {

        const snapshot = await getCountFromServer(

            collection(db, "documentos")

        );

        return snapshot.data().count;

    }

    catch (error) {

        console.error(error);

        return 0;

    }

};


// ============================================================
// TOTAL DE ALERTAS
// ============================================================

export const getTotalAlerts = async () => {

    try {

        const snapshot = await getCountFromServer(

            collection(db, "alertas")

        );

        return snapshot.data().count;

    }

    catch (error) {

        console.error(error);

        return 0;

    }

};


// ============================================================
// ÚLTIMOS CASOS
// ============================================================

export const getRecentCases = async () => {

    try {

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

    }

    catch (error) {

        console.error(error);

        return [];

    }

};


// ============================================================
// ACTIVIDAD RECIENTE
// ============================================================

export const getRecentActivity = async () => {

    try {

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

    }

    catch (error) {

        console.error(error);

        return [];

    }

};