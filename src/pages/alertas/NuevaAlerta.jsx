// ============================================================
// NuevaAlerta.jsx
// ------------------------------------------------------------
// Página para registrar una nueva Alerta.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Container from "react-bootstrap/Container";
import AlertForm from "../../components/alertas/AlertForm";
const NuevaAlerta = () => {
    return (
        <Container fluid>
            <AlertForm />
        </Container>
    );
};
export default NuevaAlerta;