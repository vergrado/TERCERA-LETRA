// ============================================================
// DocumentBasicFields.jsx
// ------------------------------------------------------------
// Campos principales del formulario de Documentos.
// ============================================================
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const DocumentBasicFields = ({
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    categoria,
    setCategoria,
    fechaDocumento,
    setFechaDocumento
}) => {
    return (
        <>
            <Row className="g-3">
                <Col md={8}>
                    <Form.Group controlId="documentTitle">
                        <Form.Label>
                            Título del documento *
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={titulo}
                            onChange={(event) =>
                                setTitulo(event.target.value)
                            }
                            placeholder="Ej: Resolución de aprobación"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="documentDate">
                        <Form.Label>
                            Fecha del documento *
                        </Form.Label>

                        <Form.Control
                            type="date"
                            value={fechaDocumento}
                            onChange={(event) =>
                                setFechaDocumento(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="documentCategory">
                        <Form.Label>
                            Categoría *
                        </Form.Label>
                        <Form.Select
                            value={categoria}
                            onChange={(event) =>
                                setCategoria(
                                    event.target.value
                                )
                            }
                            required
                        >
                            <option value="">
                                Seleccione una categoría
                            </option>
                            <option value="CONTRATO">
                                Contrato
                            </option>
                            <option value="INFORME">
                                Informe
                            </option>
                            <option value="RESOLUCION">
                                Resolución
                            </option>
                            <option value="OFICIO">
                                Oficio
                            </option>
                            <option value="CERTIFICADO">
                                Certificado
                            </option>
                            <option value="FORMULARIO">
                                Formulario
                            </option>
                            <option value="IDENTIFICACION">
                                Identificación
                            </option>
                            <option value="OTRO">
                                Otro
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group controlId="documentDescription">
                        <Form.Label>
                            Descripción
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={descripcion}
                            onChange={(event) =>
                                setDescripcion(
                                    event.target.value
                                )
                            }
                            placeholder="Ingrese una descripción u observación sobre el documento."
                        />
                    </Form.Group>
                </Col>
            </Row>
            <hr className="my-4" />
        </>
    );
};
export default DocumentBasicFields;