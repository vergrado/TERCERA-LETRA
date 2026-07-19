// ============================================================
// DocumentForm.jsx
// ------------------------------------------------------------
// Formulario reutilizable para crear y editar Documentos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Ensamblar los componentes visuales.
// • Utilizar el hook useDocumentForm.
// • Mostrar mensajes de error.
// • Gestionar creación y edición de documentos.
//
// Toda la lógica se encuentra en:
//
// hooks/useDocumentForm.js
//
// ============================================================
// ============================================================
// IMPORTACIONES
// ============================================================
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import useDocumentForm from "../../hooks/useDocumentForm";
import DocumentBasicFields from "./DocumentBasicFields";
import DocumentAssociationFields from "./DocumentAssociationFields";
import DocumentFileField from "./DocumentFileField";
import DocumentButtons from "./DocumentButtons";
// ============================================================
// COMPONENTE
// ============================================================
const DocumentForm = ({
    editMode = false,
    documentData = null
}) => {
    //----------------------------------------------------------
    // Hook del formulario
    //----------------------------------------------------------
    const {
        titulo,
        setTitulo,
        descripcion,
        setDescripcion,
        categoria,
        setCategoria,
        fechaDocumento,
        setFechaDocumento,
        persons,
        personaId,
        setPersonaId,
        cases,
        casoId,
        setCasoId,
        archivo,
        setArchivo,
        loading,
        error,
        handleSubmit
    } = useDocumentForm(
        editMode,
        documentData
    );
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Interfaz
    //----------------------------------------------------------
    return (
        <Card className="shadow">
            <Card.Body>
                <h3 className="mb-4">
                    {
                        editMode
                            ? "Editar Documento"
                            : "Nuevo Documento"
                    }
                </h3>
                {
                    error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )
                }
                <Form onSubmit={handleSubmit}>
                    <DocumentBasicFields
                        titulo={titulo}
                        setTitulo={setTitulo}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                        categoria={categoria}
                        setCategoria={setCategoria}
                        fechaDocumento={fechaDocumento}
                        setFechaDocumento={setFechaDocumento}
                    />
                    <DocumentAssociationFields
                        persons={persons}
                        personaId={personaId}
                        setPersonaId={setPersonaId}
                        cases={cases}
                        casoId={casoId}
                        setCasoId={setCasoId}
                    />
                    <DocumentFileField
                        archivo={archivo}
                        setArchivo={setArchivo}
                        editMode={editMode}
                        documentData={documentData}
                    />
                    <DocumentButtons
                        loading={loading}
                        editMode={editMode}
                        onCancel={() =>
                            navigate("/documentos")
                        }
                    />
                </Form>
            </Card.Body>
        </Card>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default DocumentForm;