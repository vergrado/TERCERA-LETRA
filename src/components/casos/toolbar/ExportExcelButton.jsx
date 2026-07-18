// ============================================================
// ExportExcelButton.jsx
// ------------------------------------------------------------
// Exporta los casos visibles a Excel.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";
const ExportExcelButton = ({ cases }) => {
    //----------------------------------------------------------
    const exportExcel = () => {
        if (!cases.length) return;
        const data = cases.map((item) => ({
            Título: item.titulo,
            Institución: item.institucion,
            Estado: item.estado,
            Prioridad: item.prioridad,
            Responsable: item.responsableNombre,
            Fecha:
                item.fechaCreacion?.toDate
                    ? item.fechaCreacion
                          .toDate()
                          .toLocaleDateString()
                    : "-"
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Casos"
        );
        XLSX.writeFile(
            workbook,
            "Casos.xlsx"
        );
    };
    //----------------------------------------------------------
    return (
        <Button
            variant="success"
            onClick={exportExcel}
        >
            <i className="bi bi-file-earmark-excel me-2"></i>
            Excel
        </Button>
    );
};
export default ExportExcelButton;