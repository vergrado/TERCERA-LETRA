// ============================================================
// usePersonForm.js
// ------------------------------------------------------------
// Lógica del formulario para crear y editar personas.
// ============================================================
import {
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import { usePersonContext } from "../contexts/PersonContext";
import { useToast } from "../contexts/ToastContext";
// ============================================================
const initialFormData = {
    nombres: "",
    apellidos: "",
    rut: "",
    correo: "",
    telefono: "",
    estado: "ACTIVO"
};
// ============================================================
const usePersonForm = ({
    person = null,
    isEdit = false
} = {}) => {
    const navigate = useNavigate();
    const {
        addPerson,
        editPerson
    } = usePersonContext();
    const { showToast } = useToast();
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    // ---------------------------------------------------------
    // Cargar datos al editar
    // ---------------------------------------------------------
    useEffect(() => {
        if (!person) {
            return;
        }
        setFormData({
            nombres: person.nombres || "",
            apellidos: person.apellidos || "",
            rut: person.rut || "",
            correo: person.correo || "",
            telefono: person.telefono || "",
            estado: person.estado || "ACTIVO"
        });
    }, [person]);
    // ---------------------------------------------------------
    // Cambios en campos
    // ---------------------------------------------------------
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: ""
        }));
    };

    // ---------------------------------------------------------
    // Validación
    // ---------------------------------------------------------
    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombres.trim()) {
            newErrors.nombres = "Los nombres son obligatorios.";
        }
        if (!formData.apellidos.trim()) {
            newErrors.apellidos = "Los apellidos son obligatorios.";
        }
        if (!formData.rut.trim()) {
            newErrors.rut = "El RUT es obligatorio.";
        }
        if (!formData.correo.trim()) {
            newErrors.correo = "El correo es obligatorio.";
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    // ---------------------------------------------------------
    // Guardar
    // ---------------------------------------------------------
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true);
            if (isEdit && person?.id) {
                await editPerson(person.id, formData);
                showToast(
                    "Persona actualizada correctamente.",
                    "success"
                );
            } else {
                await addPerson(formData);

                showToast(
                    "Persona creada correctamente.",
                    "success"
                );
            }
            navigate("/personas");
        } catch (error) {
            console.error(
                "Error al guardar la persona:",
                error
            );
            showToast(
                isEdit
                    ? "No fue posible actualizar la persona."
                    : "No fue posible crear la persona.",
                "danger"
            );
        } finally {
            setLoading(false);
        }
    };
    // ---------------------------------------------------------
    // Cancelar
    // ---------------------------------------------------------
    const handleCancel = () => {
        navigate("/personas");
    };
    return {
        formData,
        errors,
        loading,
        handleChange,
        handleSubmit,
        handleCancel
    };
};
export default usePersonForm;