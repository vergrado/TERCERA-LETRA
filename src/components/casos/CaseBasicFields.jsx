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
    setInstitucion,
    persons,
    personaId,
    setPersonaId
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
            <Form.Group className="mb-3">

            <Form.Label>
                Persona asociada
            </Form.Label>

            <Form.Select
                value={personaId}
                onChange={(e) =>
                    setPersonaId(e.target.value)
                }
            >
                <option value="">
                    Seleccione una persona
                </option>
                {persons.map((person) => (
                    <option
                        key={person.id}
                        value={person.id}
                    >
                        {person.nombres} {person.apellidos}
                        {" - "}
                        {person.rut}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
        </>
    );
};
export default CaseBasicFields;