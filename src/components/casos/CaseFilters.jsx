// ============================================================
// CaseFilters.jsx
// ------------------------------------------------------------
// Filtros del módulo de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Filtrar por Estado.
// • Filtrar por Prioridad.
// • Filtrar por Institución.
//
// ============================================================
import { Row, Col, Form } from "react-bootstrap";
const CaseFilters = ({
    estado,
    prioridad,
    institucion,
    instituciones = [],
    onEstadoChange,
    onPrioridadChange,
    onInstitucionChange
}) => {
    return (
        <Row className="mb-4">
            <Col md={4}>
                <Form.Group>
                    <Form.Label>
                        Estado
                    </Form.Label>
                    <Form.Select
                        value={estado}
                        onChange={(e) =>
                            onEstadoChange(e.target.value)
                        }
                    >
                        <option value="">
                            Todos
                        </option>
                        <option value="PENDIENTE">
                            Pendiente
                        </option>
                        <option value="EN PROCESO">
                            En Proceso
                        </option>
                        <option value="FINALIZADO">
                            Finalizado
                        </option>
                        <option value="ARCHIVADO">
                            Archivado
                        </option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group>
                    <Form.Label>
                        Prioridad
                    </Form.Label>
                    <Form.Select
                        value={prioridad}
                        onChange={(e) =>
                            onPrioridadChange(e.target.value)
                        }
                    >
                        <option value="">
                            Todas
                        </option>
                        <option value="ALTA">
                            Alta
                        </option>
                        <option value="MEDIA">
                            Media
                        </option>
                        <option value="BAJA">
                            Baja
                        </option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group>
                    <Form.Label>
                        Institución
                    </Form.Label>
                    <Form.Select
                        value={institucion}
                        onChange={(e) =>
                            onInstitucionChange(e.target.value)
                        }
                    >
                        <option value="">
                            Todas
                        </option>
                        {
                            instituciones.map((nombre) => (
                                <option
                                    key={nombre}
                                    value={nombre}
                                >
                                    {nombre}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
    );
};
export default CaseFilters;