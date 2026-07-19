import {
    Card,
    Col,
    ProgressBar,
    Row
} from "react-bootstrap";

const DashboardCharts = ({
    caseStatistics
}) => {
    const getPercentage = (value, data) => {
        const total = data.reduce(
            (sum, item) => sum + item.value,
            0
        );
        if (total === 0) return 0;
        return Math.round((value / total) * 100);
    };
    const renderStatistics = data => {
        if (!data?.length) {
            return (
                <p className="text-muted mb-0">
                    No hay información disponible.
                </p>
            );
        }
        return data.map(item => {
            const percentage = getPercentage(
                item.value,
                data
            );
            return (
                <div
                    key={item.name}
                    className="mb-3"
                >
                    <div className="d-flex justify-content-between mb-1">
                        <span>{item.name}</span>
                        <strong>{item.value}</strong>
                    </div>
                    <ProgressBar
                        now={percentage}
                        label={`${percentage}%`}
                    />
                </div>
            );
        });
    };
    return (
        <section className="mb-4">
            <Row className="g-4">
                <Col lg={4}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title>
                                Casos por estado
                            </Card.Title>
                            {renderStatistics(
                                caseStatistics?.casesByStatus
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title>
                                Casos por prioridad
                            </Card.Title>
                            {renderStatistics(
                                caseStatistics?.casesByPriority
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Body>
                            <Card.Title>
                                Casos por tipo
                            </Card.Title>
                            {renderStatistics(
                                caseStatistics?.casesByType
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </section>
    );
};
export default DashboardCharts;