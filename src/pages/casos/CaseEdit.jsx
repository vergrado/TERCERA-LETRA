// ============================================================
// CaseEdit.jsx
// ------------------------------------------------------------
// Página para editar un caso.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Spinner,
    Alert
} from "react-bootstrap";
import { useCaseContext } from "../../contexts/CaseContext";
import CaseForm from "../../components/casos/CaseForm";
const CaseEdit = () => {
    const { id } = useParams();
    const { loadCase } = useCaseContext();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchCase = async () => {
            try {
                const data = await loadCase(id);
                if (!data) {
                    setError("Caso no encontrado.");
                    return;
                }
                setCaseData(data);
            }
            catch {
                setError("No fue posible cargar el caso.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchCase();
    }, [id]);
    if (loading) {
        return <Spinner animation="border" />;
    }
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }
    return (
        <CaseForm
            editMode
            caseData={caseData}
        />
    );
};
export default CaseEdit;