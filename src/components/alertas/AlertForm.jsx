// ============================================================
// AlertForm.jsx
// ------------------------------------------------------------
// Formulario reutilizable.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import useAlertForm from "../../hooks/useAlertForm";
import AlertBasicFields from "./AlertBasicFields";
import AlertAssociationFields from "./AlertAssociationFields";
import AlertButtons from "./AlertButtons";
const AlertForm = ({
    editMode = false,
    alertData = null
}) => {
    //----------------------------------------------------------
    // Hook
    //----------------------------------------------------------
    const {
        titulo,
        setTitulo,
        descripcion,
        setDescripcion,
        tipo,
        setTipo,
        prioridad,
        setPrioridad,
        estado,
        setEstado,
        fechaVencimiento,
        setFechaVencimiento,
        persons,
        personaId,
        setPersonaId,
        cases,
        casoId,
        setCasoId,
        notificar,
        setNotificar,
        observaciones,
        setObservaciones,
        loading,
        error,
        handleSubmit
    } = useAlertForm(
        editMode,
        alertData
    );
    //----------------------------------------------------------
    const navigate =
        useNavigate();
    //----------------------------------------------------------
    return (
        <Card className="shadow">
            <Card.Body>
                <h3 className="mb-4">
                    {
                        editMode
                            ? "Editar Alerta"
                            : "Nueva Alerta"
                    }
                </h3>
                {
                    error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )
                }
                <Form onSubmit={handleSubmit}>
                    <AlertBasicFields
                        titulo={titulo}
                        setTitulo={setTitulo}
                        descripcion={descripcion}
                        setDescripcion={setDescripcion}
                        tipo={tipo}
                        setTipo={setTipo}
                        prioridad={prioridad}
                        setPrioridad={setPrioridad}
                        estado={estado}
                        setEstado={setEstado}
                        fechaVencimiento={fechaVencimiento}
                        setFechaVencimiento={setFechaVencimiento}
                        notificar={notificar}
                        setNotificar={setNotificar}
                        observaciones={observaciones}
                        setObservaciones={setObservaciones}
                    />
                    <AlertAssociationFields
                        persons={persons}
                        personaId={personaId}
                        setPersonaId={setPersonaId}
                        cases={cases}
                        casoId={casoId}
                        setCasoId={setCasoId}
                    />
                    <AlertButtons
                        loading={loading}
                        editMode={editMode}
                        onCancel={() =>
                            navigate("/alertas")
                        }
                    />
                </Form>
            </Card.Body>
        </Card>
    );
};
export default AlertForm;