// ============================================================
// AuthContext.jsx
// ------------------------------------------------------------
// Contexto global de autenticación.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Mantener la sesión del usuario.
// • Exponer login.
// • Exponer register.
// • Exponer logout.
// • Compartir currentUser.
// • Administrar loading.
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    onAuthStateChanged
} from "firebase/auth";

import { auth } from "../firebase";

import {
    login,
    register,
    logout
} from "../services/authService";
// ============================================================
// CONTEXTO
// ============================================================
const AuthContext = createContext();
// ============================================================
// HOOK PERSONALIZADO
// ============================================================
export const useAuth = () => {
    return useContext(AuthContext);
};
// ============================================================
// PROVIDER
// ============================================================
export const AuthProvider = ({ children }) => {
    //----------------------------------------------------------
    // Usuario autenticado.
    //----------------------------------------------------------
    const [currentUser, setCurrentUser] = useState(null);
    //----------------------------------------------------------
    // Estado de carga.
    //----------------------------------------------------------
    const [loading, setLoading] = useState(true);
    //----------------------------------------------------------
    // Iniciar sesión.
    //----------------------------------------------------------
    const signIn = async (email, password) => {
        return await login(email, password);
    };
    //----------------------------------------------------------
    // Registrar usuario.
    //----------------------------------------------------------
    const signUp = async (
        nombre,
        email,
        password
    ) => {
        return await register(
            nombre,
            email,
            password
        );
    };
    //----------------------------------------------------------
    // Cerrar sesión.
    //----------------------------------------------------------
    const signOut = async () => {
        return await logout();
    };
    //----------------------------------------------------------
    // Escuchar cambios de autenticación.
    //----------------------------------------------------------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                setCurrentUser(user);
                setLoading(false);
            }
        );
        return unsubscribe;
    }, []);
    //----------------------------------------------------------
    // Información compartida.
    //----------------------------------------------------------
    const value = {
        currentUser,
        login: signIn,
        register: signUp,
        logout: signOut,
        loading
    };
    //----------------------------------------------------------
    // Esperamos que Firebase determine la sesión.
    //----------------------------------------------------------
    if (loading) {
        return null;
    }
    //----------------------------------------------------------
    // Provider.
    //----------------------------------------------------------
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
// ============================================================
// EXPORTACIÓN
// ============================================================
export default AuthContext;