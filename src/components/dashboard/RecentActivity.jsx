import {
    Card,
    ListGroup
} from "react-bootstrap";

import useDashboard from "../../hooks/useDashboard";
const RecentActivity = () => {
    const {
        loading,
        recentActivity
    } = useDashboard();
    if (loading) {
        return null;
    }
    const formatDate = value => {
        if (!value) {
            return "";
        }
        let date;
        if (typeof value?.toDate === "function") {
            date = value.toDate();
        }
        else if (value?.seconds) {
            date = new Date(
                value.seconds * 1000
            );
        }
        else {
            date = new Date(value);
        }
        if (Number.isNaN(date.getTime())) {
            return "";
        }
        return new Intl.DateTimeFormat(
            "es-CL",
            {
                dateStyle: "short",
                timeStyle: "short"
            }
        ).format(date);
    };
    return (
        <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
                <Card.Title>
                    Actividad reciente
                </Card.Title>

                {recentActivity.length === 0 ? (
                    <p className="text-muted mb-0">
                        No hay actividad reciente.
                    </p>
                ) : (
                    <ListGroup variant="flush">
                        {recentActivity.map(item => (
                            <ListGroup.Item
                                key={item.id}
                                className="px-0"
                            >
                                <div className="d-flex justify-content-between gap-3">
                                    <div>
                                        <strong>
                                            {item.titulo ||
                                                item.accion ||
                                                "Actividad"}
                                        </strong>

                                        {item.descripcion && (
                                            <p className="text-muted mb-0">
                                                {item.descripcion}
                                            </p>
                                        )}
                                    </div>
                                    <small className="text-muted text-nowrap">
                                        {formatDate(
                                            item.fecha
                                        )}
                                    </small>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
};
export default RecentActivity;