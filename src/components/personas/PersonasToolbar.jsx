// ============================================================
// PersonasToolbar.jsx
// ------------------------------------------------------------
// Barra de herramientas del módulo Personas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import SearchBox from "../common/SearchBox";
import ExportExcelButton from "../casos/toolbar/ExportExcelButton";
import ExportPdfButton from "../casos/toolbar/ExportPdfButton";
import PrintButton from "../casos/toolbar/PrintButton";
const PersonasToolbar = ({
    search,
    setSearch,
    estadoFiltro,
    setEstadoFiltro,
    persons
}) => {
    return (
        <div className="mb-4">
            <SearchBox
                value={search}
                onChange={setSearch}
                placeholder="Buscar persona..."
            />
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Select
                        value={estadoFiltro}
                        onChange={(e) =>
                            setEstadoFiltro(e.target.value)
                        }
                    >
                        <option value="">
                            Todos los estados
                        </option>
                        <option value="ACTIVO">
                            Activo
                        </option>
                        <option value="INACTIVO">
                            Inactivo
                        </option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex gap-2">
                    <ExportExcelButton
                        cases={persons}
                    />
                    <ExportPdfButton
                        cases={persons}
                    />
                    <PrintButton />
                </Col>
            </Row>
        </div>
    );
};
export default PersonasToolbar;