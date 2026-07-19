// ============================================================
// useDocumentForm.js
// ------------------------------------------------------------
// Hook encargado de administrar toda la lógica del formulario
// de Documentos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Crear documentos.
// • Editar documentos.
// • Validar formulario.
// • Asociar documentos a Personas y Casos.
// • Administrar estados.
// • Navegación.
// • Integración con AuthContext.
// • Integración con DocumentContext.
//
// Nota:
// La subida física del archivo a Firebase Storage se integrará
// en el siguiente paso.
// ============================================================
// ============================================================
// IMPORTACIONES
// ============================================================
import {
    useEffect,
    useState
} from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";
import {
    useAuth
} from "../contexts/AuthContext";
import {
    useDocumentContext
} from "../contexts/DocumentContext";
import {
    usePersonContext
} from "../contexts/PersonContext";
import {
    useCaseContext
} from "../contexts/CaseContext";
import {
    useToast
} from "../contexts/ToastContext";
// ============================================================
// HOOK
// ============================================================
const useDocumentForm = (
    editMode = false,
    documentData = null
) => {
    //----------------------------------------------------------
    // Usuario autenticado
    //----------------------------------------------------------
    const {
        currentUser,
        profile
    } = useAuth();
    //----------------------------------------------------------
    // Contexto de Documentos
    //----------------------------------------------------------
    const {
        addDocument,
        editDocument
    } = useDocumentContext();
    //----------------------------------------------------------
    // Contexto de Personas
    //----------------------------------------------------------
    const {
        persons = []
    } = usePersonContext();
    //----------------------------------------------------------
    // Contexto de Casos
    //----------------------------------------------------------
    const {
        cases = []
    } = useCaseContext();
    //----------------------------------------------------------
    // Navegación y parámetros URL
    //----------------------------------------------------------
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const personaIdFromUrl = searchParams.get("personaId");
    const casoIdFromUrl = searchParams.get("casoId");
    //----------------------------------------------------------
    // Toasts
    //----------------------------------------------------------
    const {
        showToast
    } = useToast();
    //----------------------------------------------------------
    // Estados del formulario
    //----------------------------------------------------------
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [fechaDocumento, setFechaDocumento] = useState("");
    const [personaId, setPersonaId] = useState("");
    const [casoId, setCasoId] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //----------------------------------------------------------
    // Cargar datos en modo edición
    //----------------------------------------------------------
    useEffect(() => {
        if (!editMode || !documentData) {
            return;
        }
        setTitulo(documentData.titulo ?? "");
        setDescripcion(documentData.descripcion ?? "");
        setCategoria(documentData.categoria ?? "");
        setPersonaId(documentData.personaId ?? "");
        setCasoId(documentData.casoId ?? "");
        if (documentData.fechaDocumento?.toDate) {
            const date = documentData.fechaDocumento.toDate();
            setFechaDocumento(
                date.toISOString().split("T")[0]
            );
        } else {
            setFechaDocumento(
                documentData.fechaDocumento ?? ""
            );
        }
    }, [
        editMode,
        documentData
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
        const personExists = persons.some(
            (person) => person.id === personaIdFromUrl
        );
        if (personExists) {
            setPersonaId(personaIdFromUrl);
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
        const caseExists = cases.some(
            (caseItem) => caseItem.id === casoIdFromUrl
        );
        if (caseExists) {
            setCasoId(casoIdFromUrl);
            const selectedCase = cases.find(
                (caseItem) => caseItem.id === casoIdFromUrl
            );
            if (
                selectedCase?.personaId &&
                !personaId
            ) {
                setPersonaId(selectedCase.personaId);
            }
        }
    }, [
        editMode,
        casoIdFromUrl,
        cases,
        personaId
    ]);
    //----------------------------------------------------------
    // Mantener Persona sincronizada con el Caso
    //----------------------------------------------------------
    useEffect(() => {
        if (!casoId) {
            return;
        }
        const selectedCase = cases.find(
            (caseItem) => caseItem.id === casoId
        );
        if (selectedCase?.personaId) {
            setPersonaId(selectedCase.personaId);
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
        // Validación
        //------------------------------------------------------
        if (
            !titulo.trim() ||
            !categoria.trim() ||
            !fechaDocumento
        ) {
            setError(
                "Debe completar todos los campos obligatorios."
            );
            return;
        }
        if (!personaId && !casoId) {
            setError(
                "Debe asociar el documento a una persona o a un caso."
            );
            return;
        }
        if (!editMode && !archivo) {
            setError(
                "Debe seleccionar un archivo."
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
            //--------------------------------------------------
            // Persona seleccionada
            //--------------------------------------------------
            const selectedPerson = persons.find(
                (person) => person.id === personaId
            );
            //--------------------------------------------------
            // Caso seleccionado
            //--------------------------------------------------
            const selectedCase = cases.find(
                (caseItem) => caseItem.id === casoId
            );
            //--------------------------------------------------
            // Datos del documento
            //--------------------------------------------------
            const formData = {
                titulo: titulo.trim(),
                descripcion: descripcion.trim(),
                categoria,
                fechaDocumento,
                // Archivo físico seleccionado
                archivo,
                personaId,
                personaNombre: selectedPerson
                    ? `${selectedPerson.nombres || ""} ${selectedPerson.apellidos || ""}`.trim()
                    : "",
                personaRut:
                    selectedPerson?.rut ?? "",
                casoId,
                casoTitulo:
                    selectedCase?.titulo ?? "",
                responsableUid:
                    currentUser.uid,
                responsableNombre:
                    profile?.nombre ??
                    currentUser.email,
                responsableEmail:
                    currentUser.email,
                nombreArchivo:
                    archivo?.name ??
                    documentData?.nombreArchivo ??
                    "",
                tipoArchivo:
                    archivo?.type ??
                    documentData?.tipoArchivo ??
                    "",
                tamano:
                    archivo?.size ??
                    documentData?.tamano ??
                    0,
                url:
                    documentData?.url ?? "",
                storagePath:
                    documentData?.storagePath ?? "",
                archivado:
                    documentData?.archivado ?? false
            };
            //--------------------------------------------------
            // Editar documento
            //--------------------------------------------------
            if (editMode) {
                await editDocument(
                    documentData.id,
                    formData
                );
                showToast(
                    "Documento actualizado",
                    "El documento fue actualizado correctamente.",
                    "warning"
                );
            }
            //--------------------------------------------------
            // Crear documento
            //--------------------------------------------------
            else {
                await addDocument(formData);

                showToast(
                    "Documento creado",
                    "El documento fue registrado correctamente.",
                    "success"
                );
            }
            //--------------------------------------------------
            // Navegación posterior
            //--------------------------------------------------
            if (!editMode && casoIdFromUrl) {
                navigate(`/casos/${casoIdFromUrl}`);
            } else if (!editMode && personaIdFromUrl) {
                navigate(`/personas/${personaIdFromUrl}`);
            } else {
                navigate("/documentos");
            }
        } catch (err) {
            console.error(
                "Error al guardar el documento:",
                err
            );
            setError(
                "No fue posible guardar el documento."
            );
            showToast(
                "Error",
                "No fue posible guardar el documento.",
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
        categoria,
        setCategoria,
        fechaDocumento,
        setFechaDocumento,
        persons,
        personaId,
        setPersonaId,
        cases,
        casoId,
        setCasoId,
        archivo,
        setArchivo,
        loading,
        error,
        handleSubmit
    };
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default useDocumentForm;