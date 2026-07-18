// ============================================================
// ExportPdfButton.jsx
// ------------------------------------------------------------
// Exporta los casos visibles a PDF.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const ExportPdfButton = ({ cases }) => {
    //----------------------------------------------------------
    const exportPDF = () => {
        if (!cases.length) return;
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(
            "Listado de Casos",
            14,
            18
        );
        autoTable(doc, {
            startY: 28,
            head: [[
                "Título",
                "Institución",
                "Estado",
                "Prioridad",
                "Responsable",
                "Fecha"
            ]],
            body: cases.map(item => [
                item.titulo,
                item.institucion,
                item.estado,
                item.prioridad,
                item.responsableNombre,
                item.fechaCreacion?.toDate
                    ? item.fechaCreacion
                        .toDate()
                        .toLocaleDateString()
                    : "-"
            ])
        });
        doc.save("Casos.pdf");
    };
    //----------------------------------------------------------
    return (
        <Button
            variant="danger"
            onClick={exportPDF}
        >
            <i className="bi bi-file-earmark-pdf me-2"></i>
            PDF
        </Button>
    );
};
export default ExportPdfButton;