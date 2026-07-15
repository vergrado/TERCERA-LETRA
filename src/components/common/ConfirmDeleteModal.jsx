// ============================================================
// ConfirmDeleteModal.jsx
// ------------------------------------------------------------
// Modal reutilizable de confirmación.
//
// Plataforma:
// TERCERA LETRA
//
// Se utiliza para:
//
// • Casos
// • Personas
// • Documentos
// • Alertas
// • Usuarios
//
// ============================================================
import {
    Modal,
    Button
} from "react-bootstrap";
const ConfirmDeleteModal = ({
    show,
    title = "Eliminar registro",
    message = "¿Está seguro que desea eliminar este registro?",
    loading = false,
    onCancel,
    onConfirm
}) => {
    return (
        <Modal
            show={show}
            onHide={onCancel}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Eliminando..."
                            : "Eliminar"
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ConfirmDeleteModal;