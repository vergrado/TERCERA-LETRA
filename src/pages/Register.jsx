// ============================================================
// Register.jsx
// ------------------------------------------------------------
// Pantalla de registro de usuarios.
//
// Esta vista únicamente se encarga de:
//
// • Capturar los datos del formulario.
// • Validar la información.
// • Mostrar mensajes al usuario.
// • Solicitar el registro mediante authService.
//
// Toda la comunicación con Firebase se encuentra
// centralizada en authService.js.
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Servicio encargado del registro.
import { register } from "../services/authService";
// ============================================================
// COMPONENTE
// ============================================================
const Register = () => {
    //----------------------------------------------------------
    // Navegación.
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Estados.
    //----------------------------------------------------------
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    //----------------------------------------------------------
    // Registro.
    //----------------------------------------------------------
    const handleRegister = async (event) => {
        event.preventDefault();
        setError("");
        //------------------------------------------------------
        // Validación.
        //------------------------------------------------------
        if (!nombre || !email || !password) {
            setError("Debe completar todos los campos.");
            return;
        }
        setLoading(true);
        try {
            //--------------------------------------------------
            // Solicitamos el registro al servicio.
            //--------------------------------------------------
            await register(
                nombre,
                email,
                password
            );
            //--------------------------------------------------
            // Redireccionamos al Dashboard.
            //--------------------------------------------------
            navigate("/dashboard");
        }
        catch (error) {
            //--------------------------------------------------
            // Interpretamos los errores de Firebase.
            //--------------------------------------------------
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("El correo electrónico ya se encuentra registrado.");
                    break;
                case "auth/weak-password":
                    setError("La contraseña debe tener al menos 6 caracteres.");
                    break;
                case "auth/invalid-email":
                    setError("El correo electrónico no es válido.");
                    break;
                case "auth/network-request-failed":
                    setError("No fue posible conectarse a Internet.");
                    break;
                default:
                    setError("Ha ocurrido un error al registrar el usuario.");
            }
        }
        finally {
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // Interfaz.
    //----------------------------------------------------------
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-5 col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">
                                Crear Cuenta
                            </h2>
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Nombre Completo
                                    </label>
                                    <input
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                {
                                    error && (
                                        <div className="alert alert-danger">
                                            {error}
                                        </div>
                                    )
                                }
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {
                                        loading
                                            ? "Creando usuario..."
                                            : "Registrarse"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;