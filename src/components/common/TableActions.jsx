// ============================================================
// TableActions.jsx
// ------------------------------------------------------------
// Botones reutilizables para acciones CRUD.
//
// Plataforma:
// TERCERA LETRA
//
// Utilizado por:
//
// • Casos
// • Personas
// • Documentos
// • Alertas
// • Reportes
//
// ============================================================

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";
const TableActions = ({
    onView,
    onEdit,
    onDelete,
    viewDisabled = false,
    editDisabled = false,
    deleteDisabled = false
}) => {
    return (
        <ButtonGroup>
            <Button
                size="sm"
                variant="outline-primary"
                disabled={viewDisabled}
                onClick={(e) => {
                    e.stopPropagation();
                    onView?.();
                }}
            >
                <FaEye />
            </Button>
            <Button
                size="sm"
                variant="outline-warning"
                disabled={editDisabled}
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                }}
            >
                <FaEdit />
            </Button>
            <Button
                size="sm"
                variant="outline-danger"
                disabled={deleteDisabled}
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                }}
            >
                <FaTrash />
            </Button>
        </ButtonGroup>
    );
};
export default TableActions;