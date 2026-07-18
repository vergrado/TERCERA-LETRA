// ============================================================
// PersonaDetail.jsx
// ------------------------------------------------------------
// Página de detalle de una persona.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { useEffect } from "react";
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Row,
    Spinner,
} from "react-bootstrap";
import {
    FaArrowLeft,
    FaEdit,
    FaEnvelope,
    FaIdCard,
    FaPhone,
    FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { usePersonContext } from "../../contexts/PersonContext";
// ============================================================
const PersonaDetail = () => {
    // ---------------------------------------------------------
    // Parámetros y navegación
    // ---------------------------------------------------------
    const { id } = useParams();
    const navigate = useNavigate();
    // ---------------------------------------------------------
    // Contexto
    // ---------------------------------------------------------
    const {
        selectedPerson,
        loading,
        error,
        loadPerson,
    } = usePersonContext();
    // ---------------------------------------------------------
    // Cargar persona
    // ---------------------------------------------------------
    useEffect(() => {
        if (id) {
            loadPerson(id);
        }
    }, [id, loadPerson]);
    // ---------------------------------------------------------
    // Navegación
    // ---------------------------------------------------------
    const handleBack = () => {
        navigate("/personas");
    };
    const handleEdit = () => {
        navigate(`/personas/${id}/editar`);
    };
    // ---------------------------------------------------------
    // Cargando
    // ---------------------------------------------------------
    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">
                        Cargando persona...
                    </span>
                </Spinner>
            </div>
        );
    }
    // ---------------------------------------------------------
    // Error
    // ---------------------------------------------------------
    if (error) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        );
    }
    // ---------------------------------------------------------
    // Persona no encontrada
    // ---------------------------------------------------------
    if (!selectedPerson) {
        return (
            <Alert variant="warning">
                No se encontró la persona solicitada.
            </Alert>
        );
    }
    // ---------------------------------------------------------
    // Datos
    // ---------------------------------------------------------
    const {
        nombres,
        apellidos,
        rut,
        correo,
        telefono,
        estado,
    } = selectedPerson;

    const estadoActivo = estado === "ACTIVO";
    // ---------------------------------------------------------
    // Render
    // ---------------------------------------------------------
    return (
        <div className="container-fluid py-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h2 className="mb-1">
                        Detalle de Persona
                    </h2>
                    <p className="text-muted mb-0">
                        Información registrada de la persona.
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <Button
                        variant="outline-secondary"
                        onClick={handleBack}
                    >
                        <FaArrowLeft className="me-2" />
                        Volver
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleEdit}
                    >
                        <FaEdit className="me-2" />
                        Editar
                    </Button>
                </div>
            </div>
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-white border-bottom py-3">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="persona-detail-icon">
                                <FaUser />
                            </div>
                            <div>
                                <h4 className="mb-1">
                                    {nombres} {apellidos}
                                </h4>
                                <small className="text-muted">
                                    Persona registrada
                                </small>
                            </div>
                        </div>
                        <Badge
                            bg={estadoActivo ? "success" : "secondary"}
                            className="px-3 py-2"
                        >
                            {estado || "SIN ESTADO"}
                        </Badge>
                    </div>
                </Card.Header>
                <Card.Body className="p-4">
                    <Row className="g-4">
                        <Col xs={12} md={6}>
                            <div className="persona-detail-field">
                                <div className="persona-detail-label">
                                    <FaUser className="me-2" />
                                    Nombres
                                </div>
                                <div className="persona-detail-value">
                                    {nombres || "No informado"}
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="persona-detail-field">
                                <div className="persona-detail-label">
                                    <FaUser className="me-2" />
                                    Apellidos
                                </div>
                                <div className="persona-detail-value">
                                    {apellidos || "No informado"}
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="persona-detail-field">
                                <div className="persona-detail-label">
                                    <FaIdCard className="me-2" />
                                    RUT
                                </div>
                                <div className="persona-detail-value">
                                    {rut || "No informado"}
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="persona-detail-field">
                                <div className="persona-detail-label">
                                    <FaEnvelope className="me-2" />
                                    Correo electrónico
                                </div>
                                <div className="persona-detail-value">
                                    {correo || "No informado"}
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="persona-detail-field">
                                <div className="persona-detail-label">
                                    <FaPhone className="me-2" />
                                    Teléfono
                                </div>
                                <div className="persona-detail-value">
                                    {telefono || "No informado"}
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="persona-detail-field">
                                <div className="persona-detail-label">
                                    Estado
                                </div>
                                <div className="persona-detail-value">
                                    <Badge
                                        bg={
                                            estadoActivo
                                                ? "success"
                                                : "secondary"
                                        }
                                    >
                                        {estado || "SIN ESTADO"}
                                    </Badge>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};
export default PersonaDetail;