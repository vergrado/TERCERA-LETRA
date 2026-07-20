// ============================================================
// AlertsDashboard.jsx
// ------------------------------------------------------------
// Resumen estadístico e inteligente del módulo de Alertas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Card from "react-bootstrap/Card";
import {
    Bell,
    CheckCircle,
    ClockHistory,
    ExclamationTriangle,
    HourglassSplit,
    CalendarEvent,
    CalendarWeek
} from "react-bootstrap-icons";
// ============================================================
// COMPONENTE
// ============================================================
const AlertsDashboard = ({
    alerts = []
}) => {
    //----------------------------------------------------------
    // Normalizar texto
    //----------------------------------------------------------
    const normalizeText = (value) => {
        return String(value || "")
            .trim()
            .toLowerCase();
    };
    //----------------------------------------------------------
    // Convertir fecha de Firestore, Date o string
    //----------------------------------------------------------
    const parseDate = (dateValue) => {
        if (!dateValue) {
            return null;
        }
        /*
         * Timestamp de Firebase.
         */
        if (dateValue?.toDate) {
            const firebaseDate =
                dateValue.toDate();
            firebaseDate.setHours(
                0,
                0,
                0,
                0
            );
            return firebaseDate;
        }
        /*
         * Fecha guardada como YYYY-MM-DD.
         *
         * Se separa manualmente para evitar que JavaScript
         * cambie el día debido al huso horario.
         */
        if (
            typeof dateValue === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
        ) {
            const [
                year,
                month,
                day
            ] = dateValue
                .split("-")
                .map(Number);

            return new Date(
                year,
                month - 1,
                day,
                0,
                0,
                0,
                0
            );
        }
        /*
         * Otros formatos válidos.
         */
        const parsedDate =
            new Date(dateValue);
        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return null;
        }
        parsedDate.setHours(
            0,
            0,
            0,
            0
        );
        return parsedDate;
    };
    //----------------------------------------------------------
    // Fecha actual
    //----------------------------------------------------------
    const today = new Date();
    today.setHours(
        0,
        0,
        0,
        0
    );
    //----------------------------------------------------------
    // Diferencia de días respecto de hoy
    //----------------------------------------------------------
    const getDaysDifference = (dateValue) => {
        const alertDate =
            parseDate(dateValue);
        if (!alertDate) {
            return null;
        }
        const millisecondsPerDay =
            1000 * 60 * 60 * 24;
        return Math.round(
            (
                alertDate.getTime() -
                today.getTime()
            ) /
            millisecondsPerDay
        );
    };
    //----------------------------------------------------------
    // Determinar si una alerta está completada
    //----------------------------------------------------------
    const isCompleted = (alertItem) => {
        const status =
            normalizeText(
                alertItem.estado
            );
        return (
            status === "completada" ||
            status === "completado"
        );
    };
    //----------------------------------------------------------
    // Conteos por estado
    //----------------------------------------------------------
    const pendientes =
        alerts.filter(
            (alertItem) =>
                normalizeText(
                    alertItem.estado
                ) === "pendiente"
        ).length;
    const enProceso =
        alerts.filter(
            (alertItem) => {
                const status =
                    normalizeText(
                        alertItem.estado
                    );
                return (
                    status === "en proceso" ||
                    status === "en_proceso" ||
                    status === "en-proceso"
                );
            }
        ).length;
    const completadas =
        alerts.filter(
            isCompleted
        ).length;
    //----------------------------------------------------------
    // Alertas que vencen hoy
    //----------------------------------------------------------
    const vencenHoy =
        alerts.filter(
            (alertItem) => {
                if (isCompleted(alertItem)) {
                    return false;
                }
                return (
                    getDaysDifference(
                        alertItem.fechaVencimiento
                    ) === 0
                );
            }
        ).length;
    //----------------------------------------------------------
    // Alertas próximas a vencer
    // Desde mañana hasta los próximos siete días
    //----------------------------------------------------------
    const proximasAVencer =
        alerts.filter(
            (alertItem) => {
                if (isCompleted(alertItem)) {
                    return false;
                }
                const daysDifference =
                    getDaysDifference(
                        alertItem.fechaVencimiento
                    );
                return (
                    daysDifference !== null &&
                    daysDifference >= 1 &&
                    daysDifference <= 7
                );
            }
        ).length;
    //----------------------------------------------------------
    // Alertas vencidas automáticamente por fecha
    //
    // También se consideran las que ya poseen estado Vencida.
    //----------------------------------------------------------
    const vencidas =
        alerts.filter(
            (alertItem) => {
                if (isCompleted(alertItem)) {
                    return false;
                }
                const status =
                    normalizeText(
                        alertItem.estado
                    );
                const daysDifference =
                    getDaysDifference(
                        alertItem.fechaVencimiento
                    );
                return (
                    status === "vencida" ||
                    status === "vencido" ||
                    (
                        daysDifference !== null &&
                        daysDifference < 0
                    )
                );
            }
        ).length;
    //----------------------------------------------------------
    // Tarjetas del dashboard
    //----------------------------------------------------------
    const dashboardCards = [
        {
            id: "total",
            title: "Total de alertas",
            value: alerts.length,
            icon: Bell,
            textClass: "text-primary",
            borderClass: "border-primary"
        },
        {
            id: "pending",
            title: "Pendientes",
            value: pendientes,
            icon: HourglassSplit,
            textClass: "text-warning",
            borderClass: "border-warning"
        },
        {
            id: "progress",
            title: "En proceso",
            value: enProceso,
            icon: ClockHistory,
            textClass: "text-info",
            borderClass: "border-info"
        },
        {
            id: "today",
            title: "Vencen hoy",
            value: vencenHoy,
            icon: CalendarEvent,
            textClass: "text-warning",
            borderClass: "border-warning"
        },
        {
            id: "upcoming",
            title: "Próximos 7 días",
            value: proximasAVencer,
            icon: CalendarWeek,
            textClass: "text-primary",
            borderClass: "border-primary"
        },
        {
            id: "overdue",
            title: "Vencidas",
            value: vencidas,
            icon: ExclamationTriangle,
            textClass: "text-danger",
            borderClass: "border-danger"
        },
        {
            id: "completed",
            title: "Completadas",
            value: completadas,
            icon: CheckCircle,
            textClass: "text-success",
            borderClass: "border-success"
        }
    ];
    //----------------------------------------------------------
    // Render
    //----------------------------------------------------------
    return (
        <div
            className="
                row
                row-cols-1
                row-cols-sm-2
                row-cols-lg-4
                g-3
                mb-4
            "
        >
            {dashboardCards.map(
                (dashboardCard) => {
                    const Icon =
                        dashboardCard.icon;
                    return (
                        <div
                            className="col"
                            key={dashboardCard.id}
                        >
                            <Card
                                className={`
                                    h-100
                                    shadow-sm
                                    border-0
                                    border-start
                                    border-4
                                    ${dashboardCard.borderClass}
                                `}
                            >
                                <Card.Body
                                    className="
                                        d-flex
                                        align-items-center
                                        justify-content-between
                                        gap-3
                                    "
                                >
                                    <div>
                                        <Card.Text
                                            className="
                                                text-muted
                                                small
                                                fw-semibold
                                                text-uppercase
                                                mb-1
                                            "
                                        >
                                            {dashboardCard.title}
                                        </Card.Text>
                                        <div
                                            className={`
                                                display-6
                                                fw-bold
                                                lh-1
                                                ${dashboardCard.textClass}
                                            `}
                                        >
                                            {dashboardCard.value}
                                        </div>
                                    </div>
                                    <div
                                        className={`
                                            fs-2
                                            flex-shrink-0
                                            ${dashboardCard.textClass}
                                        `}
                                    >
                                        <Icon />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                }
            )}
        </div>
    );
};
export default AlertsDashboard;