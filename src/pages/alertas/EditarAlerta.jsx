// ============================================================
// EditarAlerta.jsx
// ------------------------------------------------------------
// Página para editar una Alerta.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { useAlertContext } from "../../contexts/AlertContext";
import AlertForm from "../../components/alertas/AlertForm";
const EditarAlerta = () => {
    const { id } = useParams();
    const { alerts = [] } =
        useAlertContext();
    const alertData =
        alerts.find(
            alert => alert.id === id
        );
    if (!alertData) {
        return (
            <Container className="py-5">
                Alerta no encontrada.
            </Container>
        );
    }
    return (
        <Container fluid>
            <AlertForm
                editMode
                alertData={alertData}
            />
        </Container>
    );
};
export default EditarAlerta;