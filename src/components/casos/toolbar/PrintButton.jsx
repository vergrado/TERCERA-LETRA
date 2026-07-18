// ============================================================
// PrintButton.jsx
// ------------------------------------------------------------
// Imprime los casos visibles.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Button from "react-bootstrap/Button";
const PrintButton = () => {
    //----------------------------------------------------------
    const handlePrint = () => {
        window.print();
    };
    //----------------------------------------------------------
    return (
        <Button
            variant="secondary"
            onClick={handlePrint}
        >
            <i className="bi bi-printer me-2"></i>
            Imprimir
        </Button>
    );
};
export default PrintButton;