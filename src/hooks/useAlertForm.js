// ============================================================
// useAlertForm.js
// ------------------------------------------------------------
// Hook encargado de administrar la lógica del formulario
// de Alertas.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import {
    useEffect,
    useState
} from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useAlertContext } from "../contexts/AlertContext";
import { usePersonContext } from "../contexts/PersonContext";
import { useCaseContext } from "../contexts/CaseContext";
import { useToast } from "../contexts/ToastContext";
// ============================================================
const useAlertForm = (
    editMode = false,
    alertData = null
) => {
    //----------------------------------------------------------
    // Contextos
    //----------------------------------------------------------
    const {
        currentUser,
        profile
    } = useAuth();
    const {
        addAlert,
        editAlert
    } = useAlertContext();
    const {
        persons = []
    } = usePersonContext();
    const {
        cases = []
    } = useCaseContext();
    const {
        showToast
    } = useToast();
    //----------------------------------------------------------
    // Navegación y parámetros
    //----------------------------------------------------------
    const navigate = useNavigate();
    const [searchParams] =
        useSearchParams();
    const personaIdFromUrl =
        searchParams.get("personaId");
    const casoIdFromUrl =
        searchParams.get("casoId");
    //----------------------------------------------------------
    // Estados del formulario
    //----------------------------------------------------------
    const [titulo, setTitulo] =
        useState("");
    const [descripcion, setDescripcion] =
        useState("");
    const [tipo, setTipo] =
        useState("");
    const [prioridad, setPrioridad] =
        useState("Media");
    const [estado, setEstado] =
        useState("Pendiente");
    const [
        fechaVencimiento,
        setFechaVencimiento
    ] = useState("");

    const [personaId, setPersonaId] =
        useState("");
    const [casoId, setCasoId] =
        useState("");
    const [notificar, setNotificar] =
        useState(true);
    const [
        observaciones,
        setObservaciones
    ] = useState("");
    const [loading, setLoading] =
        useState(false);
    const [error, setError] =
        useState("");
    //----------------------------------------------------------
    // Convertir fecha a formato YYYY-MM-DD
    //----------------------------------------------------------
    const formatDateForInput = (dateValue) => {
        if (!dateValue) {
            return "";
        }
        if (dateValue?.toDate) {
            const firebaseDate =
                dateValue.toDate();

            return firebaseDate
                .toISOString()
                .split("T")[0];
        }
        if (
            typeof dateValue === "string" &&
            /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
        ) {
            return dateValue;
        }
        const parsedDate =
            new Date(dateValue);
        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "";
        }
        return parsedDate
            .toISOString()
            .split("T")[0];
    };
    //----------------------------------------------------------
    // Cargar datos en modo edición
    //----------------------------------------------------------
    useEffect(() => {
        if (
            !editMode ||
            !alertData
        ) {
            return;
        }
        setTitulo(
            alertData.titulo ?? ""
        );
        setDescripcion(
            alertData.descripcion ?? ""
        );
        setTipo(
            alertData.tipo ?? ""
        );
        setPrioridad(
            alertData.prioridad ?? "Media"
        );
        setEstado(
            alertData.estado ?? "Pendiente"
        );
        setFechaVencimiento(
            formatDateForInput(
                alertData.fechaVencimiento
            )
        );
        setPersonaId(
            alertData.personaId ?? ""
        );
        setCasoId(
            alertData.casoId ?? ""
        );
        setNotificar(
            alertData.notificar ?? true
        );
        setObservaciones(
            alertData.observaciones ?? ""
        );
    }, [
        editMode,
        alertData
    ]);
    //----------------------------------------------------------
    // Persona recibida mediante URL
    //----------------------------------------------------------
    useEffect(() => {
        if (
            editMode ||
            !personaIdFromUrl ||
            persons.length === 0
        ) {
            return;
        }
        const personExists =
            persons.some(
                (person) =>
                    person.id === personaIdFromUrl
            );
        if (personExists) {
            setPersonaId(
                personaIdFromUrl
            );
        }
    }, [
        editMode,
        personaIdFromUrl,
        persons
    ]);
    //----------------------------------------------------------
    // Caso recibido mediante URL
    //----------------------------------------------------------
    useEffect(() => {
        if (
            editMode ||
            !casoIdFromUrl ||
            cases.length === 0
        ) {
            return;
        }
        const selectedCase =
            cases.find(
                (caseItem) =>
                    caseItem.id === casoIdFromUrl
            );
        if (!selectedCase) {
            return;
        }
        setCasoId(
            casoIdFromUrl
        );
        if (
            selectedCase.personaId
        ) {
            setPersonaId(
                selectedCase.personaId
            );
        }
    }, [
        editMode,
        casoIdFromUrl,
        cases
    ]);
    //----------------------------------------------------------
    // Mantener persona sincronizada con el caso
    //----------------------------------------------------------
    useEffect(() => {
        if (!casoId) {
            return;
        }
        const selectedCase =
            cases.find(
                (caseItem) =>
                    caseItem.id === casoId
            );
        if (
            selectedCase?.personaId
        ) {
            setPersonaId(
                selectedCase.personaId
            );
        }
    }, [
        casoId,
        cases
    ]);
    //----------------------------------------------------------
    // Guardar formulario
    //----------------------------------------------------------
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        //------------------------------------------------------
        // Validación de campos obligatorios
        //------------------------------------------------------
        if (
            !titulo.trim() ||
            !tipo ||
            !prioridad ||
            !estado ||
            !fechaVencimiento
        ) {
            setError(
                "Debe completar todos los campos obligatorios."
            );
            return;
        }
        //------------------------------------------------------
        // Validar asociación
        //------------------------------------------------------
        if (
            !personaId &&
            !casoId
        ) {
            setError(
                "Debe asociar la alerta a una persona o a un caso."
            );
            return;
        }
        //------------------------------------------------------
        // Validar usuario
        //------------------------------------------------------
        if (!currentUser) {
            setError(
                "Debe iniciar sesión nuevamente."
            );

            return;
        }
        //------------------------------------------------------
        // Validar funciones del contexto
        //------------------------------------------------------
        if (
            !editMode &&
            typeof addAlert !== "function"
        ) {
            setError(
                "La función para crear alertas no está disponible."
            );

            return;
        }
        if (
            editMode &&
            typeof editAlert !== "function"
        ) {
            setError(
                "La función para editar alertas no está disponible."
            );
            return;
        }
        try {
            setLoading(true);
            //--------------------------------------------------
            // Persona seleccionada
            //--------------------------------------------------
            const selectedPerson =
                persons.find(
                    (person) =>
                        person.id === personaId
                );
            //--------------------------------------------------
            // Caso seleccionado
            //--------------------------------------------------
            const selectedCase =
                cases.find(
                    (caseItem) =>
                        caseItem.id === casoId
                );
            //--------------------------------------------------
            // Datos de la alerta
            //--------------------------------------------------
            const formData = {
                titulo:
                    titulo.trim(),
                descripcion:
                    descripcion.trim(),
                tipo,
                prioridad,
                estado,
                fechaVencimiento,
                personaId,
                personaNombre:
                    selectedPerson
                        ? `${selectedPerson.nombres || ""} ${
                            selectedPerson.apellidos || ""
                        }`.trim()
                        : "",
                personaRut:
                    selectedPerson?.rut ?? "",
                casoId,
                casoTitulo:
                    selectedCase?.titulo ?? "",
                notificar:
                    Boolean(notificar),
                observaciones:
                    observaciones.trim(),
                responsableUid:
                    currentUser.uid,
                responsableNombre:
                    profile?.nombre ??
                    currentUser.email,
                responsableEmail:
                    currentUser.email
            };
            //--------------------------------------------------
            // Editar alerta
            //--------------------------------------------------
            if (editMode) {
                if (!alertData?.id) {
                    throw new Error(
                        "No se encontró el identificador de la alerta."
                    );
                }
                await editAlert(
                    alertData.id,
                    formData
                );
                showToast(
                    "Alerta actualizada",
                    "La alerta fue actualizada correctamente.",
                    "warning"
                );
            }
            //--------------------------------------------------
            // Crear alerta
            //--------------------------------------------------
            else {
                await addAlert(
                    formData
                );
                showToast(
                    "Alerta creada",
                    "La alerta fue registrada correctamente.",
                    "success"
                );
            }
            //--------------------------------------------------
            // Navegación posterior
            //--------------------------------------------------
            if (
                !editMode &&
                casoIdFromUrl
            ) {
                navigate(
                    `/casos/${casoIdFromUrl}`
                );
            } else if (
                !editMode &&
                personaIdFromUrl
            ) {
                navigate(
                    `/personas/${personaIdFromUrl}`
                );
            } else {
                navigate("/alertas");
            }
        } catch (submitError) {
            console.error(
                "Error al guardar la alerta:",
                submitError
            );
            setError(
                "No fue posible guardar la alerta."
            );
            showToast(
                "Error",
                "No fue posible guardar la alerta.",
                "danger"
            );
        } finally {
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
    };
};
export default useAlertForm;