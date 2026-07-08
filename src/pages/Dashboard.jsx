import DashboardHeader from "../components/dashboard/DashboardHeader";
import KPICards from "../components/dashboard/KPICards";
import QuickActions from "../components/dashboard/QuickActions";

const Dashboard = () => {
    return (
        <>
            <DashboardHeader />
            <KPICards />
            <QuickActions />
        </>
    );
};
export default Dashboard;