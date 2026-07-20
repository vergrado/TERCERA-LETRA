// ============================================================
// AlertButtons.jsx
// ------------------------------------------------------------
// Botones del formulario.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
const AlertButtons = ({
    loading = false,
    editMode = false,
    onCancel
}) => {
    return (
        <div className="d-flex justify-content-end gap-2">
            <Button
                type="button"
                variant="outline-secondary"
                disabled={loading}
                onClick={onCancel}
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
                {
                    loading
                        ? "Guardando..."
                        : editMode
                            ? "Actualizar Alerta"
                            : "Guardar Alerta"
                }
            </Button>
        </div>
    );
};
export default AlertButtons;