// ============================================================
// PersonaForm.jsx
// ------------------------------------------------------------
// Formulario reutilizable para crear y editar personas.
// ============================================================
import { Card, Form } from "react-bootstrap";
import usePersonForm from "../../hooks/usePersonForm";
import PersonaBasicFields from "./PersonaBasicFields";
import PersonaButtons from "./PersonaButtons";
// ============================================================
const PersonaForm = ({
    person = null,
    isEdit = false,
}) => {

    const {
        formData,
        errors,
        loading,
        handleChange,
        handleSubmit,
        handleCancel,
    } = usePersonForm({
        person,
        isEdit,
    });
    return (
        <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    <PersonaBasicFields
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                    />
                    <PersonaButtons
                        loading={loading}
                        isEdit={isEdit}
                        onCancel={handleCancel}
                    />
                </Form>
            </Card.Body>
        </Card>
    );
};
export default PersonaForm;