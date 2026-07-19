// ============================================================
// DocumentsDashboard.jsx
// ------------------------------------------------------------
// Resumen estadístico del módulo de Documentos.
// ============================================================
const DocumentsDashboard = ({ documents = [] }) => {
    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <h5 className="card-title fw-bold">
                    Resumen de documentos
                </h5>
                <p className="mb-0 text-muted">
                    Total de documentos registrados:{" "}
                    <strong>{documents.length}</strong>
                </p>
            </div>
        </div>
    );
};
export default DocumentsDashboard;