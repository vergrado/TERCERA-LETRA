// ============================================================
// CasesTable.jsx
// ============================================================

import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";

import { useNavigate } from "react-router-dom";

import { useCaseContext } from "../../contexts/CaseContext";

import CaseActions from "./CaseActions";

const CasesTable = () => {

    const {

        cases,

        loading,

        error

    } = useCaseContext();

    const navigate = useNavigate();

    //----------------------------------------------------------

    const getEstadoBadge = (estado) => {

        switch (estado) {

            case "PENDIENTE":
                return "secondary";

            case "EN PROCESO":
                return "warning";

            case "FINALIZADO":
                return "success";

            case "ARCHIVADO":
                return "dark";

            default:
                return "primary";

        }

    };

    //----------------------------------------------------------

    const getPrioridadBadge = (prioridad) => {

        switch (prioridad) {

            case "ALTA":
                return "danger";

            case "MEDIA":
                return "warning";

            case "BAJA":
                return "success";

            default:
                return "secondary";

        }

    };

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

    if (error) {

        return (

            <Alert variant="danger">

                Error al obtener los casos.

            </Alert>

        );

    }

    //----------------------------------------------------------

    if (cases.length === 0) {

        return (

            <Alert variant="info">

                No existen casos registrados.

            </Alert>

        );

    }

    //----------------------------------------------------------

    return (

        <Table
            hover
            striped
            bordered
            responsive
            className="align-middle"
        >

            <thead className="table-dark">

                <tr>

                    <th>Título</th>

                    <th>Institución</th>

                    <th>Estado</th>

                    <th>Prioridad</th>

                    <th>Responsable</th>

                    <th>Fecha</th>

                    <th width="150">

                        Acciones

                    </th>

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

                                <Badge bg={getEstadoBadge(item.estado)}>

                                    {item.estado}

                                </Badge>

                            </td>

                            <td>

                                <Badge bg={getPrioridadBadge(item.prioridad)}>

                                    {item.prioridad}

                                </Badge>

                            </td>

                            <td>

                                {item.responsableNombre}

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

                            <td>

                                <CaseActions

                                    onView={() =>

                                        navigate(`/casos/${item.id}`)
                                    }

                                    onEdit={() =>

                                        navigate(`/casos/editar/${item.id}`)
                                    }

                                    onDelete={() =>

                                        console.log("Eliminar", item.id)
                                    }

                                />

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </Table>

    );

};

export default CasesTable;