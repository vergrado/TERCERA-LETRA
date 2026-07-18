// ============================================================
// CaseForm.jsx
// ------------------------------------------------------------
// Formulario reutilizable para crear y editar Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Ensamblar los componentes visuales.
// • Utilizar el hook useCaseForm.
// • Mostrar mensajes de error.
//
// Toda la lógica se encuentra en:
//
// hooks/useCaseForm.js
//
// ============================================================
// ============================================================
// IMPORTACIONES
// ============================================================
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import useCaseForm from "../../hooks/useCaseForm";
import CaseBasicFields from "./CaseBasicFields";
import CaseStatusFields from "./CaseStatusFields";
import CaseButtons from "./CaseButtons";
// ============================================================
// COMPONENTE
// ============================================================
const CaseForm = ({
    editMode = false,
    caseData = null
}) => {
    //----------------------------------------------------------
    // Hook del formulario
    //----------------------------------------------------------
    const {
        titulo,
        setTitulo,
        descripcion,
        setDescripcion,
        institucion,
        setInstitucion,
         persons,
        personaId,
        setPersonaId,
        estado,
        setEstado,
        prioridad,
        setPrioridad,
        loading,
        error,
        handleSubmit
    } = useCaseForm(
        editMode,
        caseData
    );
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Interfaz
    //----------------------------------------------------------
    return (
        <Card className="shadow">
            <Card.Body>
                <h3 className="mb-4">
                    {
                        editMode
                            ? "Editar Caso"
                            : "Nuevo Caso"
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
                    <CaseBasicFields
                        titulo={titulo}
                        setTitulo={setTitulo}

                        descripcion={descripcion}
                        setDescripcion={setDescripcion}

                        institucion={institucion}
                        setInstitucion={setInstitucion}

                        persons={persons}
                        personaId={personaId}
                        setPersonaId={setPersonaId}
                    />
                    <CaseStatusFields
                        estado={estado}
                        setEstado={setEstado}
                        prioridad={prioridad}
                        setPrioridad={setPrioridad}
                    />
                    <CaseButtons
                        loading={loading}
                        editMode={editMode}
                        onCancel={() =>
                            navigate("/casos")
                        }
                    />
                </Form>
            </Card.Body>
        </Card>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default CaseForm;