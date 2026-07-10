// ============================================================
// auth.js
// Servicio de autenticación de Firebase
// Plataforma: TERCERA LETRA
// ============================================================
// Importamos la función getAuth desde Firebase Authentication.
// Esta función crea la instancia encargada de administrar
// el inicio de sesión y registro de usuarios.
import { getAuth } from "firebase/auth";
// Importamos la aplicación inicializada.
import app from "./firebaseConfig";
// Creamos la instancia de Authentication utilizando
// la aplicación principal de Firebase.
const auth = getAuth(app);
// Exportamos la instancia para utilizarla en cualquier módulo.
export default auth;