// ============================================================
// AlertsTable.jsx
// ------------------------------------------------------------
// Tabla principal del módulo de Alertas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { useState } from "react";
import {
    Alert,
    Badge,
    Spinner,
    Table
} from "react-bootstrap";
import { useAlertContext } from "../../contexts/AlertContext";
import { useToast } from "../../contexts/ToastContext";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import AlertActions from "./AlertActions";
// ============================================================
const AlertsTable = () => {
    //----------------------------------------------------------
    // Contexto de alertas
    //----------------------------------------------------------
    const {
        alerts = [],
        loading,
        error,
        removeAlert
    } = useAlertContext();
    //----------------------------------------------------------
    // Contexto de notificaciones
    //----------------------------------------------------------
    const { showToast } = useToast();
    //----------------------------------------------------------
    // Estados locales
    //----------------------------------------------------------
    const [
        alertToDelete,
        setAlertToDelete
    ] = useState(null);
    const [
        deleting,
        setDeleting
    ] = useState(false);
    //----------------------------------------------------------
    // Solicitar eliminación
    //----------------------------------------------------------
    const handleDeleteRequest = (alertItem) => {
        setAlertToDelete(alertItem);
    };
    //----------------------------------------------------------
    // Cerrar modal
    //----------------------------------------------------------
    const handleDeleteCancel = () => {
        if (deleting) {
            return;
        }
        setAlertToDelete(null);
    };
    //----------------------------------------------------------
    // Confirmar eliminación
    //----------------------------------------------------------
    const handleDeleteConfirm = async () => {
        if (!alertToDelete?.id) {
            return;
        }
        try {
            setDeleting(true);
            await removeAlert(alertToDelete.id);
            showToast(
                "Alerta eliminada",
                "La alerta fue eliminada correctamente.",
                "success"
            );
            setAlertToDelete(null);
        } catch (deleteError) {
            console.error(
                "Error al eliminar la alerta:",
                deleteError
            );
            showToast(
                "Error",
                "No fue posible eliminar la alerta.",
                "danger"
            );
        } finally {
            setDeleting(false);
        }
    };
    //----------------------------------------------------------
    // Normalizar textos
    //----------------------------------------------------------
    const normalizeText = (value) => {
        return String(value || "")
            .trim()
            .toLowerCase();
    };
    //----------------------------------------------------------
    // Formatear fecha
    //----------------------------------------------------------
    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Sin fecha";
        }
        /*
         * Timestamp de Firebase.
         */
        if (dateValue?.toDate) {
            return dateValue
                .toDate()
                .toLocaleDateString("es-CL");
        }
        /*
         * Fecha enviada como string o Date.
         */
        const parsedDate = new Date(dateValue);
        if (Number.isNaN(parsedDate.getTime())) {
            return "Sin fecha";
        }
        return parsedDate.toLocaleDateString("es-CL");
    };
    //----------------------------------------------------------
    // Obtener variante de prioridad
    //----------------------------------------------------------
    const getPriorityVariant = (priority) => {
        const normalizedPriority =
            normalizeText(priority);
        switch (normalizedPriority) {
            case "alta":
                return "danger";
            case "media":
                return "warning";
            case "baja":
                return "success";
            default:
                return "secondary";
        }
    };
    //----------------------------------------------------------
    // Obtener texto de prioridad
    //----------------------------------------------------------
    const getPriorityLabel = (priority) => {
        const normalizedPriority =
            normalizeText(priority);
        switch (normalizedPriority) {
            case "alta":
                return "Alta";
            case "media":
                return "Media";
            case "baja":
                return "Baja";
            default:
                return "Sin prioridad";
        }
    };
    //----------------------------------------------------------
    // Obtener variante del estado
    //----------------------------------------------------------
    const getStatusVariant = (status) => {
        const normalizedStatus =
            normalizeText(status);
        switch (normalizedStatus) {
            case "pendiente":
                return "warning";
            case "en proceso":
            case "en_proceso":
            case "en-proceso":
                return "primary";
            case "completada":
            case "completado":
                return "success";
            case "vencida":
            case "vencido":
                return "danger";
            default:
                return "secondary";
        }
    };
    //----------------------------------------------------------
    // Obtener texto del estado
    //----------------------------------------------------------
    const getStatusLabel = (status) => {
        const normalizedStatus =
            normalizeText(status);
        switch (normalizedStatus) {
            case "pendiente":
                return "Pendiente";
            case "en proceso":
            case "en_proceso":
            case "en-proceso":
                return "En proceso";
            case "completada":
            case "completado":
                return "Completada";
            case "vencida":
            case "vencido":
                return "Vencida";
            default:
                return status || "Sin estado";
        }
    };
    //----------------------------------------------------------
    // Cargando
    //----------------------------------------------------------
    if (loading && alerts.length === 0) {
        return (
            <div className="text-center py-5">
                <Spinner
                    animation="border"
                    role="status"
                />
                <p className="text-muted mt-3 mb-0">
                    Cargando alertas...
                </p>
            </div>
        );
    }
    //----------------------------------------------------------
    // Error
    //----------------------------------------------------------
    if (error && alerts.length === 0) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        );
    }
    //----------------------------------------------------------
    // Sin alertas
    //----------------------------------------------------------
    if (alerts.length === 0) {
        return (
            <div className="card shadow-sm border-0">
                <div className="card-body text-center py-5">
                    <h5 className="fw-bold">
                        No hay alertas registradas
                    </h5>
                    <p className="text-muted mb-0">
                        Presiona “Nueva Alerta” para agregar
                        la primera alerta.
                    </p>
                </div>
            </div>
        );
    }
    //----------------------------------------------------------
    // Tabla
    //----------------------------------------------------------
    return (
        <>
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <Table
                            hover
                            responsive
                            className="align-middle mb-0"
                        >
                            <thead className="table-light">
                                <tr>
                                    <th>Alerta</th>
                                    <th>Prioridad</th>
                                    <th>Estado</th>
                                    <th>Persona</th>
                                    <th>Caso</th>
                                    <th>Fecha de vencimiento</th>
                                    <th className="text-center">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {alerts.map((alertItem) => (
                                    <tr key={alertItem.id}>
                                        <td>
                                            <div className="fw-semibold">
                                                {alertItem.titulo ||
                                                    "Sin título"}
                                            </div>
                                            {alertItem.descripcion && (
                                                <small className="text-muted d-block">
                                                    {alertItem.descripcion}
                                                </small>
                                            )}
                                        </td>
                                        <td>
                                            <Badge
                                                bg={getPriorityVariant(
                                                    alertItem.prioridad
                                                )}
                                                text={
                                                    normalizeText(
                                                        alertItem.prioridad
                                                    ) === "media"
                                                        ? "dark"
                                                        : undefined
                                                }
                                                pill
                                            >
                                                {getPriorityLabel(
                                                    alertItem.prioridad
                                                )}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge
                                                bg={getStatusVariant(
                                                    alertItem.estado
                                                )}
                                                text={
                                                    normalizeText(
                                                        alertItem.estado
                                                    ) === "pendiente"
                                                        ? "dark"
                                                        : undefined
                                                }
                                                pill
                                            >
                                                {getStatusLabel(
                                                    alertItem.estado
                                                )}
                                            </Badge>
                                        </td>
                                        <td>
                                            {alertItem.personaId ? (
                                                <span>
                                                    {alertItem.personaNombre ||
                                                        "Persona asociada"}
                                                </span>
                                            ) : (
                                                <span className="text-muted">
                                                    Sin persona
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {alertItem.casoId ? (
                                                <span>
                                                    {alertItem.casoTitulo ||
                                                        "Caso asociado"}
                                                </span>
                                            ) : (
                                                <span className="text-muted">
                                                    Sin caso
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {formatDate(
                                                alertItem.fechaVencimiento
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <AlertActions
                                                alertItem={alertItem}
                                                onDelete={
                                                    handleDeleteRequest
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <ConfirmDeleteModal
                show={Boolean(alertToDelete)}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
                title="Eliminar alerta"
                message={
                    alertToDelete
                        ? `¿Estás seguro de eliminar la alerta "${alertToDelete.titulo || "Sin título"}"?`
                        : ""
                }
            />
        </>
    );
};
export default AlertsTable;