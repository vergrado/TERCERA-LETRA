// ============================================================
// PersonaBasicFields.jsx
// ------------------------------------------------------------
// Campos principales del formulario de Personas.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Información personal.
// • Datos de contacto.
// • Estado de la persona.
//
// ============================================================
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// ============================================================
const PersonaBasicFields = ({
    formData,
    errors,
    handleChange
}) => {
    return (
        <>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group controlId="nombres">
                        <Form.Label>
                            Nombres
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            isInvalid={Boolean(errors.nombres)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nombres}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="apellidos">
                        <Form.Label>
                            Apellidos
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            isInvalid={Boolean(errors.apellidos)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.apellidos}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group controlId="rut">
                        <Form.Label>
                            RUT
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="rut"
                            value={formData.rut}
                            onChange={handleChange}
                            placeholder="12.345.678-9"
                            isInvalid={Boolean(errors.rut)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.rut}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="correo">
                        <Form.Label>
                            Correo
                        </Form.Label>
                        <Form.Control
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            isInvalid={Boolean(errors.correo)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.correo}
                        </Form.Control.Feedback>

                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="telefono">
                        <Form.Label>
                            Teléfono
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            isInvalid={Boolean(errors.telefono)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.telefono}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Group controlId="estado">
                        <Form.Label>
                            Estado
                        </Form.Label>
                        <Form.Select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            isInvalid={Boolean(errors.estado)}
                        >
                            <option value="ACTIVO">
                                Activo
                            </option>
                            <option value="INACTIVO">
                                Inactivo
                            </option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.estado}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};
export default PersonaBasicFields;