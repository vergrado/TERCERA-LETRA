// ============================================================
// DocumentsTable.jsx
// ------------------------------------------------------------
// Tabla principal del módulo de Documentos.
// ============================================================

import { useState } from "react";
import {
    Alert,
    Badge,
    Spinner,
    Table
} from "react-bootstrap";
import { useDocumentContext } from "../../contexts/DocumentContext";
import { useToast } from "../../contexts/ToastContext";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import DocumentActions from "./DocumentActions";
// ============================================================
const DocumentsTable = () => {
    const {
        documents = [],
        loading,
        error,
        removeDocument
    } = useDocumentContext();
    const { showToast } = useToast();
    const [
        documentToDelete,
        setDocumentToDelete
    ] = useState(null);
    const [
        deleting,
        setDeleting
    ] = useState(false);
    // ---------------------------------------------------------
    // Solicitar eliminación
    // ---------------------------------------------------------
    const handleDeleteRequest = (document) => {
        setDocumentToDelete(document);
    };
    // ---------------------------------------------------------
    // Cerrar modal
    // ---------------------------------------------------------
    const handleDeleteCancel = () => {
        if (deleting) {
            return;
        }
        setDocumentToDelete(null);
    };
    // ---------------------------------------------------------
    // Confirmar eliminación
    // ---------------------------------------------------------
    const handleDeleteConfirm = async () => {
        if (!documentToDelete?.id) {
            return;
        }
        try {
            setDeleting(true);
            await removeDocument(
                documentToDelete.id
            );
            showToast(
                "Documento eliminado",
                "El documento fue eliminado correctamente.",
                "success"
            );
            setDocumentToDelete(null);
        } catch (deleteError) {
            console.error(
                "Error al eliminar el documento:",
                deleteError
            );
            showToast(
                "Error",
                "No fue posible eliminar el documento.",
                "danger"
            );
        } finally {
            setDeleting(false);
        }
    };
    // ---------------------------------------------------------
    // Formatear fecha
    // ---------------------------------------------------------
    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Sin fecha";
        }
        if (dateValue?.toDate) {
            return dateValue
                .toDate()
                .toLocaleDateString("es-CL");
        }
        const parsedDate = new Date(dateValue);
        if (Number.isNaN(parsedDate.getTime())) {
            return "Sin fecha";
        }
        return parsedDate.toLocaleDateString(
            "es-CL"
        );
    };
    // ---------------------------------------------------------
    // Formatear tamaño
    // ---------------------------------------------------------
    const formatFileSize = (bytes) => {
        const numericBytes = Number(bytes);
        if (
            !numericBytes ||
            numericBytes <= 0
        ) {
            return "";
        }
        if (numericBytes < 1024) {
            return `${numericBytes} B`;
        }
        if (numericBytes < 1024 * 1024) {
            return `${(
                numericBytes / 1024
            ).toFixed(1)} KB`;
        }
        return `${(
            numericBytes /
            (1024 * 1024)
        ).toFixed(1)} MB`;
    };
    // ---------------------------------------------------------
    // Cargando
    // ---------------------------------------------------------
    if (loading && documents.length === 0) {
        return (
            <div className="text-center py-5">
                <Spinner
                    animation="border"
                    role="status"
                />

                <p className="text-muted mt-3 mb-0">
                    Cargando documentos...
                </p>
            </div>
        );
    }
    // ---------------------------------------------------------
    // Error
    // ---------------------------------------------------------
    if (error && documents.length === 0) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        );
    }
    // ---------------------------------------------------------
    // Sin documentos
    // ---------------------------------------------------------
    if (documents.length === 0) {
        return (
            <div className="card shadow-sm border-0">
                <div className="card-body text-center py-5">
                    <h5 className="fw-bold">
                        No hay documentos registrados
                    </h5>
                    <p className="text-muted mb-0">
                        Presiona “Nuevo Documento” para
                        agregar el primer documento.
                    </p>
                </div>
            </div>
        );
    }
    // ---------------------------------------------------------
    // Tabla
    // ---------------------------------------------------------
    return (
        <>
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <Table
                            hover
                            responsive
                            className="align-middle mb-0"
                        >
                            <thead className="table-light">
                                <tr>
                                    <th>Documento</th>
                                    <th>Categoría</th>
                                    <th>Persona</th>
                                    <th>Caso</th>
                                    <th>Archivo</th>
                                    <th>Fecha</th>

                                    <th className="text-center">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map(
                                    (document) => {

                                        const fileSize =
                                            formatFileSize(
                                                document.tamano
                                            );
                                        return (
                                            <tr key={document.id}>
                                                <td>
                                                    <div className="fw-semibold">
                                                        {document.titulo ||
                                                            "Sin título"}
                                                    </div>

                                                    {document.descripcion && (
                                                        <small className="text-muted">
                                                            {document.descripcion}
                                                        </small>
                                                    )}
                                                </td>
                                                <td>
                                                    <Badge
                                                        bg="secondary"
                                                        pill
                                                    >
                                                        {document.categoria ||
                                                            "Sin categoría"}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    {document.personaId ? (
                                                        <span>
                                                            {document.personaNombre ||
                                                                "Persona asociada"}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted">
                                                            Sin persona
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {document.casoId ? (
                                                        <span>
                                                            {document.casoTitulo ||
                                                                "Caso asociado"}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted">
                                                            Sin caso
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div>
                                                        {document.nombreArchivo ||
                                                            "Sin archivo"}
                                                    </div>

                                                    {fileSize && (
                                                        <small className="text-muted">
                                                            {fileSize}
                                                        </small>
                                                    )}
                                                </td>
                                                <td>
                                                    {formatDate(
                                                        document.fechaDocumento ||
                                                        document.fechaCreacion
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <DocumentActions
                                                        document={document}
                                                        onDelete={
                                                            handleDeleteRequest
                                                        }
                                                    />
                                                </td>

                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <ConfirmDeleteModal
                show={Boolean(documentToDelete)}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                loading={deleting}
                title="Eliminar documento"
                message={
                    documentToDelete
                        ? `¿Estás seguro de eliminar el documento "${documentToDelete.titulo || "Sin título"}"?`
                        : ""
                }
            />
        </>
    );
};
export default DocumentsTable;