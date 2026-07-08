/*
===========================================================
Archivo: AppRouter.jsx

Este componente administra todas las rutas de la aplicación.

Cada vez que el usuario navegue entre páginas,
React Router decidirá qué componente mostrar.

Aquí se incorporarán posteriormente las rutas protegidas
mediante Firebase Authentication.
===========================================================
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Páginas
import Home from "../pages/Home";
function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Página principal */}
                <Route
                    path="/"
                    element={<Home />}
                />
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;