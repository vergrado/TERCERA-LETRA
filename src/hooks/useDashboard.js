// ============================================================
// useDashboard.js
// ------------------------------------------------------------
// Hook encargado de administrar toda la información del
// Dashboard.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Obtener KPIs.
// • Obtener últimos casos.
// • Obtener actividad reciente.
// • Administrar loading.
// • Administrar errores.
// • Permitir recargar el Dashboard.
//
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import {
    useEffect,
    useState,
    useCallback
} from "react";

import {
    getTotalCases,
    getTotalPeople,
    getTotalDocuments,
    getTotalAlerts,
    getRecentCases,
    getRecentActivity,
    getCaseStatistics
} from "../services/dashboardService";
// ============================================================
// HOOK
// ============================================================
const useDashboard = () => {
    //----------------------------------------------------------
    // Estados.
    //----------------------------------------------------------
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [kpis, setKpis] = useState({
        cases: 0,
        people: 0,
        documents: 0,
        alerts: 0
    });
    const [recentCases, setRecentCases] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [caseStatistics, setCaseStatistics] = useState({
    activeCases: 0,
    closedCases: 0,
    highPriorityCases: 0,
    casesByStatus: [],
    casesByPriority: [],
    casesByType: []
});
    //const [casesByStatus, setCasesByStatus] = useState([]);
    //const [casesByPriority, setCasesByPriority] = useState([]);
   //const [casesByType, setCasesByType] = useState([]);
    //const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
    //----------------------------------------------------------
    // Cargar Dashboard.
    //----------------------------------------------------------
    const loadDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            //--------------------------------------------------
            // Todas las consultas se ejecutan en paralelo.
            //--------------------------------------------------
            const [
                totalCases,
                totalPeople,
                totalDocuments,
                totalAlerts,
                cases,
                activity,
                statistics
            ] = await Promise.all([
                getTotalCases(),
                getTotalPeople(),
                getTotalDocuments(),
                getTotalAlerts(),
                getRecentCases(),
                getRecentActivity(),
                getCaseStatistics()
            ]);
            //--------------------------------------------------
            // KPIs.
            //--------------------------------------------------
            setKpis({
                cases: totalCases,
                people: totalPeople,
                documents: totalDocuments,
                alerts: totalAlerts
            });
            //--------------------------------------------------
            // Información adicional.
            //--------------------------------------------------
            setRecentCases(cases);
            setRecentActivity(activity);
            setCaseStatistics(statistics);
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
    // Primera carga.
    //----------------------------------------------------------
    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);
    //----------------------------------------------------------
    // Información compartida.
    //----------------------------------------------------------
    return {
        loading,
        error,
        kpis,
        recentCases,
        recentActivity,
        caseStatistics,
        loadDashboard
    };
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default useDashboard;