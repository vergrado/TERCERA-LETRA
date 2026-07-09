// ============================================================
// CasesTable.jsx
// ------------------------------------------------------------
// Tabla principal del módulo de Casos.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Mostrar casos.
// • Mostrar loading.
// • Mostrar mensaje sin registros.
// • Utilizar CaseContext.
//
// ============================================================

// ============================================================
// IMPORTACIONES
// ============================================================
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import { useCaseContext } from "../../contexts/CaseContext";
// ============================================================
// COMPONENTE
// ============================================================
const CasesTable = () => {
    //----------------------------------------------------------
    // Información del contexto.
    //----------------------------------------------------------
    const {
        cases,
        loading,
        error
    } = useCaseContext();
    //----------------------------------------------------------
    // Loading.
    //----------------------------------------------------------
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-3">
                    Cargando casos...
                </p>
            </div>
        );
    }
    //----------------------------------------------------------
    // Error.
    //----------------------------------------------------------
    if (error) {
        return (
            <Alert variant="danger">
                Error al obtener los casos.
            </Alert>
        );
    }
    //----------------------------------------------------------
    // Sin registros.
    //----------------------------------------------------------
    if (cases.length === 0) {
        return (
            <Alert variant="info">
                No existen casos registrados.
            </Alert>
        );
    }
    //----------------------------------------------------------
    // Tabla.
    //----------------------------------------------------------
    return (
        <Table
            striped
            bordered
            hover
            responsive
        >
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Institución</th>
                    <th>Estado</th>
                    <th>Prioridad</th>
                    <th>Responsable</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                {
                    cases.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {item.titulo}
                            </td>
                            <td>
                                {item.institucion}
                            </td>
                            <td>
                                <Badge bg="primary">
                                    {item.estado}
                                </Badge>
                            </td>
                            <td>
                                {item.prioridad}
                            </td>
                            <td>
                                {item.responsableUid}
                            </td>
                            <td>
                                {
                                    item.fechaCreacion?.toDate
                                        ? item.fechaCreacion
                                              .toDate()
                                              .toLocaleDateString()
                                        : "-"
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
};
export default CasesTable;