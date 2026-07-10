// ============================================================
// firebaseConfig.js
// Configuración principal de Firebase para la plataforma
// TERCERA LETRA
// ============================================================


// Importamos la función initializeApp desde el SDK de Firebase.
// Esta función permite inicializar la conexión entre la aplicación
// React y el proyecto creado en Firebase.
import { initializeApp } from "firebase/app";
// Creamos un objeto llamado firebaseConfig.
// Su finalidad es almacenar la configuración necesaria para
// conectar nuestra aplicación con Firebase.
//
// Los datos NO se escriben directamente.
// Se leen desde el archivo .env mediante import.meta.env.
const firebaseConfig = {
    // Clave pública del proyecto Firebase.
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // Dominio utilizado para autenticación.
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // Identificador único del proyecto.
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // Servicio destinado al almacenamiento de archivos.
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    // Identificador del servicio de mensajería.
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    // Identificador único de la aplicación.
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
// Inicializamos Firebase utilizando la configuración anterior.
const app = initializeApp(firebaseConfig);
// Exportamos la aplicación para que pueda ser utilizada por
// Authentication, Firestore y Storage.
export default app;