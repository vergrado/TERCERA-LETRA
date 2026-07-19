// ============================================================
// DocumentsTable.jsx
// ------------------------------------------------------------
// Tabla principal del módulo de Documentos.
// ============================================================
import { useDocumentContext } from "../../contexts/DocumentContext";
const DocumentsTable = () => {
    const { documents = [], loading, error } = useDocumentContext();
    if (loading) {
        return (
            <div className="text-center py-4">
                Cargando documentos...
            </div>
        );
    }
    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }
    if (documents.length === 0) {
        return (
            <div className="card shadow-sm border-0">
                <div className="card-body text-center py-5">
                    <h5 className="fw-bold">
                        No hay documentos registrados
                    </h5>

                    <p className="text-muted mb-0">
                        Presiona “Nuevo Documento” para agregar el primer documento.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Categoría</th>
                                <th>Persona</th>
                                <th>Caso</th>
                                <th>Archivo</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((document) => (
                                <tr key={document.id}>
                                    <td>
                                        {document.titulo || "Sin título"}
                                    </td>
                                    <td>
                                        {document.categoria || "Sin categoría"}
                                    </td>
                                    <td>
                                        {document.personaNombre || "Sin persona"}
                                    </td>
                                    <td>
                                        {document.casoTitulo || "Sin caso"}
                                    </td>
                                    <td>
                                        {document.nombreArchivo || "Sin archivo"}
                                    </td>
                                    <td>
                                        {document.fechaCreacion?.toDate
                                            ? document.fechaCreacion
                                                  .toDate()
                                                  .toLocaleDateString("es-CL")
                                            : "Sin fecha"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default DocumentsTable;