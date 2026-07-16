// ============================================================
// CaseDetail.jsx
// ------------------------------------------------------------
// Vista de detalle de un caso.
//
// Plataforma:
// TERCERA LETRA
// ============================================================

import { useParams } from "react-router-dom";
import {
    Card,
    Badge
} from "react-bootstrap";
import { useCaseContext } from "../../contexts/CaseContext";
const CaseDetail = () => {
    const { id } = useParams();
    const { cases } = useCaseContext();
    const caso = cases.find(c => c.id === id);
    if (!caso) {
        return (
            <Card>
                <Card.Body>
                    Caso no encontrado.
                </Card.Body>
            </Card>
        );
    }
    return (
        <Card className="shadow">
            <Card.Body>
                <h2>{caso.titulo}</h2>
                <hr />
                <p>
                    <strong>Institución:</strong>
                    {" "}
                    {caso.institucion}
                </p>
                <p>
                    <strong>Descripción:</strong>
                    {" "}
                    {caso.descripcion}
                </p>
                <p>
                    <strong>Responsable:</strong>
                    {" "}
                    {caso.responsableNombre}
                </p>
                <p>
                    <strong>Correo:</strong>
                    {" "}
                    {caso.responsableEmail}
                </p>
                <p>
                    <strong>Estado:</strong>
                    {" "}
                    <Badge bg="primary">
                        {caso.estado}
                    </Badge>
                </p>
                <p>
                    <strong>Prioridad:</strong>
                    {" "}
                    <Badge bg="warning">
                        {caso.prioridad}
                    </Badge>
                </p>
                <p>
                    <strong>Fecha:</strong>
                    {" "}
                    {
                        caso.fechaCreacion?.toDate
                            ? caso.fechaCreacion
                                  .toDate()
                                  .toLocaleDateString()
                            : "-"
                    }
                </p>
            </Card.Body>
        </Card>
    );
};
export default CaseDetail;