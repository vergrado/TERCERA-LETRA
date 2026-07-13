// ============================================================
// CasoForm.jsx
// ------------------------------------------------------------
// Página del formulario de Casos.
// ============================================================

import { CaseProvider } from "../../contexts/CaseContext";
import CaseForm from "../../components/casos/CaseForm";

const CasoForm = () => {
    return (
        <CaseProvider>
            <CaseForm />
        </CaseProvider>
    );
};

export default CasoForm;