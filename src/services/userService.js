// ============================================================
// userService.js
// ------------------------------------------------------------
// Servicio encargado de administrar toda la información de los
// usuarios almacenada en Cloud Firestore.
//
// IMPORTANTE:
//
// Este servicio NO administra el Login.
//
// El Login pertenece a Firebase Authentication.
//
// Este servicio solamente administra:
//
// • Obtener usuario.
// • Actualizar usuario.
// • Cambiar rol.
// • Cambiar estado.
//
// Plataforma:
// TERCERA LETRA
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
// Funciones de Firestore.
import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";
// Instancia de Firestore.
import { db } from "../firebase";
// ============================================================
// OBTENER USUARIO POR UID
// ============================================================
export const getUserByUid = async (uid) => {
    //----------------------------------------------------------
    // Referencia al documento.
    //----------------------------------------------------------
    const documentReference = doc(
        db,
        "usuarios",
        uid
    );
    //----------------------------------------------------------
    // Consultamos Firestore.
    //----------------------------------------------------------
    const documentSnapshot = await getDoc(
        documentReference
    );
    //----------------------------------------------------------
    // Verificamos existencia.
    //----------------------------------------------------------
    if (!documentSnapshot.exists()) {
        return null;
    }
    //----------------------------------------------------------
    // Retornamos la información.
    //----------------------------------------------------------
    return documentSnapshot.data();
};
// ============================================================
// ACTUALIZAR PERFIL
// ============================================================
export const updateUser = async (
    uid,
    data
) => {
    //----------------------------------------------------------
    // Referencia al documento.
    //----------------------------------------------------------
    const documentReference = doc(
        db,
        "usuarios",
        uid
    );
    //----------------------------------------------------------
    // Actualizamos únicamente los campos enviados.
    //----------------------------------------------------------
    await updateDoc(
        documentReference,
        data
    );
};
// ============================================================
// CAMBIAR ROL
// ============================================================
export const changeUserRole = async (
    uid,
    role
) => {
    await updateUser(
        uid,
        {
            rol: role
        }
    );
};
// ============================================================
// CAMBIAR ESTADO
// ============================================================
export const changeUserStatus = async (
    uid,
    status
) => {
    await updateUser(
        uid,
        {
            estado: status
        }
    );
};