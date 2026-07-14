// ============================================================
// CaseForm.jsx
// ------------------------------------------------------------
// Formulario reutilizable para crear y editar casos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import {
    Form,
    Button,
    Card,
    Alert,
    Spinner
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useCaseContext } from "../../contexts/CaseContext";
const CaseForm = ({
    editMode = false,
    caseData = null
}) => {

    //----------------------------------------------------------
    // Usuario autenticado
    //----------------------------------------------------------

    const {
        currentUser,
        profile
    } = useAuth();

    //----------------------------------------------------------
    // Contexto de Casos
    //----------------------------------------------------------

    const {
        addCase,
        editCase
    } = useCaseContext();

    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------

    const navigate = useNavigate();
    //----------------------------------------------------------
    // Estados
    //----------------------------------------------------------
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [institucion, setInstitucion] = useState("");
    const [estado, setEstado] = useState("PENDIENTE");
    const [prioridad, setPrioridad] = useState("MEDIA");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //----------------------------------------------------------
    // Cargar datos cuando se edita
    //----------------------------------------------------------
    useEffect(() => {
        if (!editMode || !caseData) return;
        setTitulo(caseData.titulo ?? "");
        setDescripcion(caseData.descripcion ?? "");
        setInstitucion(caseData.institucion ?? "");
        setEstado(caseData.estado ?? "PENDIENTE");
        setPrioridad(caseData.prioridad ?? "MEDIA");
    }, [editMode, caseData]);
    //----------------------------------------------------------
    // Guardar caso
    //----------------------------------------------------------
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        //------------------------------------------------------
        // Validación
        //------------------------------------------------------
        if (
            !titulo.trim() ||
            !descripcion.trim() ||
            !institucion.trim()
        ) {
            setError(
                "Debe completar todos los campos obligatorios."
            );
            return;
        }
        //------------------------------------------------------
        // Validar sesión
        //------------------------------------------------------
        if (!currentUser) {
            setError(
                "Debe iniciar sesión nuevamente."
            );
            return;
        }
        try {
            setLoading(true);
            //await addCase({
             //   titulo,
             //    descripcion,
             //    institucion,
             //    estado,
             //    prioridad,
             //    responsableUid: currentUser.uid,
             //    responsableNombre:
             //        profile?.nombre ??
             //        currentUser.email,
             //    responsableEmail:
            //         currentUser.email,
            //     observaciones: "",
             //    archivado: false
            // });
             const formData = {
            titulo,
            descripcion,
            institucion,
            estado,
            prioridad,
            responsableUid: currentUser.uid,
            responsableNombre:
                profile?.nombre ??
                currentUser.email,
            responsableEmail:
                currentUser.email,
            observaciones:
                caseData?.observaciones ?? "",
            archivado:
                caseData?.archivado ?? false
        };
        if (editMode) {
            await editCase(
                caseData.id,
                formData
            );
        }
        else {
            await addCase(formData);

        }
            navigate("/casos");
        }
        catch (err) {
            console.error(err);
            setError(
                "No fue posible registrar el caso."
            );
        }
        finally {
            setLoading(false);
        }
    };
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
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Título
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el título del caso"
                            value={titulo}
                            onChange={(e) =>
                                setTitulo(e.target.value)
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Descripción
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Descripción del caso"
                            value={descripcion}
                            onChange={(e) =>
                                setDescripcion(e.target.value)
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Institución
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Institución relacionada"
                            value={institucion}
                            onChange={(e) =>
                                setInstitucion(e.target.value)
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Estado
                        </Form.Label>
                        <Form.Select
                            value={estado}
                            onChange={(e) =>
                                setEstado(e.target.value)
                            }
                        >
                            <option value="PENDIENTE">
                                PENDIENTE
                            </option>
                            <option value="EN PROCESO">
                                EN PROCESO
                            </option>
                            <option value="FINALIZADO">
                                FINALIZADO
                            </option>
                            <option value="ARCHIVADO">
                                ARCHIVADO
                            </option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>
                            Prioridad
                        </Form.Label>
                        <Form.Select
                            value={prioridad}
                            onChange={(e) =>
                                setPrioridad(e.target.value)
                            }
                        >
                            <option value="ALTA">
                                ALTA
                            </option>
                            <option value="MEDIA">
                                MEDIA
                            </option>
                            <option value="BAJA">
                                BAJA
                            </option>
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex gap-2">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {
                                loading
                                    ? (
                                        <>
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                            />
                                            Guardando...
                                        </>
                                    )
                                    //: "Guardar Caso"
                                    : editMode
                                    ? "Actualizar Caso"
                                    : "Guardar Caso"

                            }
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() =>
                                navigate("/casos")
                            }
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CaseForm;