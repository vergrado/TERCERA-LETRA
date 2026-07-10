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
    getRecentActivity
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
                activity
            ] = await Promise.all([
                getTotalCases(),
                getTotalPeople(),
                getTotalDocuments(),
                getTotalAlerts(),
                getRecentCases(),
                getRecentActivity()
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
        loadDashboard
    };
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default useDashboard;