// ============================================================
// ProtectedRoute.jsx
// ============================================================
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const ProtectedRoute = ({ children }) => {
    const {
        currentUser,
        loading
    } = useAuth();
    //----------------------------------------------------------
    // Mientras Firebase verifica la sesión.
    //----------------------------------------------------------
    if (loading) {
        return <div>Cargando...</div>;
    }
    //----------------------------------------------------------
    // Usuario no autenticado.
    //----------------------------------------------------------
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    //----------------------------------------------------------
    // Usuario autenticado.
    //----------------------------------------------------------
    return children;
};
export default ProtectedRoute;