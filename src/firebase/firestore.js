// ============================================================
// firestore.js
// Servicio de Base de Datos Firestore
// Plataforma: TERCERA LETRA
// ============================================================


// Importamos getFirestore desde Firebase.
import { getFirestore } from "firebase/firestore";


// Importamos la aplicación inicializada.
import app from "./firebaseConfig";


// Creamos la conexión con Cloud Firestore.
const db = getFirestore(app);


// Exportamos la base de datos.
export default db;