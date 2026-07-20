// ============================================================
// AlertBasicFields.jsx
// ------------------------------------------------------------
// Campos principales del formulario de Alertas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// ============================================================
const AlertBasicFields = ({
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    tipo,
    setTipo,
    prioridad,
    setPrioridad,
    estado,
    setEstado,
    fechaVencimiento,
    setFechaVencimiento,
    notificar,
    setNotificar,
    observaciones,
    setObservaciones
}) => {
    return (
        <>
            <h5 className="mb-3">
                Información de la alerta
            </h5>
            <Row className="g-3">
                <Col md={8}>
                    <Form.Group controlId="alertTitle">
                        <Form.Label>
                            Título *
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={titulo}
                            onChange={(event) =>
                                setTitulo(event.target.value)
                            }
                            placeholder="Ej.: Vencimiento de plazo"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="alertType">
                        <Form.Label>
                            Tipo *
                        </Form.Label>
                        <Form.Select
                            value={tipo}
                            onChange={(event) =>
                                setTipo(event.target.value)
                            }
                            required
                        >
                            <option value="">
                                Seleccione un tipo
                            </option>

                            <option value="Vencimiento">
                                Vencimiento
                            </option>
                            <option value="Recordatorio">
                                Recordatorio
                            </option>
                            <option value="Seguimiento">
                                Seguimiento
                            </option>
                            <option value="Documento">
                                Documento
                            </option>

                            <option value="Notificación">
                                Notificación
                            </option>
                            <option value="Otro">
                                Otro
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group controlId="alertDescription">
                        <Form.Label>
                            Descripción
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={descripcion}
                            onChange={(event) =>
                                setDescripcion(event.target.value)
                            }
                            placeholder="Describe el motivo de la alerta."
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="alertPriority">
                        <Form.Label>
                            Prioridad *
                        </Form.Label>
                        <Form.Select
                            value={prioridad}
                            onChange={(event) =>
                                setPrioridad(event.target.value)
                            }
                            required
                        >
                            <option value="">
                                Seleccione una prioridad
                            </option>
                            <option value="Baja">
                                Baja
                            </option>
                            <option value="Media">
                                Media
                            </option>
                            <option value="Alta">
                                Alta
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="alertStatus">
                        <Form.Label>
                            Estado *
                        </Form.Label>
                        <Form.Select
                            value={estado}
                            onChange={(event) =>
                                setEstado(event.target.value)
                            }
                            required
                        >
                            <option value="Pendiente">
                                Pendiente
                            </option>
                            <option value="En proceso">
                                En proceso
                            </option>
                            <option value="Completada">
                                Completada
                            </option>
                            <option value="Vencida">
                                Vencida
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="alertDueDate">
                        <Form.Label>
                            Fecha de vencimiento *
                        </Form.Label>

                        <Form.Control
                            type="date"
                            value={fechaVencimiento}
                            onChange={(event) =>
                                setFechaVencimiento(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group controlId="alertNotify">
                        <Form.Check
                            type="switch"
                            label="Activar notificación para esta alerta"
                            checked={Boolean(notificar)}
                            onChange={(event) =>
                                setNotificar(
                                    event.target.checked
                                )
                            }
                        />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group controlId="alertObservations">
                        <Form.Label>
                            Observaciones
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={observaciones}
                            onChange={(event) =>
                                setObservaciones(
                                    event.target.value
                                )
                            }
                            placeholder="Información adicional de la alerta."
                        />
                    </Form.Group>
                </Col>
            </Row>
            <hr className="my-4" />
        </>
    );
};
export default AlertBasicFields;