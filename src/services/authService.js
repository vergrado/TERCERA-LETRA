// ============================================================
// authService.js
// ------------------------------------------------------------
// Servicio encargado de administrar todas las operaciones
// relacionadas con la autenticación.
//
// Este archivo concentra la lógica de negocio para:
//
// • Iniciar sesión.
// • Registrar usuarios.
// • Cerrar sesión.
// • Recuperar contraseña.
// • Obtener el usuario autenticado.
//
// De esta manera evitamos duplicar código y mantenemos
// separada la interfaz de la lógica.
// ============================================================


// ============================================================
// IMPORTACIONES
// ============================================================

// Funciones de Firebase Authentication.
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
// Funciones de Firestore.
import {
    doc,
    setDoc,
    serverTimestamp,
    getDoc
} from "firebase/firestore";
// Instancias creadas previamente.
import { auth, db } from "../firebase";
// ============================================================
// INICIAR SESIÓN
// ============================================================
export const login = async (email, password) => {
    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
};
// ============================================================
// REGISTRAR USUARIO
// ============================================================
export const register = async (
    nombre,
    email,
    password
) => {
    //----------------------------------------------------------
    // Crear usuario en Firebase Authentication.
    //----------------------------------------------------------
    const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    //----------------------------------------------------------
    // Usuario recién creado.
    //----------------------------------------------------------
    const user = userCredential.user;
    //----------------------------------------------------------
    // Crear documento en Firestore.
    //----------------------------------------------------------
    await setDoc(
        doc(db, "usuarios", user.uid),
        {
            uid: user.uid,
            nombre,
            email,
            rol: "PROFESIONAL",
            estado: "ACTIVO",
            fechaCreacion: serverTimestamp()
        }
    );
    //----------------------------------------------------------
    // Retornamos el usuario creado.
    //----------------------------------------------------------
    return user;
};
// ============================================================
// CERRAR SESIÓN
// ============================================================
export const logout = async () => {
    return await signOut(auth);
};
// ============================================================
// RECUPERAR CONTRASEÑA
// ============================================================
export const resetPassword = async (email) => {
    return await sendPasswordResetEmail(
        auth,
        email
    );
};
// ============================================================
// USUARIO ACTUAL
// ============================================================
export const currentUser = () => {
    return auth.currentUser;
};
// ============================================================
// OBTENER PERFIL DEL USUARIO
// ============================================================
export const getUserProfile = async (uid) => {

    const ref = doc(db, "usuarios", uid);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data();

};