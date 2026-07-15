// ============================================================
// CaseStatusFields.jsx
// ------------------------------------------------------------
// Campos de Estado y Prioridad del formulario de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Estado.
// • Prioridad.
//
// No contiene lógica de negocio.
// ============================================================
import { Form } from "react-bootstrap";
const CaseStatusFields = ({
    estado,
    setEstado,
    prioridad,
    setPrioridad
}) => {
    return (
        <>
            {/* ================================================
                ESTADO
            ================================================ */}
            <Form.Group className="mb-3">
                <Form.Label>
                    Estado
                </Form.Label>
                <Form.Select
                    value={estado}
                    onChange={(e) =>
                        setEstado(e.target.value)
                    }
                >
                    <option value="PENDIENTE">
                        PENDIENTE
                    </option>
                    <option value="EN PROCESO">
                        EN PROCESO
                    </option>
                    <option value="FINALIZADO">
                        FINALIZADO
                    </option>
                    <option value="ARCHIVADO">
                        ARCHIVADO
                    </option>
                </Form.Select>
            </Form.Group>
            {/* ================================================
                PRIORIDAD
            ================================================ */}
            <Form.Group className="mb-4">
                <Form.Label>
                    Prioridad
                </Form.Label>
                <Form.Select
                    value={prioridad}
                    onChange={(e) =>
                        setPrioridad(e.target.value)
                    }
                >
                    <option value="ALTA">
                        ALTA
                    </option>
                    <option value="MEDIA">
                        MEDIA
                    </option>
                    <option value="BAJA">
                        BAJA
                    </option>
                </Form.Select>
            </Form.Group>
        </>
    );
};
export default CaseStatusFields;