// ============================================================
// DocumentActions.jsx
// ------------------------------------------------------------
// Acciones disponibles para cada documento.
// ============================================================
import {
    Button,
    ButtonGroup
} from "react-bootstrap";
import {
    Eye,
    PencilSquare,
    Trash
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
// ============================================================
const DocumentActions = ({
    document,
    onDelete
}) => {
    const navigate = useNavigate();
    // ---------------------------------------------------------
    // Ver documento
    // ---------------------------------------------------------
    // ---------------------------------------------------------
    // Ver documento
    // ---------------------------------------------------------
    const handleView = () => {
        if (document.url) {
            window.open(
                document.url,
                "_blank",
                "noopener,noreferrer"
            );
            return;
        }
        alert(
            "Este documento no tiene un archivo asociado."
        );
    };
    // ---------------------------------------------------------
    // Render
    // ---------------------------------------------------------
    return (
        <ButtonGroup size="sm">
            <Button
                type="button"
                variant="outline-primary"
                title={
                    document.url
                        ? "Abrir archivo"
                        : "Sin archivo asociado"
                }
                onClick={handleView}
            >
                <Eye />
            </Button>
            <Button
                type="button"
                variant="outline-warning"
                title="Editar documento"
                onClick={() =>
                    navigate(
                        `/documentos/${document.id}/editar`
                    )
                }
            >
                <PencilSquare />
            </Button>
            <Button
                type="button"
                variant="outline-danger"
                title="Eliminar documento"
                onClick={() => onDelete(document)}
            >
                <Trash />
            </Button>

        </ButtonGroup>
    );
};
export default DocumentActions;