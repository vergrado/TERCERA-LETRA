// ============================================================
// storage.js
// Servicio de almacenamiento de archivos
// Plataforma: TERCERA LETRA
// ============================================================
// Importamos el servicio Storage.
import { getStorage } from "firebase/storage";
// Importamos la aplicación inicializada.
import app from "./firebaseConfig";
// Creamos la conexión con Firebase Storage.
const storage = getStorage(app);
// Exportamos el servicio.
export default storage;