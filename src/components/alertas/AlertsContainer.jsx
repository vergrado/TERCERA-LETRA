import { useAlertContext } from "../../contexts/AlertContext";
import AlertsDashboard from "./AlertsDashboard";
import AlertsTable from "./AlertsTable";
const AlertsContainer = () => {
    const { alerts = [] } = useAlertContext();
    return (
        <>
            <AlertsDashboard alerts={alerts} />
            <AlertsTable />
        </>
    );
};
export default AlertsContainer;