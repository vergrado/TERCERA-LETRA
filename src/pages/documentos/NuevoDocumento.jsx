// ============================================================
// NuevoDocumento.jsx
// ------------------------------------------------------------
// Página para registrar un nuevo Documento.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Container from "react-bootstrap/Container";
import DocumentForm from "../../components/documentos/DocumentForm";
const NuevoDocumento = () => {
    return (
        <Container fluid>
            <DocumentForm />
        </Container>
    );
};
export default NuevoDocumento;