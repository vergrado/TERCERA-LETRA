// ============================================================
// caseService.js
// ------------------------------------------------------------
// Servicio encargado de administrar todas las operaciones
// relacionadas con la colección "casos".
//
// Plataforma:
// TERCERA LETRA
//
// Funcionalidades:
//
// • Crear casos.
// • Obtener todos los casos.
// • Obtener un caso por ID.
// • Actualizar casos.
// • Eliminar casos.
// • Obtener casos por usuario.
// • Obtener casos por estado.
//
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
// ============================================================
// REFERENCIA A LA COLECCIÓN
// ============================================================
const casesCollection = collection(db, "casos");
// ============================================================
// CREAR CASO
// ============================================================
export const createCase = async (caseData) => {
    const newCase = {
        ...caseData,
        fechaCreacion: serverTimestamp(),
        fechaActualizacion: serverTimestamp()
    };
    return await addDoc(
        casesCollection,
        newCase
    );
};
// ============================================================
// OBTENER TODOS LOS CASOS
// ============================================================
export const getCases = async () => {
    const q = query(
        casesCollection,
        orderBy("fechaCreacion", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};
// ============================================================
// OBTENER CASO POR ID
// ============================================================
export const getCaseById = async (id) => {
    const reference = doc(
        db,
        "casos",
        id
    );
    const snapshot = await getDoc(reference);
    if (!snapshot.exists()) {
        return null;
    }
    return {
        id: snapshot.id,
        ...snapshot.data()
    };
};
// ============================================================
// ACTUALIZAR CASO
// ============================================================
export const updateCase = async (
    id,
    caseData
) => {
    const reference = doc(
        db,
        "casos",
        id
    );
    return await updateDoc(
        reference,
        {
            ...caseData,
            fechaActualizacion: serverTimestamp()
        }
    );
};
// ============================================================
// ELIMINAR CASO
// ============================================================
export const deleteCase = async (id) => {
    const reference = doc(
        db,
        "casos",
        id
    );
    return await deleteDoc(reference);
};
// ============================================================
// OBTENER CASOS POR USUARIO
// ============================================================
export const getCasesByUser = async (uid) => {
    const q = query(
        casesCollection,
        where("responsableUid", "==", uid),
        orderBy("fechaCreacion", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};
// ============================================================
// OBTENER CASOS POR ESTADO
// ============================================================
export const getCasesByStatus = async (status) => {
    const q = query(
        casesCollection,
        where("estado", "==", status),
        orderBy("fechaCreacion", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};