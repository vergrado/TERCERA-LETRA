// ============================================================
// NuevaPersona.jsx
// ------------------------------------------------------------
// Página para registrar una nueva persona.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Container from "react-bootstrap/Container";
import PersonaForm from "../../components/personas/PersonaForm";
const NuevaPersona = () => {
    return (
        <Container fluid>
            <PersonaForm />
        </Container>
    );
};
export default NuevaPersona;