// ============================================================
// useCaseForm.js
// ------------------------------------------------------------
// Hook encargado de administrar toda la lógica del formulario
// de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Crear casos.
// • Editar casos.
// • Validar formulario.
// • Administrar estados.
// • Navegación.
// • Integración con AuthContext.
// • Integración con CaseContext.
//
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import {
    useState,
    useEffect
} from "react";
import {
    useNavigate
} from "react-router-dom";
import {
    useAuth
} from "../contexts/AuthContext";
import {
    useCaseContext
} from "../contexts/CaseContext";
// ============================================================
// HOOK
// ============================================================
const useCaseForm = (
    editMode = false,
    caseData = null
) => {
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
    // Estados del formulario
    //----------------------------------------------------------
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [institucion, setInstitucion] = useState("");
    const [estado, setEstado] = useState("PENDIENTE");
    const [prioridad, setPrioridad] = useState("MEDIA");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //----------------------------------------------------------
    // Cargar datos cuando es edición
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
    // Guardar formulario
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
        // Usuario autenticado
        //------------------------------------------------------
        if (!currentUser) {
            setError(
                "Debe iniciar sesión nuevamente."
            );
            return;
        }
        try {
            setLoading(true);
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
                "No fue posible guardar el caso."
            );
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Información compartida
    //----------------------------------------------------------
    return {
        titulo,
        setTitulo,
        descripcion,
        setDescripcion,
        institucion,
        setInstitucion,
        estado,
        setEstado,
        prioridad,
        setPrioridad,
        loading,
        error,
        handleSubmit
    };
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default useCaseForm;