// ============================================================
// AlertsDashboard.jsx
// ------------------------------------------------------------
// Resumen estadístico del módulo de Alertas.
// ============================================================
const AlertsDashboard = ({ alerts = [] }) => {
    const pendientes =
        alerts.filter(
            a => a.estado === "Pendiente"
        ).length;
    const enProceso =
        alerts.filter(
            a => a.estado === "En proceso"
        ).length;
    const completadas =
        alerts.filter(
            a => a.estado === "Completada"
        ).length;
    const vencidas =
        alerts.filter(
            a => a.estado === "Vencida"
        ).length;
    return (
        <div className="row mb-4">
            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-muted">
                            Total
                        </h6>
                        <h3>
                            {alerts.length}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-warning">
                            Pendientes
                        </h6>
                        <h3>
                            {pendientes}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-2">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-primary">
                            En proceso
                        </h6>
                        <h3>
                            {enProceso}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-2">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-success">
                            Completadas
                        </h6>
                        <h3>
                            {completadas}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="col-md-2">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h6 className="text-danger">
                            Vencidas
                        </h6>
                        <h3>
                            {vencidas}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AlertsDashboard;