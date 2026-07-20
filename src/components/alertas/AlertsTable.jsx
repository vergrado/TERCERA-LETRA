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
        const [sortDirection, setSortDirection] =
            useState("asc");
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
    // Color de fila según prioridad
    //----------------------------------------------------------
    const getRowClass = (priority) => {
        switch (normalizeText(priority)) {
            case "alta":
                return "table-danger";
            case "media":
                return "table-warning";
            case "baja":
                return "table-success";
            default:
                return "";
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
    // Convertir fecha para ordenar
    //----------------------------------------------------------
    const getDateTimestamp = (dateValue) => {
        if (!dateValue) {
            return 0;
        }
        if (dateValue?.toDate) {
            return dateValue.toDate().getTime();
        }
        if (
            typeof dateValue === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
        ) {
            const [year, month, day] =
                dateValue.split("-").map(Number);
            return new Date(
                year,
                month - 1,
                day
            ).getTime();
        }
        const parsedDate =
            new Date(dateValue);
        return Number.isNaN(parsedDate.getTime())
            ? 0
            : parsedDate.getTime();
    };
    //----------------------------------------------------------
    // Valor numérico de prioridad
    //----------------------------------------------------------
    const getPriorityOrder = (priority) => {
        switch (normalizeText(priority)) {
            case "alta":
                return 3;
            case "media":
                return 2;
            case "baja":
                return 1;
            default:
                return 0;
        }
    };
    //----------------------------------------------------------
    // Valor numérico del estado
    //----------------------------------------------------------
    const getStatusOrder = (status) => {
        switch (normalizeText(status)) {
            case "vencida":
            case "vencido":
                return 4;
            case "pendiente":
                return 3;
            case "en proceso":
            case "en_proceso":
            case "en-proceso":
                return 2;
            case "completada":
            case "completado":
                return 1;
            default:
                return 0;
        }
    };
    //----------------------------------------------------------
    // Limpiar todos los filtros
    //----------------------------------------------------------
    const handleClearFilters = () => {
        setSearch("");
        setPriorityFilter("");
        setStatusFilter("");
        setTypeFilter("");
        setSortBy("fecha");
        setSortDirection("asc");
    };
    //----------------------------------------------------------
    // Filtrar y ordenar
    //----------------------------------------------------------
    //----------------------------------------------------------
// Filtrar y ordenar alertas
//----------------------------------------------------------
const filteredAlerts = [...alerts]
    .filter((alertItem) => {
        const searchableText = normalizeText(
            [
                alertItem.titulo,
                alertItem.descripcion,
                alertItem.tipo,
                alertItem.prioridad,
                alertItem.estado,
                alertItem.personaNombre,
                alertItem.personaRut,
                alertItem.casoTitulo
            ].join(" ")
        );
        if (
            search.trim() &&
            !searchableText.includes(
                normalizeText(search)
            )
        ) {
            return false;
        }
        if (
            priorityFilter &&
            normalizeText(alertItem.prioridad) !==
                normalizeText(priorityFilter)
        ) {
            return false;
        }
        if (
            statusFilter &&
            normalizeText(alertItem.estado) !==
                normalizeText(statusFilter)
        ) {
            return false;
        }
        if (
            typeFilter &&
            normalizeText(alertItem.tipo) !==
                normalizeText(typeFilter)
        ) {
            return false;
        }
        return true;
    })
    .sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
            case "titulo":
                comparison = normalizeText(
                    a.titulo
                ).localeCompare(
                    normalizeText(b.titulo),
                    "es"
                );
                break;
            case "prioridad":
                comparison =
                    getPriorityOrder(a.prioridad) -
                    getPriorityOrder(b.prioridad);
                break;
            case "estado":
                comparison =
                    getStatusOrder(a.estado) -
                    getStatusOrder(b.estado);
                break;
            case "tipo":
                comparison = normalizeText(
                    a.tipo
                ).localeCompare(
                    normalizeText(b.tipo),
                    "es"
                );
                break;
            case "persona":
                comparison = normalizeText(
                    a.personaNombre
                ).localeCompare(
                    normalizeText(b.personaNombre),
                    "es"
                );
                break;
            case "caso":
                comparison = normalizeText(
                    a.casoTitulo
                ).localeCompare(
                    normalizeText(b.casoTitulo),
                    "es"
                );
                break;
            case "fecha":
            default:
                comparison =
                    getDateTimestamp(
                        a.fechaVencimiento
                    ) -
                    getDateTimestamp(
                        b.fechaVencimiento
                    );
                break;
        }
        return sortDirection === "asc"
            ? comparison
            : comparison * -1;
    });
    // ==============================
    // DEBUG TEMPORAL
    // ==============================
    //console.log("Alerts:", alerts);
    //console.log("Filtered Alerts:", filteredAlerts);
    //console.log("Filtros:", {
       // search,
       // priorityFilter,
        //statusFilter,
       // typeFilter,
       // sortBy,
        //sortDirection
   /// });
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
                            <div className="col-lg-3">
                                    <div className="input-group">
                                        <select
                                            className="form-select"
                                            value={sortBy}
                                            onChange={(event) =>
                                                setSortBy(event.target.value)
                                            }
                                            aria-label="Ordenar alertas por"
                                        >
                                            <option value="fecha">
                                                Ordenar por fecha
                                            </option>
                                            <option value="titulo">
                                                Ordenar por título
                                            </option>
                                            <option value="prioridad">
                                                Ordenar por prioridad
                                            </option>
                                            <option value="estado">
                                                Ordenar por estado
                                            </option>
                                            <option value="tipo">
                                                Ordenar por tipo
                                            </option>
                                            <option value="persona">
                                                Ordenar por persona
                                            </option>
                                            <option value="caso">
                                                Ordenar por caso
                                            </option>
                                        </select>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() =>
                                                setSortDirection(
                                                    (currentDirection) =>
                                                        currentDirection === "asc"
                                                            ? "desc"
                                                            : "asc"
                                                )
                                            }
                                            title={
                                                sortDirection === "asc"
                                                    ? "Orden ascendente"
                                                    : "Orden descendente"
                                            }
                                        >
                                            {sortDirection === "asc"
                                                ? "↑"
                                                : "↓"}
                                        </button>
                                    </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 mt-3 pt-3 border-top">
                            <small className="text-muted">
                                Mostrando{" "}
                                <strong>{filteredAlerts.length}</strong>{" "}
                                de{" "}
                                <strong>{alerts.length}</strong>{" "}
                                alerta
                                {alerts.length === 1 ? "" : "s"}
                            </small>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={handleClearFilters}
                                disabled={
                                    !search &&
                                    !priorityFilter &&
                                    !statusFilter &&
                                    !typeFilter &&
                                    sortBy === "fecha" &&
                                    sortDirection === "asc"
                                }
                            >
                                Limpiar filtros
                            </button>
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
                                    {filteredAlerts.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center py-5"
                                            >
                                                <div className="fw-semibold mb-1">
                                                    No se encontraron alertas
                                                </div>
                                                <p className="text-muted small mb-3">
                                                    No existen registros que coincidan con
                                                    los filtros seleccionados.
                                                </p>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={handleClearFilters}
                                                >
                                                    Limpiar filtros
                                                </button>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredAlerts.map((alertItem) => {
                                            const dueStatus = getDueStatus(
                                                alertItem.fechaVencimiento
                                            );
                                            return (
                                                <tr
                                                        key={alertItem.id}
                                                        className={getRowClass(alertItem.prioridad)}
                                                    >
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {alertItem.titulo || "Sin título"}
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
                                                        <div className="mb-1">
                                                            {formatDate(
                                                                alertItem.fechaVencimiento
                                                            )}
                                                        </div>
                                                        <Badge
                                                            bg={dueStatus.variant}
                                                            text={
                                                                dueStatus.variant === "warning"
                                                                    ? "dark"
                                                                    : undefined
                                                            }
                                                            pill
                                                        >
                                                            {dueStatus.text}
                                                        </Badge>
                                                    </td>
                                                    <td className="text-center">
                                                        <AlertActions
                                                            alertItem={alertItem}
                                                            onDelete={handleDeleteRequest}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
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