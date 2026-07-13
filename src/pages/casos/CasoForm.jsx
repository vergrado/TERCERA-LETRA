// ============================================================
// CasoForm.jsx
// ------------------------------------------------------------
// Página contenedora del formulario de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Envolver el formulario con CaseProvider.
// • Mostrar el componente CaseForm.
//
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================

import { CaseProvider } from "../../contexts/CaseContext";
import CaseForm from "../../components/casos/CaseForm";

// ============================================================
// COMPONENTE
// ============================================================

const CasoForm = () => {

    return (

        <CaseProvider>

            <CaseForm />

        </CaseProvider>

    );

};

// ============================================================
// EXPORTACIÓN
// ============================================================

export default CasoForm;