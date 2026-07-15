// ============================================================
// CaseBasicFields.jsx
// ------------------------------------------------------------
// Campos básicos del formulario de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Título.
// • Descripción.
// • Institución.
//
// No contiene lógica de negocio.
// ============================================================
import { Form } from "react-bootstrap";
const CaseBasicFields = ({
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    institucion,
    setInstitucion
}) => {
    return (
        <>
            {/* ================================================
                TÍTULO
            ================================================ */}
            <Form.Group className="mb-3">
                <Form.Label>
                    Título
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el título del caso"
                    value={titulo}
                    onChange={(e) =>
                        setTitulo(e.target.value)
                    }
                    required
                />
            </Form.Group>
            {/* ================================================
                DESCRIPCIÓN
            ================================================ */}
            <Form.Group className="mb-3">
                <Form.Label>
                    Descripción
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Descripción del caso"
                    value={descripcion}
                    onChange={(e) =>
                        setDescripcion(e.target.value)
                    }
                    required
                />
            </Form.Group>
            {/* ================================================
                INSTITUCIÓN
            ================================================ */}
            <Form.Group className="mb-3">
                <Form.Label>
                    Institución
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Institución relacionada"
                    value={institucion}
                    onChange={(e) =>
                        setInstitucion(e.target.value)
                    }
                    required
                />
            </Form.Group>
        </>
    );
};
export default CaseBasicFields;