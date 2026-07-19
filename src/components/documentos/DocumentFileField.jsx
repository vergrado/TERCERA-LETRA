// ============================================================
// DocumentFileField.jsx
// ------------------------------------------------------------
// Selección del archivo asociado al documento.
// ============================================================
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
const DocumentFileField = ({
    archivo,
    setArchivo,
    editMode = false,
    documentData = null
}) => {
    const handleFileChange = (event) => {
        const selectedFile =
            event.target.files?.[0] ?? null;
        setArchivo(selectedFile);
    };
    return (
        <>
            <h5 className="mb-3">
                Archivo
            </h5>
            {editMode &&
                documentData?.nombreArchivo &&
                !archivo && (
                    <Alert variant="light">
                        Archivo actual:{" "}
                        <strong>
                            {documentData.nombreArchivo}
                        </strong>
                    </Alert>
                )}
            <Form.Group controlId="documentFile">
                <Form.Label>
                    {editMode
                        ? "Reemplazar archivo"
                        : "Seleccionar archivo *"}
                </Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    required={!editMode}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                />
                <Form.Text className="text-muted">
                    Formatos permitidos: PDF, Word, Excel, PNG y
                    JPG.
                </Form.Text>
            </Form.Group>
            {archivo && (
                <Alert
                    variant="secondary"
                    className="mt-3 mb-0"
                >
                    <div>
                        <strong>Archivo seleccionado:</strong>{" "}
                        {archivo.name}
                    </div>
                    <div>
                        <strong>Tamaño:</strong>{" "}
                        {(archivo.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                </Alert>
            )}
            <hr className="my-4" />
        </>
    );
};
export default DocumentFileField;