// ============================================================
// documentService.js
// ------------------------------------------------------------
// Servicio de documentos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Crear documentos.
// • Consultar documentos.
// • Actualizar documentos.
// • Eliminar documentos.
// • Subir archivos a Firebase Storage.
// • Eliminar archivos de Firebase Storage.
// ============================================================
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from "firebase/firestore";
import db from "../firebase/firestore";
import {
    deleteDocumentFile,
    uploadDocument
} from "./storageService";
const STORAGE_ENABLED = false;
const documentsCollection = collection(db, "documentos");
// ============================================================
// COLECCIÓN
// ============================================================
//const documentsCollection = collection(db, "documentos");
// ============================================================
// CREAR DOCUMENTO
// ============================================================
export const createDocument = async (documentData) => {
    let uploadedFile = null;
    try {
        const {
            archivo,
            ...firestoreData
        } = documentData;
        // Subir archivo físico a Firebase Storage.
        if (archivo) {
            //uploadedFile = await uploadDocument(archivo);
           //if (STORAGE_ENABLED && archivo) {
                //uploadedFile = await uploadDocument(archivo);
            //}
            //if (STORAGE_ENABLED && archivo) {
                //uploadedFile = await uploadDocument(archivo);
            //}
            if (STORAGE_ENABLED && archivo) {
                uploadedFile = await uploadDocument(archivo);
            }
        }
        const newDocument = {
            ...firestoreData,
            url:
                uploadedFile?.url ??
                firestoreData.url ??
                "",
            storagePath:
                uploadedFile?.storagePath ??
                firestoreData.storagePath ??
                "",
            nombreArchivo:
                uploadedFile?.nombreArchivo ??
                firestoreData.nombreArchivo ??
                "",
            tipoArchivo:
                uploadedFile?.tipoArchivo ??
                firestoreData.tipoArchivo ??
                "",
            tamano:
                uploadedFile?.tamano ??
                firestoreData.tamano ??
                0,
            fechaCreacion: serverTimestamp(),
            fechaActualizacion: serverTimestamp()
        };
        const documentReference = await addDoc(
            documentsCollection,
            newDocument
        );
        return {
            id: documentReference.id,
            ...newDocument
        };
    } catch (error) {
        /*
         * Si Storage terminó correctamente pero Firestore falló,
         * eliminamos el archivo para evitar archivos huérfanos.
         */
        //if (uploadedFile?.storagePath) {
                    if (
                STORAGE_ENABLED &&
                uploadedFile?.storagePath
            ) {
            try {
                await deleteDocumentFile(
                    uploadedFile.storagePath
                );
            } catch (storageError) {
                console.error(
                    "No fue posible limpiar el archivo subido:",
                    storageError
                );
            }
        }
        console.error(
            "Error al crear el documento:",
            error
        );
        throw error;
    }
};
// ============================================================
// OBTENER DOCUMENTOS
// ============================================================
export const getDocuments = async () => {
    try {
        const documentsQuery = query(
            documentsCollection,
            orderBy("fechaCreacion", "desc")
        );
        const snapshot = await getDocs(documentsQuery);
        return snapshot.docs.map((documentItem) => ({
            id: documentItem.id,
            ...documentItem.data()
        }));
    } catch (error) {
        console.error(
            "Error al obtener los documentos:",
            error
        );
        throw error;
    }
};
// ============================================================
// OBTENER DOCUMENTO POR ID
// ============================================================
export const getDocumentById = async (documentId) => {
    try {
        const documentReference = doc(
            db,
            "documentos",
            documentId
        );
        const snapshot = await getDoc(documentReference);
        if (!snapshot.exists()) {
            return null;
        }
        return {
            id: snapshot.id,
            ...snapshot.data()
        };
    } catch (error) {
        console.error(
            "Error al obtener el documento:",
            error
        );
        throw error;
    }
};
// ============================================================
// ACTUALIZAR DOCUMENTO
// ============================================================
export const updateDocument = async (
    documentId,
    documentData
) => {
    let uploadedFile = null;
    try {
        const currentDocument =
            await getDocumentById(documentId);
        if (!currentDocument) {
            throw new Error("El documento no existe.");
        }
        const {
            archivo,
            ...firestoreData
        } = documentData;
        /*
         * Primero se sube el archivo nuevo.
         * El archivo anterior se elimina solamente después de que
         * Firestore se actualice correctamente.
         */
        if (archivo) {
            uploadedFile = await uploadDocument(archivo);
        }
        const updatedData = {
            ...firestoreData,
            url:
                uploadedFile?.url ??
                currentDocument.url ??
                "",
            storagePath:
                uploadedFile?.storagePath ??
                currentDocument.storagePath ??
                "",
            nombreArchivo:
                uploadedFile?.nombreArchivo ??
                currentDocument.nombreArchivo ??
                "",
            tipoArchivo:
                uploadedFile?.tipoArchivo ??
                currentDocument.tipoArchivo ??
                "",
            tamano:
                uploadedFile?.tamano ??
                currentDocument.tamano ??
                0,
            fechaActualizacion: serverTimestamp()
        };
        const documentReference = doc(
            db,
            "documentos",
            documentId
        );
        await updateDoc(
            documentReference,
            updatedData
        );

        // Eliminar archivo anterior después de actualizar Firestore.
        //if (
            //uploadedFile?.storagePath &&
            //currentDocument.storagePath &&
            //currentDocument.storagePath !==
              //  uploadedFile.storagePath
        //) {
           if (
                STORAGE_ENABLED &&
                uploadedFile?.storagePath &&
                currentDocument.storagePath &&
                currentDocument.storagePath !==
                    uploadedFile.storagePath
            ) {
            try {
                await deleteDocumentFile(
                    currentDocument.storagePath
                );
            } catch (storageError) {
                console.error(
                    "No fue posible eliminar el archivo anterior:",
                    storageError
                );
            }
        }

        return {
            id: documentId,
            ...updatedData
        };
    } catch (error) {
        /*
         * Si se subió un archivo nuevo pero la actualización falló,
         * eliminamos ese archivo nuevo.
         */
        //if (uploadedFile?.storagePath) {
                    if (
                STORAGE_ENABLED &&
                uploadedFile?.storagePath
            ) {
            try {
                await deleteDocumentFile(
                    uploadedFile.storagePath
                );
            } catch (storageError) {
                console.error(
                    "No fue posible limpiar el archivo nuevo:",
                    storageError
                );
            }
        }
        console.error(
            "Error al actualizar el documento:",
            error
        );
        throw error;
    }
};
// ============================================================
// ELIMINAR DOCUMENTO
// ============================================================
export const deleteDocument = async (documentId) => {
    try {
        const currentDocument =
            await getDocumentById(documentId);
        if (!currentDocument) {
            throw new Error("El documento no existe.");
        }
        const documentReference = doc(
            db,
            "documentos",
            documentId
        );
        /*
         * Primero eliminamos el registro de Firestore.
         * Después intentamos eliminar el archivo físico.
         */
            await deleteDoc(documentReference);
            //if (currentDocument.storagePath) {
                    if (
                STORAGE_ENABLED &&
                currentDocument.storagePath
            ) {
            try {
                await deleteDocumentFile(
                    currentDocument.storagePath
                );
            } catch (storageError) {
                console.error(
                    "El registro fue eliminado, pero no se pudo eliminar el archivo:",
                    storageError
                );
            }
        }
        return documentId;
    } catch (error) {
        console.error(
            "Error al eliminar el documento:",
            error
        );
        throw error;
    }
};
// ============================================================
// OBTENER DOCUMENTOS POR CASO
// ============================================================
export const getDocumentsByCase = async (caseId) => {
    try {
        const documentsQuery = query(
            documentsCollection,
            where("casoId", "==", caseId)
        );
        const snapshot = await getDocs(documentsQuery);
        return snapshot.docs.map((documentItem) => ({
            id: documentItem.id,
            ...documentItem.data()
        }));
    } catch (error) {
        console.error(
            "Error al obtener documentos del caso:",
            error
        );
        throw error;
    }
};
// ============================================================
// OBTENER DOCUMENTOS POR PERSONA
// ============================================================
export const getDocumentsByPerson = async (personId) => {
    try {
        const documentsQuery = query(
            documentsCollection,
            where("personaId", "==", personId)
        );
        const snapshot = await getDocs(documentsQuery);
        return snapshot.docs.map((documentItem) => ({
            id: documentItem.id,
            ...documentItem.data()
        }));
    } catch (error) {
        console.error(
            "Error al obtener documentos de la persona:",
            error
        );
        throw error;
    }
};