import DashboardHeader from "../components/dashboard/DashboardHeader";
import KPICards from "../components/dashboard/KPICards";
import QuickActions from "../components/dashboard/QuickActions";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import RecentCases from "../components/dashboard/RecentCases";
import RecentActivity from "../components/dashboard/RecentActivity";
import useDashboard from "../hooks/useDashboard";
const Dashboard = () => {
    const {
        loading,
        error,
        kpis,
        recentCases,
        recentActivity,
        caseStatistics,
        loadDashboard
    } = useDashboard();
    if (loading) {
        return (
            <div className="py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Cargando Dashboard...
                    </span>
                </div>

                <p className="text-muted mt-3 mb-0">
                    Cargando información del Dashboard...
                </p>
            </div>
        );
    }
    if (error) {
        return (
            <div
                className="alert alert-danger"
                role="alert"
            >
                <h5 className="alert-heading">
                    No se pudo cargar el Dashboard
                </h5>
                <p>
                    Ocurrió un problema al obtener la información.
                </p>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={loadDashboard}
                >
                    Intentar nuevamente
                </button>
            </div>
        );
    }
    return (
        <>
            <DashboardHeader
                onRefresh={loadDashboard}
            />
            <KPICards
                kpis={kpis}
                caseStatistics={caseStatistics}
            />
            <QuickActions />
            <DashboardCharts
                caseStatistics={caseStatistics}
            />
            <RecentCases
                recentCases={recentCases}
            />
            <RecentActivity
                recentActivity={recentActivity}
            />
        </>
    );
};
export default Dashboard;