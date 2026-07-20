// ============================================================
// DocumentsTable.jsx
// ------------------------------------------------------------
// Tabla principal del módulo de Documentos.
// ============================================================
import {
    useMemo,
    useState
} from "react";
import {
    Alert,
    Badge,
    Form,
    Pagination,
    Spinner,
    Table
} from "react-bootstrap";
import {
    FaFile,
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaFileImage,
    FaFolderOpen,
    FaTags,
    FaUserCheck,
    FaUserSlash
} from "react-icons/fa";
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
    //----------------------------------------------------------
    // Búsqueda
    //----------------------------------------------------------
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("fecha");
    const [sortDirection, setSortDirection] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
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
    //----------------------------------------------------------
    // Color de categoría
    //----------------------------------------------------------
    const getCategoryVariant = (category) => {
        switch ((category || "").toLowerCase()) {
            case "contrato":
                return "primary";
            case "resolución":
                return "success";
            case "certificado":
                return "info";
            case "factura":
                return "warning";
            case "oficio":
                return "dark";
            default:
                return "secondary";
        }
    };
    //----------------------------------------------------------
    // Ícono según tipo de archivo
    //----------------------------------------------------------
    const getFileIcon = (fileName = "", mimeType = "") => {
        const normalizedFileName = fileName.toLowerCase();
        const normalizedMimeType = mimeType.toLowerCase();
        if (
            normalizedFileName.endsWith(".pdf") ||
            normalizedMimeType.includes("pdf")
        ) {
            return <FaFilePdf className="text-danger me-2" />;
        }
        if (
            normalizedFileName.endsWith(".doc") ||
            normalizedFileName.endsWith(".docx") ||
            normalizedMimeType.includes("word")
        ) {
            return <FaFileWord className="text-primary me-2" />;
        }
        if (
            normalizedFileName.endsWith(".xls") ||
            normalizedFileName.endsWith(".xlsx") ||
            normalizedMimeType.includes("excel") ||
            normalizedMimeType.includes("spreadsheet")
        ) {
            return <FaFileExcel className="text-success me-2" />;
        }
        if (
            normalizedFileName.endsWith(".jpg") ||
            normalizedFileName.endsWith(".jpeg") ||
            normalizedFileName.endsWith(".png") ||
            normalizedFileName.endsWith(".webp") ||
            normalizedMimeType.includes("image")
        ) {
            return <FaFileImage className="text-info me-2" />;
        }
        return <FaFile className="text-secondary me-2" />;
    };
    //----------------------------------------------------------
    // Normalizar texto
    //----------------------------------------------------------
    const normalizeText = (value = "") =>
        value
            .toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    //----------------------------------------------------------
    // Documentos filtrados
    //----------------------------------------------------------
    const filteredDocuments = useMemo(() => {
    const text = normalizeText(search);
        let result = [...documents];
        if (text) {
            result = result.filter((document) => {
                const searchableText = [
                    document.titulo,
                    document.descripcion,
                    document.categoria,
                    document.personaNombre,
                    document.personaRut,
                    document.casoTitulo,
                    document.nombreArchivo
                ]
                    .map(normalizeText)
                    .join(" ");
                return searchableText.includes(text);
            });
        }
        result.sort((a, b) => {
            let valueA;
            let valueB;
            switch (sortField) {
                case "titulo":
                    valueA = normalizeText(a.titulo);
                    valueB = normalizeText(b.titulo);
                    break;
                case "categoria":
                    valueA = normalizeText(a.categoria);
                    valueB = normalizeText(b.categoria);
                    break;
                case "fecha":
                default:
                    valueA = new Date(
                        a.fechaDocumento || a.fechaCreacion || 0
                    ).getTime();

                    valueB = new Date(
                        b.fechaDocumento || b.fechaCreacion || 0
                    ).getTime();
            }
            if (valueA < valueB) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
        return result;
        }, [documents, search, sortField, sortDirection]);
        const handleSort = (field) => {
             setCurrentPage(1);
            if (sortField === field) {
                setSortDirection(
                    sortDirection === "asc"
                        ? "desc"
                        : "asc"
                );
            } else {
                setSortField(field);
                setSortDirection("asc");
            }
        };
        //----------------------------------------------------------
        // Paginación
        //----------------------------------------------------------
        const totalPages = Math.max(
            1,
            Math.ceil(filteredDocuments.length / itemsPerPage)
        );
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedDocuments = filteredDocuments.slice(
            startIndex,
            endIndex
        );
        const visibleStart =
            filteredDocuments.length === 0
                ? 0
                : startIndex + 1;

        const visibleEnd = Math.min(
            endIndex,
            filteredDocuments.length
        );
        //----------------------------------------------------------
        // Estadísticas
        //----------------------------------------------------------
        const stats = useMemo(() => {
            return {
                total: documents.length,
                categorias: new Set(
                    documents
                        .map(doc => doc.categoria)
                        .filter(Boolean)
                ).size,
                conPersona: documents.filter(
                    doc => doc.personaId
                ).length,
                sinPersona: documents.filter(
                    doc => !doc.personaId
                ).length
            };
        }, [documents]);
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
                {/* Dashboard */}
                <div className="row g-3 mb-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100 dashboard-card dashboard-primary">
                            <div className="card-body d-flex align-items-center">
                                <div className="dashboard-icon">
                                    <FaFolderOpen />
                                </div>
                                <div className="ms-3">
                                    <h3 className="mb-0 fw-bold">
                                        {stats.total}
                                    </h3>
                                    <small className="text-muted">
                                        Documentos
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100 dashboard-card dashboard-success">
                            <div className="card-body d-flex align-items-center">
                                <div className="dashboard-icon">
                                    <FaTags />
                                </div>
                                <div className="ms-3">
                                    <h3 className="mb-0 fw-bold">
                                        {stats.categorias}
                                    </h3>
                                    <small className="text-muted">
                                        Categorías
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100 dashboard-card dashboard-info">
                            <div className="card-body d-flex align-items-center">
                                <div className="dashboard-icon">
                                    <FaUserCheck />
                                </div>
                                <div className="ms-3">
                                    <h3 className="mb-0 fw-bold">
                                        {stats.conPersona}
                                    </h3>
                                    <small className="text-muted">
                                        Con persona
                                    </small>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card border-0 shadow-sm h-100 dashboard-card dashboard-secondary">
                            <div className="card-body d-flex align-items-center">
                                <div className="dashboard-icon">
                                    <FaUserSlash />
                                </div>
                                <div className="ms-3">
                                    <h3 className="mb-0 fw-bold">
                                        {stats.sinPersona}
                                    </h3>
                                    <small className="text-muted">
                                        Sin persona
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow-sm border-0">
                {/* Buscador */}
                <div className="card-body border-bottom">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                            Mostrando <strong>{filteredDocuments.length}</strong> de{" "}
                            <strong>{documents.length}</strong> documentos
                        </small>
                    </div>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por título, categoría, persona, caso o archivo..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <Table
                            hover
                            responsive
                            className="align-middle mb-0"
                        >
                            <thead className="table-light">
                                <tr>
                                    <th
                                        role="button"
                                        onClick={() => handleSort("titulo")}
                                        style={{ cursor: "pointer", userSelect: "none" }}
                                    >
                                        Documento{" "}
                                        {sortField === "titulo" &&
                                            (sortDirection === "asc" ? "▲" : "▼")}
                                    </th>
                                    <th
                                        role="button"
                                        onClick={() => handleSort("categoria")}
                                        style={{ cursor: "pointer", userSelect: "none" }}
                                    >
                                        Categoría{" "}
                                        {sortField === "categoria" &&
                                            (sortDirection === "asc" ? "▲" : "▼")}
                                    </th>
                                    <th>Persona</th>
                                    <th>Caso</th>
                                    <th>Archivo</th>
                                    <th
                                        role="button"
                                        onClick={() => handleSort("fecha")}
                                        style={{ cursor: "pointer", userSelect: "none" }}
                                    >
                                        Fecha{" "}
                                        {sortField === "fecha" &&
                                            (sortDirection === "asc" ? "▲" : "▼")}
                                    </th>

                                    <th className="text-center">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                                <tbody>
                                    {filteredDocuments.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center py-5 text-muted"
                                            >
                                                <h6 className="mb-2">
                                                    🔍 No se encontraron documentos
                                                </h6>
                                                <small>
                                                    Intenta con otro término de búsqueda.
                                                </small>
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedDocuments.map((document) => {
                                            const fileSize = formatFileSize(
                                                document.tamano
                                            );
                                            return (
                                                <tr key={document.id}>
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {document.titulo || "Sin título"}
                                                        </div>

                                                        {document.descripcion && (
                                                            <small className="text-muted">
                                                                {document.descripcion}
                                                            </small>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Badge
                                                            bg={getCategoryVariant(
                                                                document.categoria
                                                            )}
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
                                                        <div className="d-flex align-items-center">
                                                            {getFileIcon(
                                                                document.nombreArchivo,
                                                                document.tipoArchivo
                                                            )}
                                                            <span>
                                                                {document.nombreArchivo ||
                                                                    "Sin archivo"}
                                                            </span>
                                                        </div>

                                                        {fileSize && (
                                                            <small className="text-muted ms-4">
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
                                                            onDelete={handleDeleteRequest}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </Table>
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 px-3 py-3 border-top">
                                <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2">
                                    <small className="text-muted">
                                        Mostrando{" "}
                                        <strong>{visibleStart}</strong>
                                        {" - "}
                                        <strong>{visibleEnd}</strong>
                                        {" de "}
                                        <strong>{filteredDocuments.length}</strong>
                                        {" documentos"}
                                    </small>

                                    <Form.Select
                                        size="sm"
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }}
                                        style={{ width: "auto" }}
                                        aria-label="Documentos por página"
                                    >
                                        <option value={5}>5 por página</option>
                                        <option value={10}>10 por página</option>
                                        <option value={20}>20 por página</option>
                                        <option value={50}>50 por página</option>
                                    </Form.Select>

                                </div>
                                <Pagination className="mb-0">
                                    <Pagination.Prev
                                        onClick={() =>
                                            setCurrentPage((page) =>
                                                Math.max(1, page - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        Anterior
                                    </Pagination.Prev>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => index + 1
                                    ).map((page) => (
                                        <Pagination.Item
                                            key={page}
                                            active={page === currentPage}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next
                                        onClick={() =>
                                            setCurrentPage((page) =>
                                                Math.min(totalPages, page + 1)
                                            )
                                        }
                                        disabled={
                                            currentPage === totalPages ||
                                            filteredDocuments.length === 0
                                        }
                                    >
                                        Siguiente
                                    </Pagination.Next>
                                </Pagination>
                            </div>
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