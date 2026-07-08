// ============================================================
// DashboardHeader.jsx
// ------------------------------------------------------------
// Encabezado principal del Dashboard.
//
// Muestra:
//
// • Saludo personalizado.
// • Fecha actual.
// • Descripción.
//
// Toda la información del usuario proviene
// del AuthContext.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import "./../../styles/dashboard/dashboard-header.css";
const DashboardHeader = ({ profile }) => {
    //----------------------------------------------------------
    // Fecha actual.
    //----------------------------------------------------------
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(
        "es-CL",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
    //----------------------------------------------------------
    // Interfaz.
    //----------------------------------------------------------
    return (
        <section className="dashboard-header">
            <div>
                <h1>
                    Bienvenido,
                    {" "}
                    {
                        profile?.nombre ||
                        "Usuario"
                    }
                </h1>
                <p>
                    Sistema de Monitoreo de Procesos Regulatorios.
                </p>
            </div>
            <div className="dashboard-date">
                {formattedDate}
            </div>
        </section>
    );
};
export default DashboardHeader;