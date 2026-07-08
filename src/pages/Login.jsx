// ============================================================
// Login.jsx
// ------------------------------------------------------------
// Pantalla de inicio de sesión.
//
// Esta vista únicamente se encarga de:
//
// • Capturar los datos ingresados por el usuario.
// • Validar los campos.
// • Mostrar mensajes de error.
// • Llamar al servicio de autenticación.
//
// Toda la lógica relacionada con Firebase se encuentra
// centralizada en authService.js.
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
// Hook para administrar estados locales.
import { useState } from "react";
// Hook utilizado para cambiar de página.
import { useNavigate } from "react-router-dom";
// Servicio encargado de la autenticación.
import { login } from "../services/authService";
// ============================================================
// COMPONENTE LOGIN
// ============================================================
const Login = () => {
    //----------------------------------------------------------
    // Hook de navegación.
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Estado del correo electrónico.
    //----------------------------------------------------------
    const [email, setEmail] = useState("");
    //----------------------------------------------------------
    // Estado de la contraseña.
    //----------------------------------------------------------
    const [password, setPassword] = useState("");
    //----------------------------------------------------------
    // Estado para mostrar errores.
    //----------------------------------------------------------
    const [error, setError] = useState("");
    //----------------------------------------------------------
    // Estado para mostrar carga.
    //----------------------------------------------------------
    const [loading, setLoading] = useState(false);
    //----------------------------------------------------------
    // Función encargada del inicio de sesión.
    //----------------------------------------------------------
    const handleLogin = async (event) => {
        //------------------------------------------------------
        // Evitamos que el formulario recargue la página.
        //------------------------------------------------------
        event.preventDefault();
        //------------------------------------------------------
        // Limpiamos errores anteriores.
        //------------------------------------------------------
        setError("");
        //------------------------------------------------------
        // Validación de campos obligatorios.
        //------------------------------------------------------
        if (!email || !password) {
            setError("Debe completar todos los campos.");
            return;
        }
        //------------------------------------------------------
        // Activamos indicador de carga.
        //------------------------------------------------------
        setLoading(true);
        try {
            //--------------------------------------------------
            // Solicitamos el inicio de sesión.
            //
            // Login.jsx ya NO conoce Firebase.
            // Toda la comunicación se realiza mediante
            // authService.js
            //--------------------------------------------------
            await login(
                email,
                password
            );
            //--------------------------------------------------
            // Si el inicio de sesión fue exitoso,
            // redireccionamos al Dashboard.
            //--------------------------------------------------
            navigate("/dashboard");
        }
        catch (error) {
            //--------------------------------------------------
            // Interpretamos el código devuelto por Firebase.
            //--------------------------------------------------
            switch (error.code) {
                case "auth/invalid-credential":
                    setError("Correo electrónico o contraseña incorrectos.");
                    break;
                case "auth/user-not-found":
                    setError("El usuario no existe.");
                    break;
                case "auth/wrong-password":
                    setError("La contraseña es incorrecta.");
                    break;
                case "auth/network-request-failed":
                    setError("No fue posible conectarse a Internet.");

                    break;
                case "auth/too-many-requests":

                    setError("Demasiados intentos. Intente nuevamente más tarde.");
                    break;
                default:
                    setError("Ha ocurrido un error inesperado.");
            }
        }
        finally {
            //--------------------------------------------------
            // Independiente del resultado,
            // desactivamos el indicador de carga.
            //--------------------------------------------------
            setLoading(false);
        }
    };
    //----------------------------------------------------------
    // INTERFAZ
    //----------------------------------------------------------
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-5 col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">
                                TERCERA LETRA
                            </h2>
                            <form onSubmit={handleLogin}>
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
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {
                                        loading
                                            ? "Ingresando..."
                                            : "Iniciar Sesión"
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
// ============================================================
// EXPORTACIÓN DEL COMPONENTE
// ============================================================
export default Login;