// ============================================================
// PersonasTable.jsx
// ------------------------------------------------------------
// Tabla principal del módulo Personas.
// ============================================================
import { useState } from "react";
import {
    Alert,
    Badge,
    Spinner,
    Table
} from "react-bootstrap";
import {
    FaSort,
    FaSortDown,
    FaSortUp
} from "react-icons/fa";
import { usePersonContext } from "../../contexts/PersonContext";
import { useToast } from "../../contexts/ToastContext";
import PersonaActions from "./PersonaActions";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
// ============================================================
const PersonasTable = ({
    persons = [],
    sortField = "",
    sortDirection = "asc",
    onSort
}) => {
    const {
        loading,
        error,
        removePerson
    } = usePersonContext();
    const { showToast } = useToast();
    const [
        personToDelete,
        setPersonToDelete
    ] = useState(null);
    const [
        deleting,
        setDeleting
    ] = useState(false);
    // ---------------------------------------------------------
    // Abrir modal
    // ---------------------------------------------------------
    const handleDeleteRequest = (person) => {
        setPersonToDelete(person);
    };
    // ---------------------------------------------------------
    // Cerrar modal
    // ---------------------------------------------------------
    const handleCloseDeleteModal = () => {
        if (deleting) {
            return;
        }
        setPersonToDelete(null);
    };
    // ---------------------------------------------------------
    // Confirmar eliminación
    // ---------------------------------------------------------
    const handleConfirmDelete = async () => {
        if (!personToDelete?.id) {
            return;
        }
        try {
            setDeleting(true);
            await removePerson(personToDelete.id);
            showToast(
                "Persona eliminada correctamente.",
                "success"
            );
            setPersonToDelete(null);
        } catch (error) {
            console.error(
                "Error al eliminar la persona:",
                error
            );
            showToast(
                "No fue posible eliminar la persona.",
                "danger"
            );
        } finally {
            setDeleting(false);
        }
    };
    // ---------------------------------------------------------
    // Icono de ordenamiento
    // ---------------------------------------------------------
    const renderSortIcon = (field) => {
        if (sortField !== field) {
            return (
                <FaSort
                    className="ms-1 text-muted"
                    size={12}
                />
            );
        }
        if (sortDirection === "asc") {
            return (
                <FaSortUp
                    className="ms-1"
                    size={12}
                />
            );
        }
        return (
            <FaSortDown
                className="ms-1"
                size={12}
            />
        );
    };
    // ---------------------------------------------------------
    // Encabezado ordenable
    // ---------------------------------------------------------
    const SortableHeader = ({
        field,
        children
    }) => (
        <th>
            <button
                type="button"
                className="
                    btn
                    btn-link
                    p-0
                    border-0
                    text-decoration-none
                    text-dark
                    fw-semibold
                    d-inline-flex
                    align-items-center
                "
                onClick={() => onSort?.(field)}
            >
                {children}
                {renderSortIcon(field)}
            </button>
        </th>
    );
    // ---------------------------------------------------------
    // Loading inicial
    // ---------------------------------------------------------
    if (loading && persons.length === 0) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">
                        Cargando personas...
                    </span>
                </Spinner>
            </div>
        );
    }
    // ---------------------------------------------------------
    // Error
    // ---------------------------------------------------------
    if (error) {
        return (
            <Alert variant="danger">
                {typeof error === "string"
                    ? error
                    : "No fue posible obtener las personas."}
            </Alert>
        );
    }
    // ---------------------------------------------------------
    // Sin registros
    // ---------------------------------------------------------
    if (persons.length === 0) {
        return (
            <Alert variant="info">
                No existen personas registradas.
            </Alert>
        );
    }
    // ---------------------------------------------------------
    // Render
    // ---------------------------------------------------------
    return (
        <>
            <div className="table-responsive">
                <Table
                    hover
                    responsive
                    className="align-middle mb-0"
                >
                    <thead>
                        <tr>
                            <SortableHeader field="nombres">
                                Nombre
                            </SortableHeader>
                            <SortableHeader field="rut">
                                RUT
                            </SortableHeader>
                            <SortableHeader field="correo">
                                Correo
                            </SortableHeader>
                            <SortableHeader field="telefono">
                                Teléfono
                            </SortableHeader>
                            <SortableHeader field="estado">
                                Estado
                            </SortableHeader>
                            <th className="text-end">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((person) => {
                            const isActive =
                                person.estado === "ACTIVO";
                            return (
                                <tr key={person.id}>
                                    <td>
                                        <strong>
                                            {person.nombres}{" "}
                                            {person.apellidos}
                                        </strong>
                                    </td>
                                    <td>
                                        {person.rut || "—"}
                                    </td>
                                    <td>
                                        {person.correo || "—"}
                                    </td>
                                    <td>
                                        {person.telefono || "—"}
                                    </td>
                                    <td>
                                        <Badge
                                            bg={
                                                isActive
                                                    ? "success"
                                                    : "secondary"
                                            }
                                        >
                                            {person.estado ||
                                                "SIN ESTADO"}
                                        </Badge>
                                    </td>
                                    <td className="text-end">
                                        <PersonaActions
                                            person={person}
                                            onDelete={
                                                handleDeleteRequest
                                            }
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            <ConfirmDeleteModal
                show={Boolean(personToDelete)}
                onHide={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                loading={deleting}
                title="Eliminar persona"
                message={
                    personToDelete
                        ? `¿Estás seguro de eliminar a ${personToDelete.nombres} ${personToDelete.apellidos}?`
                        : ""
                }
            />
        </>
    );
};
export default PersonasTable;