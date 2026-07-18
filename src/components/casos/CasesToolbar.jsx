// ============================================================
// CasesToolbar.jsx
// ------------------------------------------------------------
// Barra de herramientas del módulo de Casos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBox from "../common/SearchBox";
import CaseFilters from "./CaseFilters";
import ExportExcelButton from "./toolbar/ExportExcelButton";
import ExportPdfButton from "./toolbar/ExportPdfButton";
import PrintButton from "./toolbar/PrintButton";
const CasesToolbar = ({
    search,
    setSearch,
    estadoFiltro,
    setEstadoFiltro,
    prioridadFiltro,
    setPrioridadFiltro,
    institucionFiltro,
    setInstitucionFiltro,
    instituciones,
    cases
}) => {
    return (
        <div className="mb-4">
            <SearchBox
                value={search}
                onChange={setSearch}
                placeholder="Buscar caso..."
            />
            <CaseFilters
                estadoFiltro={estadoFiltro}
                setEstadoFiltro={setEstadoFiltro}
                prioridadFiltro={prioridadFiltro}
                setPrioridadFiltro={setPrioridadFiltro}
                institucionFiltro={institucionFiltro}
                setInstitucionFiltro={setInstitucionFiltro}
                instituciones={instituciones}
            />
            <Row className="mt-3">
                <Col className="d-flex gap-2">
                    <ExportExcelButton
                        cases={cases}
                    />
                    <ExportPdfButton
                        cases={cases}
                    />
                    <PrintButton />
                </Col>
            </Row>
        </div>
    );
};
export default CasesToolbar;