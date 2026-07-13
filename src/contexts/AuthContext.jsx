// ============================================================
// AuthContext.jsx
// ------------------------------------------------------------
// Contexto global de autenticación.
//
// Plataforma:
// TERCERA LETRA
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
import {
    doc,
    getDoc
} from "firebase/firestore";
import {
    auth,
    db
} from "../firebase";
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
// HOOK
// ============================================================
export const useAuth = () => {
    return useContext(AuthContext);
};
// ============================================================
// PROVIDER
// ============================================================
export const AuthProvider = ({ children }) => {
    //----------------------------------------------------------
    // Usuario autenticado
    //----------------------------------------------------------
    const [currentUser, setCurrentUser] = useState(null);
    //----------------------------------------------------------
    // Perfil del usuario almacenado en Firestore
    //----------------------------------------------------------
    const [profile, setProfile] = useState(null);
    //----------------------------------------------------------
    // Estado de carga
    //----------------------------------------------------------
    const [loading, setLoading] = useState(true);
    //----------------------------------------------------------
    // Login
    //----------------------------------------------------------
    const signIn = async (email, password) => {
        return await login(email, password);
    };
    //----------------------------------------------------------
    // Registro
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
    // Logout
    //----------------------------------------------------------
    const signOut = async () => {
        setProfile(null);
        return await logout();
    };
    //----------------------------------------------------------
    // Escuchar cambios de autenticación
    //----------------------------------------------------------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user) => {
                setCurrentUser(user);
                //--------------------------------------------------
                // Si existe sesión cargamos el perfil
                //--------------------------------------------------
                if (user) {
                    try {
                        const profileRef = doc(
                            db,
                            "usuarios",
                            user.uid
                        );
                        const profileSnap =
                            await getDoc(profileRef);
                        if (profileSnap.exists()) {
                            setProfile(profileSnap.data());
                        }
                        else {
                            setProfile(null);
                        }
                    }
                    catch (error) {
                        console.error(
                            "Error cargando perfil:",
                            error
                        );
                        setProfile(null);
                    }
                }
                else {
                    setProfile(null);
                }
                setLoading(false);
            }
        );
        return unsubscribe;
    }, []);
    //----------------------------------------------------------
    // Valores compartidos
    //----------------------------------------------------------
    const value = {
        currentUser,
        profile,
        login: signIn,
        register: signUp,
        logout: signOut,
        loading
    };
    //----------------------------------------------------------
    // Esperar autenticación
    //----------------------------------------------------------
    if (loading) {
        return null;
    }
    //----------------------------------------------------------
    // Provider
    //----------------------------------------------------------
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;