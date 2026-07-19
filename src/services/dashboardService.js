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
// ============================================================
// ESTADÍSTICAS GENERALES DE CASOS
// ============================================================
export const getCaseStatistics = async () => {
    try {
        const snapshot = await getDocs(
            collection(db, "casos")
        );

        const cases = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const normalizeValue = value =>
            String(value ?? "")
                .trim()
                .toLowerCase();

        const closedStatuses = [
            "cerrado",
            "cerrada",
            "finalizado",
            "finalizada",
            "completado",
            "completada"
        ];

        const casesByStatus = {};
        const casesByPriority = {};
        const casesByType = {};

        let activeCases = 0;
        let closedCases = 0;
        let highPriorityCases = 0;

        cases.forEach(item => {
            //----------------------------------------------
            // Estado.
            //----------------------------------------------
            const status =
                item.estado?.trim() ||
                "Sin estado";

            casesByStatus[status] =
                (casesByStatus[status] || 0) + 1;

            //----------------------------------------------
            // Prioridad.
            //----------------------------------------------
            const priority =
                item.prioridad?.trim() ||
                "Sin prioridad";

            casesByPriority[priority] =
                (casesByPriority[priority] || 0) + 1;

            //----------------------------------------------
            // Tipo.
            //----------------------------------------------
            const type =
                item.tipo?.trim() ||
                "Sin tipo";

            casesByType[type] =
                (casesByType[type] || 0) + 1;

            //----------------------------------------------
            // Activos y cerrados.
            //----------------------------------------------
            const normalizedStatus =
                normalizeValue(item.estado);

            if (
                closedStatuses.includes(
                    normalizedStatus
                )
            ) {
                closedCases += 1;
            }
            else {
                activeCases += 1;
            }

            //----------------------------------------------
            // Alta prioridad.
            //----------------------------------------------
            if (
                normalizeValue(item.prioridad) ===
                "alta"
            ) {
                highPriorityCases += 1;
            }
        });

        return {
            activeCases,
            closedCases,
            highPriorityCases,

            casesByStatus: Object.entries(
                casesByStatus
            ).map(([name, value]) => ({
                name,
                value
            })),

            casesByPriority: Object.entries(
                casesByPriority
            ).map(([name, value]) => ({
                name,
                value
            })),

            casesByType: Object.entries(
                casesByType
            ).map(([name, value]) => ({
                name,
                value
            }))
        };
    }
    catch (error) {
        console.error(error);

        return {
            activeCases: 0,
            closedCases: 0,
            highPriorityCases: 0,
            casesByStatus: [],
            casesByPriority: [],
            casesByType: []
        };
    }
};
