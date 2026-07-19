// ============================================================
// documentService.js
// ------------------------------------------------------------
// Servicio encargado de administrar todas las operaciones
// relacionadas con la colección "documentos".
//
// Plataforma:
// TERCERA LETRA
//
// Funcionalidades:
//
// • Crear documentos.
// • Obtener todos los documentos.
// • Obtener un documento por ID.
// • Actualizar documentos.
// • Eliminar documentos.
// • Obtener documentos por caso.
// • Obtener documentos por persona.
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
const documentsCollection = collection(
    db,
    "documentos"
);
// ============================================================
// CREAR DOCUMENTO
// ============================================================
export const createDocument = async documentData => {
    const newDocument = {
        ...documentData,
        fechaCreacion: serverTimestamp(),
        fechaActualizacion: serverTimestamp()
    };
    return await addDoc(
        documentsCollection,
        newDocument
    );
};
// ============================================================
// OBTENER TODOS LOS DOCUMENTOS
// ============================================================
export const getDocuments = async () => {
    const q = query(
        documentsCollection,
        orderBy("fechaCreacion", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map(documentSnapshot => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
    }));
};
// ============================================================
// OBTENER DOCUMENTO POR ID
// ============================================================
export const getDocumentById = async id => {
    const reference = doc(
        db,
        "documentos",
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
// ACTUALIZAR DOCUMENTO
// ============================================================
export const updateDocument = async (
    id,
    documentData
) => {
    const reference = doc(
        db,
        "documentos",
        id
    );
    return await updateDoc(
        reference,
        {
            ...documentData,
            fechaActualizacion: serverTimestamp()
        }
    );
};
// ============================================================
// ELIMINAR DOCUMENTO
// ============================================================
export const deleteDocument = async id => {
    const reference = doc(
        db,
        "documentos",
        id
    );
    return await deleteDoc(reference);
};
// ============================================================
// OBTENER DOCUMENTOS POR CASO
// ============================================================
export const getDocumentsByCase = async caseId => {
    const q = query(
        documentsCollection,
        where("casoId", "==", caseId),
        orderBy("fechaCreacion", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(documentSnapshot => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
    }));
};
// ============================================================
// OBTENER DOCUMENTOS POR PERSONA
// ============================================================
export const getDocumentsByPerson = async personId => {
    const q = query(
        documentsCollection,
        where("personaId", "==", personId),
        orderBy("fechaCreacion", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map(documentSnapshot => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data()
    }));
};