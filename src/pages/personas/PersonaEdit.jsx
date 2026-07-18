// ============================================================
// PersonaEdit.jsx
// ------------------------------------------------------------
// Página para editar una persona existente.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PersonaForm from "../../components/personas/PersonaForm";
import { usePersonContext } from "../../contexts/PersonContext";
// ============================================================
const PersonaEdit = () => {
    // ---------------------------------------------------------
    // Parámetros
    // ---------------------------------------------------------
    const { id } = useParams();
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
                No se encontró la persona que deseas editar.
            </Alert>
        );
    }
    // ---------------------------------------------------------
    // Render
    // ---------------------------------------------------------
    return (
        <div className="container-fluid py-4">
            <div className="mb-4">
                <h2 className="mb-1">
                    Editar Persona
                </h2>
                <p className="text-muted mb-0">
                    Modifica los datos registrados de la persona.
                </p>
            </div>
            <PersonaForm
                person={selectedPerson}
                isEdit
            />
        </div>
    );
};
export default PersonaEdit;