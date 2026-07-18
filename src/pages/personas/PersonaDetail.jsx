// ============================================================
// PersonaDetail.jsx
// ------------------------------------------------------------
// Página de detalle de una persona.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
//import { useEffect } from "react";
import {
    useEffect,
    useMemo,
} from "react";
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Row,
    Spinner,
    Table,
} from "react-bootstrap";
import {
    FaArrowLeft,
    FaEdit,
    FaEnvelope,
    FaEye,
    FaFolderOpen,
    FaIdCard,
    FaPhone,
    FaUser,
} from "react-icons/fa";
import TableActions from "../../components/common/TableActions";
import { useNavigate, useParams } from "react-router-dom";
import { usePersonContext } from "../../contexts/PersonContext";
import { useCaseContext } from "../../contexts/CaseContext";
// ============================================================
const PersonaDetail = () => {
    // ---------------------------------------------------------
    // Parámetros y navegación
    // ---------------------------------------------------------
    const { id } = useParams();
    const navigate = useNavigate();
    // ---------------------------------------------------------
    // Contexto de perssonas
    // ---------------------------------------------------------
    const {
        selectedPerson,
        loading: personLoading,
        error: personError,
        loadPerson,
    } = usePersonContext();
    // ---------------------------------------------------------
    // Contexto de Casos
    // ---------------------------------------------------------
    const {
        cases,
        loading: casesLoading,
        error: casesError,
        loadCases,
    } = useCaseContext();
    // ---------------------------------------------------------
    // Cargar persona
    // ---------------------------------------------------------
    useEffect(() => {
        if (id) {
            loadPerson(id);
        }
    }, [id, loadPerson]);
    // ---------------------------------------------------------
    // Cargar casos
    // ---------------------------------------------------------
    useEffect(() => {
        loadCases();
    }, [loadCases]);
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
    // Casos asociados a la persona
    // ---------------------------------------------------------
    const associatedCases = useMemo(() => {
        if (!id || !Array.isArray(cases)) {
            return [];
        }

        return cases.filter(
            (item) => item.personaId === id
        );
    }, [cases, id]);
    // ---------------------------------------------------------
    // Resumen de casos
    // ---------------------------------------------------------
    const caseSummary = useMemo(() => {
        return {
            total: associatedCases.length,
            pendientes: associatedCases.filter(
                c => c.estado === "PENDIENTE"
            ).length,

            proceso: associatedCases.filter(
                c => c.estado === "EN PROCESO"
            ).length,

            finalizados: associatedCases.filter(
                c => c.estado === "FINALIZADO"
            ).length,

            archivados: associatedCases.filter(
                c => c.estado === "ARCHIVADO"
            ).length,
        };
    }, [associatedCases]);
    // ---------------------------------------------------------
    // Estadísticas de la persona
    // ---------------------------------------------------------
    const personStats = useMemo(() => {
        const altas = associatedCases.filter(
            c => c.prioridad === "ALTA"
        ).length;

        const medias = associatedCases.filter(
            c => c.prioridad === "MEDIA"
        ).length;

        const bajas = associatedCases.filter(
            c => c.prioridad === "BAJA"
        ).length;

        return {
            altas,
            medias,
            bajas,
            tieneCasos: associatedCases.length > 0,
        };
    }, [associatedCases]);
    // ---------------------------------------------------------
    // Cargando
    // ---------------------------------------------------------
    //if (loading) {
    if (personLoading || casesLoading) {
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
    //if (error) {
        //return (
            //<Alert variant="danger">
               // {error}
            //</Alert>
        //);
    //}
    if (personError || casesError) {
    return (
        <Alert variant="danger">
            {personError || casesError}
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
    // Color Estado Caso
    // ---------------------------------------------------------
    const getEstadoBadge = (estado) => {
        switch (estado) {
            case "PENDIENTE":
                return "secondary";

            case "EN PROCESO":
                return "warning";

            case "FINALIZADO":
                return "success";

            case "ARCHIVADO":
                return "dark";

            default:
                return "primary";
        }
    };
    // ---------------------------------------------------------
    // Color Prioridad Caso
    // ---------------------------------------------------------
    const getPrioridadBadge = (prioridad) => {
        switch (prioridad) {
            case "ALTA":
                return "danger";
            case "MEDIA":
                return "warning";
            case "BAJA":
                return "success";
            default:
                return "secondary";
        }
    };
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
                <div className="d-flex flex-wrap gap-2">
                <Button
                    variant="outline-secondary"
                    onClick={handleBack}
                >
                    <FaArrowLeft className="me-2" />
                    Volver
                </Button>

                <Button
                    variant="outline-primary"
                    onClick={() =>
                        navigate(`/casos/nuevo?personaId=${id}`)
                    }
                >
                    <FaFolderOpen className="me-2" />
                    Nuevo Caso
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
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        <div>
                            <h5 className="mb-1">
                                <FaFolderOpen className="me-2" />
                                Casos asociados
                            </h5>

                            <small className="text-muted">
                                Casos registrados para esta persona.
                            </small>
                        </div>

                        <div className="d-flex flex-wrap justify-content-end gap-2">
                            <Badge bg="secondary" className="px-3 py-2">
                                Pendientes: {caseSummary.pendientes}
                            </Badge>

                            <Badge bg="warning" text="dark" className="px-3 py-2">
                                En proceso: {caseSummary.proceso}
                            </Badge>

                            <Badge bg="success" className="px-3 py-2">
                                Finalizados: {caseSummary.finalizados}
                            </Badge>

                            <Badge bg="dark" className="px-3 py-2">
                                Archivados: {caseSummary.archivados}
                            </Badge>

                            <Badge bg="primary" className="px-3 py-2">
                                Total: {caseSummary.total}
                            </Badge>
                        </div>
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
            <Row className="g-3 my-2">
                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="text-center">
                            <h2 className="text-danger mb-1">
                                {personStats.altas}
                            </h2>

                            <small className="text-muted">
                                Casos Alta Prioridad
                            </small>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="text-center">
                            <h2 className="text-warning mb-1">
                                {personStats.medias}
                            </h2>

                            <small className="text-muted">
                                Casos Prioridad Media
                            </small>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="text-center">
                            <h2 className="text-success mb-1">
                                {personStats.bajas}
                            </h2>

                            <small className="text-muted">
                                Casos Prioridad Baja
                            </small>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
            {/* -------------------------------------------------------
                Casos asociados
            ------------------------------------------------------- */}
            <Card className="shadow-sm border-0 mt-4">
                <Card.Header className="bg-white border-bottom py-3">
                    <div className="d-flex align-items-center justify-content-between gap-3">
                        <div>
                            <h5 className="mb-1">
                                <FaFolderOpen className="me-2" />
                                Casos asociados
                            </h5>

                            <small className="text-muted">
                                Casos registrados para esta persona.
                            </small>
                        </div>
                        <div className="d-flex flex-wrap justify-content-end gap-2">
                            <Badge bg="secondary" className="px-3 py-2">
                                Pendientes: {caseSummary.pendientes}
                            </Badge>

                            <Badge bg="warning" text="dark" className="px-3 py-2">
                                En proceso: {caseSummary.proceso}
                            </Badge>

                            <Badge bg="success" className="px-3 py-2">
                                Finalizados: {caseSummary.finalizados}
                            </Badge>

                            <Badge bg="dark" className="px-3 py-2">
                                Archivados: {caseSummary.archivados}
                            </Badge>

                            <Badge bg="primary" className="px-3 py-2">
                                Total: {caseSummary.total}
                            </Badge>
                        </div>
                    </div>
                </Card.Header>

                <Card.Body className="p-0">
                    {associatedCases.length === 0 ? (
                        <Alert
                            variant="light"
                            className="m-3 mb-3 border"
                        >
                            Esta persona no tiene casos asociados.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table
                                hover
                                responsive
                                className="mb-0 align-middle"
                            >
                                <thead className="table-light">
                                    <tr>
                                        <th>Título</th>
                                        <th>Tipo</th>
                                        <th>Estado</th>
                                        <th>Prioridad</th>
                                        <th className="text-end">
                                            Acción
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {associatedCases.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.titulo}</td>

                                            <td>
                                                {item.tipo ||
                                                    "No informado"}
                                            </td>

                                            <Badge bg={getEstadoBadge(item.estado)}>
                                                {item.estado}
                                            </Badge>
                                            <td>
                                                <Badge bg={getPrioridadBadge(item.prioridad)}>
                                                    {item.prioridad}
                                                </Badge>
                                            </td>

                                            <td className="text-end">
                                                <TableActions
                                                    onView={() =>
                                                        navigate(`/casos/${item.id}`)
                                                    }
                                                    onEdit={() =>
                                                        navigate(`/casos/${item.id}/editar`)
                                                    }
                                                    hideDelete
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};
export default PersonaDetail;