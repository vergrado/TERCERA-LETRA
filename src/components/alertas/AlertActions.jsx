// ============================================================
// AlertActions.jsx
// ------------------------------------------------------------
// Acciones disponibles para cada alerta.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import {
    Button,
    ButtonGroup
} from "react-bootstrap";
import {
    PencilSquare,
    Trash
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
// ============================================================
const AlertActions = ({
    alertItem,
    onDelete
}) => {
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Editar alerta
    //----------------------------------------------------------
    const handleEdit = () => {
        if (!alertItem?.id) {
            return;
        }
        navigate(
            `/alertas/${alertItem.id}/editar`
        );
    };
    //----------------------------------------------------------
    // Eliminar alerta
    //----------------------------------------------------------
    const handleDelete = () => {
        if (
            !alertItem ||
            typeof onDelete !== "function"
        ) {
            return;
        }
        onDelete(alertItem);
    };
    //----------------------------------------------------------
    // Render
    //----------------------------------------------------------
    return (
        <ButtonGroup size="sm">
            <Button
                type="button"
                variant="outline-warning"
                title="Editar alerta"
                aria-label={`Editar alerta ${
                    alertItem?.titulo || ""
                }`}
                onClick={handleEdit}
            >
                <PencilSquare />
            </Button>
            <Button
                type="button"
                variant="outline-danger"
                title="Eliminar alerta"
                aria-label={`Eliminar alerta ${
                    alertItem?.titulo || ""
                }`}
                onClick={handleDelete}
            >
                <Trash />
            </Button>
        </ButtonGroup>
    );
};
export default AlertActions;