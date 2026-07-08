/*
===========================================================
Archivo: Home.jsx

Primera página de la aplicación.

Actualmente actúa como pantalla temporal para comprobar
que React Router funciona correctamente.

Posteriormente esta página será reemplazada por el
Inicio de Sesión del sistema TERCERA LETRA.
===========================================================
*/
function Home() {
    return (
        <div className="container py-5">
            <h1 className="text-primary">
                Plataforma TERCERA LETRA
            </h1>
            <p className="lead">
                Sistema de gestión y seguimiento de trámites.
            </p>
        </div>
    );
}
export default Home;