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
        // Filtros
        //----------------------------------------------------------
        const [search, setSearch] = useState("");

        const [priorityFilter, setPriorityFilter] =
            useState("");

        const [statusFilter, setStatusFilter] =
            useState("");

        const [typeFilter, setTypeFilter] =
            useState("");

        const [sortBy, setSortBy] =
            useState("fecha");
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
    // Diferencia de días
    //----------------------------------------------------------
    const getDueStatus = (dateValue) => {
        if (!dateValue) {
            return {
                text: "Sin fecha",
                variant: "secondary"
            };
        }
        let dueDate;
        if (dateValue?.toDate) {
            dueDate = dateValue.toDate();
        } else {
            dueDate = new Date(dateValue);
        }
        if (Number.isNaN(dueDate.getTime())) {
            return {
                text: "Sin fecha",
                variant: "secondary"
            };
        }
        const today = new Date();
        today.setHours(0,0,0,0);
        dueDate.setHours(0,0,0,0);
        const diff =
            Math.round(
                (dueDate - today) /
                (1000*60*60*24)
            );
        if (diff < 0) {
            return {
                text: `Hace ${Math.abs(diff)} día${Math.abs(diff)>1?"s":""}`,
                variant: "danger"
            };
        }
        if (diff === 0) {
            return {
                text: "Hoy",
                variant: "warning"
            };
        }
        return {
            text: `En ${diff} día${diff>1?"s":""}`,
            variant: "success"
        };
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
    // Filtrar y ordenar
    //----------------------------------------------------------
    const filteredAlerts = [...alerts]
    .filter(alertItem => {
        const searchText =
            `${alertItem.titulo || ""}
            ${alertItem.descripcion || ""}
            ${alertItem.personaNombre || ""}
            ${alertItem.casoTitulo || ""}`
            .toLowerCase();
        if (
            search &&
            !searchText.includes(
                search.toLowerCase()
            )
        ) {
            return false;
        }
        if (
            priorityFilter &&
            alertItem.prioridad !== priorityFilter
        ) {
            return false;
        }
        if (
            statusFilter &&
            alertItem.estado !== statusFilter
        ) {
            return false;
        }
        if (
            typeFilter &&
            alertItem.tipo !== typeFilter
        ) {
            return false;
        }
        return true;
    })
    .sort((a,b)=>{
        switch(sortBy){
            case "titulo":
                return (a.titulo||"")
                    .localeCompare(
                        b.titulo||""
                    );
            case "prioridad":
                return (a.prioridad||"")
                    .localeCompare(
                        b.prioridad||""
                    );
            case "estado":
                return (a.estado||"")
                    .localeCompare(
                        b.estado||""
                    );
            default:
                return new Date(
                    a.fechaVencimiento
                ) -
                new Date(
                    b.fechaVencimiento
                );
        }
    });
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
                <div className="card shadow-sm border-0 mb-3">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-lg-4">
                                <input
                                    className="form-control"
                                    placeholder="Buscar..."
                                    value={search}
                                    onChange={e=>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col-lg-2">
                                <select
                                    className="form-select"
                                    value={priorityFilter}
                                    onChange={e=>
                                        setPriorityFilter(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Prioridad
                                    </option>
                                    <option>
                                        Alta
                                    </option>
                                    <option>
                                        Media
                                    </option>
                                    <option>
                                        Baja
                                    </option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <select
                                    className="form-select"
                                    value={statusFilter}
                                    onChange={e=>
                                        setStatusFilter(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Estado
                                    </option>
                                    <option>
                                        Pendiente
                                    </option>
                                    <option>
                                        En proceso
                                    </option>
                                    <option>
                                        Completada
                                    </option>
                                    <option>
                                        Vencida
                                    </option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <select
                                    className="form-select"
                                    value={typeFilter}
                                    onChange={e=>
                                        setTypeFilter(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Tipo
                                    </option>
                                    <option>
                                        Vencimiento
                                    </option>
                                    <option>
                                        Seguimiento
                                    </option>
                                    <option>
                                        Documento
                                    </option>
                                    <option>
                                        Recordatorio
                                    </option>
                                    <option>
                                        Notificación
                                    </option>
                                </select>
                            </div>
                            <div className="col-lg-2">
                                <select
                                    className="form-select"
                                    value={sortBy}
                                    onChange={e=>
                                        setSortBy(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="fecha">
                                        Fecha
                                    </option>
                                    <option value="titulo">
                                        Título
                                    </option>
                                    <option value="prioridad">
                                        Prioridad
                                    </option>
                                    <option value="estado">
                                        Estado
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    <th>Vencimiento</th>
                                    <th className="text-center">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAlerts.map((alertItem) => (
                                    
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
                                    <div>
                                        {formatDate(
                                            alertItem.fechaVencimiento
                                        )}

                                    </div>
                                    <Badge
                                        bg={
                                            getDueStatus(
                                                alertItem.fechaVencimiento
                                            ).variant
                                        }
                                    >
                                        {
                                            getDueStatus(
                                                alertItem.fechaVencimiento
                                            ).text
                                        }
                                    </Badge>
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