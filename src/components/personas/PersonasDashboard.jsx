// ============================================================
// PersonasDashboard.jsx
// ------------------------------------------------------------
// Dashboard del módulo Personas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
const PersonasDashboard = ({ persons }) => {
    //----------------------------------------------------------
    // Indicadores
    //----------------------------------------------------------
    const total = persons.length;

    const activas = persons.filter(
        p => p.estado === "ACTIVO"
    ).length;

    const inactivas = persons.filter(
        p => p.estado === "INACTIVO"
    ).length;
    //----------------------------------------------------------
    return (
        <Row className="mb-4">
            <Col md={4}>
                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <h6 className="text-muted">
                            Total Personas
                        </h6>
                        <h2 className="mb-0">
                            {total}
                        </h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <h6 className="text-muted">
                            Activas
                        </h6>
                        <h2 className="text-success mb-0">
                            {activas}
                        </h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="shadow-sm border-0">
                    <Card.Body>
                        <h6 className="text-muted">
                            Inactivas
                        </h6>
                        <h2 className="text-danger mb-0">
                            {inactivas}
                        </h2>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};
export default PersonasDashboard;