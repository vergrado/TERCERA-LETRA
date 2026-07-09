// ============================================================
// CasoForm.jsx
// ------------------------------------------------------------
// Página contenedora del formulario de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Mostrar el formulario reutilizable.
// • Integrarse con DashboardLayout.
// • Preparar futuras funcionalidades de edición.
//
// ============================================================
import { Container } from "react-bootstrap";
import CaseForm from "../../components/casos/CaseForm";
const CasoForm = () => {
    return (
        <Container fluid>
            <CaseForm />
        </Container>
    );
};
export default CasoForm;