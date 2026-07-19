// ============================================================
// EditarDocumento.jsx
// ------------------------------------------------------------
// Página para editar un Documento.
// ============================================================
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useDocumentContext } from "../../contexts/DocumentContext";
import DocumentForm from "../../components/documentos/DocumentForm";
const EditarDocumento = () => {
    const { id } = useParams();
    const { documents = [] } = useDocumentContext();
    const documentData =
        documents.find(doc => doc.id === id);
    if (!documentData) {
        return (
            <Container className="py-5">
                Documento no encontrado.
            </Container>
        );
    }
    return (
        <Container fluid>
            <DocumentForm
                editMode
                documentData={documentData}
            />
        </Container>
    );
};
export default EditarDocumento;