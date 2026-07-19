// ============================================================
// Documentos.jsx
// ------------------------------------------------------------
// Página principal del módulo de Documentos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DocumentsHeader from "../components/documentos/DocumentsHeader";
import DocumentsContainer from "../components/documentos/DocumentsContainer";
import "../styles/documents/documents.css";
const Documentos = () => {
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    return (
        <div className="documents-page">
            <DocumentsHeader />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                    Gestión Documental
                </h2>
                <Button
                    variant="primary"
                    onClick={() => navigate("/documentos/nuevo")}
                >
                    <FaPlus className="me-2" />
                    Nuevo Documento
                </Button>
            </div>
            <DocumentsContainer />
        </div>
    );
};
export default Documentos;