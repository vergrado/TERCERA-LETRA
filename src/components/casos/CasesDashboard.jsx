// ============================================================
// CasesDashboard.jsx
// ------------------------------------------------------------
// Dashboard del módulo de Casos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================

import { Card, Col, Row } from "react-bootstrap";
import { useMemo } from "react";
const CasesDashboard = ({ cases }) => {
    //----------------------------------------------------------
    // Estadísticas
    //----------------------------------------------------------
    const stats = useMemo(() => {
        return {
            total: cases.length,
            pendientes: cases.filter(
                c => c.estado === "PENDIENTE"
            ).length,
            proceso: cases.filter(
                c => c.estado === "EN PROCESO"
            ).length,
            finalizados: cases.filter(
                c => c.estado === "FINALIZADO"
            ).length,
            alta: cases.filter(
                c => c.prioridad === "ALTA"
            ).length
        };
    }, [cases]);
    //----------------------------------------------------------
    return (
        <Row className="mb-4">
            <Col lg={2} md={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <h6>Total</h6>
                        <h2>{stats.total}</h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={2} md={4}>
                <Card className="shadow-sm border-secondary">
                    <Card.Body>
                        <h6>Pendientes</h6>
                        <h2>{stats.pendientes}</h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={2} md={4}>
                <Card className="shadow-sm border-warning">
                    <Card.Body>
                        <h6>En proceso</h6>
                        <h2>{stats.proceso}</h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} md={6}>
                <Card className="shadow-sm border-success">
                    <Card.Body>
                        <h6>Finalizados</h6>
                        <h2>{stats.finalizados}</h2>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} md={6}>
                <Card className="shadow-sm border-danger">
                    <Card.Body>
                        <h6>Prioridad Alta</h6>
                        <h2>{stats.alta}</h2>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};
export default CasesDashboard;