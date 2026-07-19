// ============================================================
// DocumentButtons.jsx
// ------------------------------------------------------------
// Botones del formulario de Documentos.
// ============================================================
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
const DocumentButtons = ({
    loading = false,
    editMode = false,
    onCancel
}) => {
    return (
        <div className="d-flex justify-content-end gap-2">
            <Button
                type="button"
                variant="outline-secondary"
                onClick={onCancel}
                disabled={loading}
            >
                Cancelar
            </Button>
            <Button
                type="submit"
                variant="primary"
                disabled={loading}
            >
                {loading && (
                    <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                    />
                )}
                {loading
                    ? "Guardando..."
                    : editMode
                        ? "Actualizar Documento"
                        : "Guardar Documento"}
            </Button>
        </div>
    );
};
export default DocumentButtons;