// ============================================================
// CaseButtons.jsx
// ------------------------------------------------------------
// Botones del formulario de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Botón Guardar.
// • Botón Cancelar.
// • Spinner de carga.
//
// No contiene lógica de negocio.
// ============================================================
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
const CaseButtons = ({
    loading,
    editMode,
    onCancel
}) => {
    return (
        <div className="d-flex gap-2">
            <Button
                variant="primary"
                type="submit"
                disabled={loading}
            >
                {
                    loading
                        ? (
                            <>
                                <Spinner
                                    animation="border"
                                    size="sm"
                                    className="me-2"
                                />
                                Guardando...
                            </>
                        )
                        : (
                            editMode
                                ? "Actualizar Caso"
                                : "Guardar Caso"
                        )
                }
            </Button>
            <Button
                variant="secondary"
                type="button"
                onClick={onCancel}
            >
                Cancelar
            </Button>
        </div>
    );
};
export default CaseButtons;