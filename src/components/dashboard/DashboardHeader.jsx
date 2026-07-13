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
// La información del usuario se obtiene directamente desde
// AuthContext.
//
// Plataforma:
// TERCERA LETRA
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/dashboard/dashboard-header.css";
// ============================================================
// COMPONENTE
// ============================================================
const DashboardHeader = () => {
    //----------------------------------------------------------
    // Usuario autenticado.
    //----------------------------------------------------------
    const { profile } = useAuth();
    //console.log("PROFILE:", profile);
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
// ============================================================
// EXPORTACIÓN
// ============================================================
export default DashboardHeader;