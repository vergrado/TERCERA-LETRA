// ============================================================
// personService.js
// ------------------------------------------------------------
// Servicio encargado de administrar la colección "personas".
//
// Plataforma:
// TERCERA LETRA
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
    orderBy,
    where,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
//----------------------------------------------------------
// Colección
//----------------------------------------------------------
const personsCollection = collection(db, "personas");
//----------------------------------------------------------
// Crear Persona
//----------------------------------------------------------
export const createPerson = async (personData) => {
    return await addDoc(
        personsCollection,
        {
            ...personData,
            fechaCreacion: serverTimestamp(),
            fechaActualizacion: serverTimestamp()
        }
    );
};
//----------------------------------------------------------
// Obtener Personas
//----------------------------------------------------------
export const getPersons = async () => {
    const q = query(
        personsCollection,
        orderBy("fechaCreacion", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};
//----------------------------------------------------------
// Obtener Persona por ID
//----------------------------------------------------------
export const getPersonById = async (id) => {
    const reference = doc(
        db,
        "personas",
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
//----------------------------------------------------------
// Actualizar Persona
//----------------------------------------------------------
export const updatePerson = async (
    id,
    personData
) => {
    const reference = doc(
        db,
        "personas",
        id
    );
    return await updateDoc(
        reference,
        {
            ...personData,
            fechaActualizacion: serverTimestamp()
        }
    );
};
//----------------------------------------------------------
// Eliminar Persona
//----------------------------------------------------------
export const deletePerson = async (id) => {
    const reference = doc(
        db,
        "personas",
        id
    );
    return await deleteDoc(reference);
};
//----------------------------------------------------------
// Buscar por RUT
//----------------------------------------------------------
export const getPersonByRut = async (rut) => {
    const q = query(
        personsCollection,
        where("rut", "==", rut)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};