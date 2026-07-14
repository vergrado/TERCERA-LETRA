// ============================================================
// CaseActions.jsx
// ------------------------------------------------------------
// Acciones disponibles para cada caso.
//
// Plataforma:
// TERCERA LETRA
// ============================================================

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
const CaseActions = ({
    onView,
    onEdit,
    onDelete
}) => {
    return (
        <ButtonGroup size="sm">
            <Button
                variant="outline-primary"
                onClick={onView}
                title="Ver detalle"
            >
                <i className="bi bi-eye"></i>
            </Button>
            <Button
                variant="outline-warning"
                onClick={onEdit}
                title="Editar"
            >
                <i className="bi bi-pencil"></i>
            </Button>
            <Button
                variant="outline-danger"
                onClick={onDelete}
                title="Eliminar"
            >
                <i className="bi bi-trash"></i>
            </Button>
        </ButtonGroup>
    );
};

export default CaseActions;