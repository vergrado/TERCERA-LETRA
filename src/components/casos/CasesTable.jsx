// ============================================================
// CasesTable.jsx
// ------------------------------------------------------------
// Tabla principal de Casos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { useCaseContext } from "../../contexts/CaseContext";
import CaseActions from "./CaseActions";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
const CasesTable = () => {
    //----------------------------------------------------------
    // Contexto
    //----------------------------------------------------------
    const {
        cases,
        loading,
        error,
        removeCase,
        loadCases
    } = useCaseContext();
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Modal eliminar
    //----------------------------------------------------------
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    //----------------------------------------------------------
    // Colores Estado
    //----------------------------------------------------------
    const getEstadoBadge = (estado) => {
        switch (estado) {
            case "PENDIENTE":
                return "secondary";
            case "EN PROCESO":
                return "warning";
            case "FINALIZADO":
                return "success";
            case "ARCHIVADO":
                return "dark";
            default:
                return "primary";
        }
    };
    //----------------------------------------------------------
    // Colores Prioridad
    //----------------------------------------------------------
    const getPrioridadBadge = (prioridad) => {
        switch (prioridad) {
            case "ALTA":
                return "danger";
            case "MEDIA":
                return "warning";
            case "BAJA":
                return "success";
            default:
                return "secondary";
        }
    };
    //----------------------------------------------------------
    // Confirmar eliminación
    //----------------------------------------------------------
    const handleDelete = async () => {
        if (!selectedCase) return;
        try {
            setDeleteLoading(true);
            await removeCase(selectedCase.id);
            await loadCases();
            setShowDelete(false);
            setSelectedCase(null);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setDeleteLoading(false);
        }
    };
    //----------------------------------------------------------
    // Loading
    //----------------------------------------------------------
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-3">
                    Cargando casos...
                </p>
            </div>
        );
    }
    //----------------------------------------------------------
    // Error
    //----------------------------------------------------------
    if (error) {
        return (
            <Alert variant="danger">
                Error al obtener los casos.
            </Alert>
        );
    }
    //----------------------------------------------------------
    // Sin registros
    //----------------------------------------------------------
    if (cases.length === 0) {
        return (
            <Alert variant="info">
                No existen casos registrados.
            </Alert>
        );
    }
    //----------------------------------------------------------
    // Tabla
    //----------------------------------------------------------
    return (
        <>
            <Table
                hover
                striped
                bordered
                responsive
                className="align-middle"
            >
                <thead className="table-dark">
                    <tr>
                        <th>Título</th>
                        <th>Institución</th>
                        <th>Estado</th>
                        <th>Prioridad</th>
                        <th>Responsable</th>
                        <th>Fecha</th>
                        <th width="150">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cases.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    {item.titulo}
                                </td>
                                <td>
                                    {item.institucion}
                                </td>
                                <td>
                                    <Badge bg={getEstadoBadge(item.estado)}>
                                        {item.estado}
                                    </Badge>
                                </td>
                                <td>
                                    <Badge bg={getPrioridadBadge(item.prioridad)}>
                                        {item.prioridad}
                                    </Badge>
                                </td>
                                <td>
                                    {item.responsableNombre}
                                </td>
                                <td>
                                    {
                                        item.fechaCreacion?.toDate
                                            ? item.fechaCreacion
                                                .toDate()
                                                .toLocaleDateString()

                                            : "-"
                                    }
                                </td>
                                <td>
                                    <CaseActions
                                        onView={() =>
                                            navigate(`/casos/${item.id}`)
                                        }
                                        onEdit={() =>
                                            navigate(`/casos/${item.id}/editar`)
                                        }
                                        onDelete={() => {
                                            setSelectedCase(item);
                                            setShowDelete(true);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <ConfirmDeleteModal
                show={showDelete}
                title="Eliminar Caso"
                message={
                    selectedCase
                        ? `¿Desea eliminar el caso "${selectedCase.titulo}"?`

                        : ""
                }
                loading={deleteLoading}
                onCancel={() => {
                    setShowDelete(false);
                    setSelectedCase(null);
                }}
                onConfirm={handleDelete}
            />
        </>
    );
};
export default CasesTable;