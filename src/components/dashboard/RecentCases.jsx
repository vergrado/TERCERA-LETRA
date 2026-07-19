import {
    Badge,
    Card,
    Table
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useDashboard from "../../hooks/useDashboard";
const RecentCases = () => {
    const navigate = useNavigate();
    const {
        loading,
        recentCases
    } = useDashboard();
    const getBadgeVariant = value => {
        const normalized = String(value ?? "")
            .trim()
            .toLowerCase();
        if (
            normalized === "alta" ||
            normalized === "urgente"
        ) {
            return "danger";
        }
        if (normalized === "media") {
            return "warning";
        }
        if (normalized === "baja") {
            return "success";
        }
        return "secondary";
    };
    if (loading) {
        return null;
    }
    return (
        <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title className="mb-0">
                        Últimos casos registrados
                    </Card.Title>

                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate("/casos")}
                    >
                        Ver todos
                    </button>
                </div>
                {recentCases.length === 0 ? (
                    <p className="text-muted mb-0">
                        No hay casos registrados.
                    </p>
                ) : (
                    <div className="table-responsive">
                        <Table
                            hover
                            responsive
                            className="align-middle mb-0"
                        >
                            <thead>
                                <tr>
                                    <th>Caso</th>
                                    <th>Persona</th>
                                    <th>Estado</th>
                                    <th>Prioridad</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentCases.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <strong>
                                                {item.titulo ||
                                                    "Sin título"}
                                            </strong>
                                        </td>
                                        <td>
                                            {item.personaNombre ||
                                                "Sin persona"}
                                        </td>
                                        <td>
                                            <Badge bg="primary">
                                                {item.estado ||
                                                    "Sin estado"}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge
                                                bg={getBadgeVariant(
                                                    item.prioridad
                                                )}
                                            >
                                                {item.prioridad ||
                                                    "Sin prioridad"}
                                            </Badge>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() =>
                                                    navigate(
                                                        `/casos/${item.id}`
                                                    )
                                                }
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};
export default RecentCases;