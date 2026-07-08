// ============================================================
// ProtectedRoute.jsx
// ------------------------------------------------------------
// Este componente protege las rutas privadas de la aplicación.
//
// Antes de mostrar una página verifica:
//
// • Si existe un usuario autenticado.
//
// Si el usuario NO ha iniciado sesión,
// será enviado automáticamente al Login.
//
// Este patrón es utilizado en aplicaciones profesionales
// desarrolladas con React.
// ============================================================


// ------------------------------------------------------------
// Importamos Navigate.
//
// Navigate permite redireccionar automáticamente
// a otra ruta.
// ------------------------------------------------------------

import { Navigate } from "react-router-dom";


// ------------------------------------------------------------
// Importamos nuestro contexto de autenticación.
//
// Gracias al contexto podemos conocer si existe
// un usuario autenticado.
// ------------------------------------------------------------
import { useAuth } from "../contexts/AuthContext";
// ------------------------------------------------------------
// Componente ProtectedRoute.
//
// Recibe como propiedad:
//
// children
//
// que corresponde al componente que deseamos proteger.
// ------------------------------------------------------------

const ProtectedRoute = ({ children }) => {
    // --------------------------------------------------------
    // Obtenemos el usuario autenticado desde el contexto.
    // --------------------------------------------------------
    const { user } = useAuth();
    // --------------------------------------------------------
    // Si no existe usuario,
    // enviamos automáticamente al Login.
    // --------------------------------------------------------
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    // --------------------------------------------------------
    // Si existe usuario,
    // mostramos la página solicitada.
    // --------------------------------------------------------
    return children;
};
// ------------------------------------------------------------
// Exportamos el componente.
// ------------------------------------------------------------
export default ProtectedRoute;