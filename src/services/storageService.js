// ============================================================
// storageService.js
// ------------------------------------------------------------
// Servicio encargado de administrar Firebase Storage.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Subir archivos.
// • Obtener URL pública.
// • Eliminar archivos.
// • Reemplazar archivos.
//
// ============================================================
import storage from "../firebase/storage";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "firebase/storage";
// ============================================================
// SUBIR DOCUMENTO
// ============================================================
export const uploadDocument = async (
    file,
    folder = "documentos"
) => {
    if (!file) {
        throw new Error("No existe archivo para subir.");
    }
    const timestamp = Date.now();
    const fileName =
        `${timestamp}_${file.name}`;
    const storagePath =
        `${folder}/${fileName}`;
    const storageRef =
        ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    const url =
        await getDownloadURL(storageRef);
    return {
        url,
        storagePath,
        nombreArchivo: file.name,
        tipoArchivo: file.type,
        tamano: file.size
    };
};
// ============================================================
// ELIMINAR DOCUMENTO
// ============================================================
export const deleteDocumentFile = async (
    storagePath
) => {
    if (!storagePath) return;
    const storageRef =
        ref(storage, storagePath);
    await deleteObject(storageRef);
};
// ============================================================
// REEMPLAZAR DOCUMENTO
// ============================================================
export const replaceDocument = async (
    oldStoragePath,
    newFile
) => {
    if (oldStoragePath) {
        await deleteDocumentFile(oldStoragePath);
    }
    return await uploadDocument(newFile);
};