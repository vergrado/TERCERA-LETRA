// ============================================================
// PersonaButtons.jsx
// ------------------------------------------------------------
// Botones del formulario de Personas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
const PersonaButtons = ({
    loading,
    editMode,
    onCancel
}) => {
    return (
        <Stack
            direction="horizontal"
            gap={2}
            className="mt-4 justify-content-end"
        >
            <Button
                variant="secondary"
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
                                ? "Actualizar Persona"
                                : "Guardar Persona"
                        )
                }
            </Button>
        </Stack>
    );
};
export default PersonaButtons;