// ============================================================
// PersonasHeader.jsx
// ------------------------------------------------------------
// Encabezado del módulo de Personas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Card from "react-bootstrap/Card";
// ============================================================
const PersonasHeader = () => {
    return (
        <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
                <h1 className="mb-2">
                    Personas
                </h1>
                <p className="text-muted mb-0">
                    Administra las personas registradas en la plataforma.
                </p>
            </Card.Body>
        </Card>
    );
};
export default PersonasHeader;