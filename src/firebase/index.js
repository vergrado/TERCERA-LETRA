// ============================================================
// index.js
// Archivo centralizador de los servicios Firebase
// Plataforma: TERCERA LETRA
// ============================================================


// Exportamos la aplicación principal.
export { default as app } from "./firebaseConfig";


// Exportamos Authentication.
export { default as auth } from "./auth";


// Exportamos Firestore.
export { default as db } from "./firestore";


// Exportamos Storage.
export { default as storage } from "./storage";