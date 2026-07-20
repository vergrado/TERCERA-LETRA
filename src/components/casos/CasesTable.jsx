// ============================================================
// CasesTable.jsx
// ------------------------------------------------------------
// Tabla principal de Casos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
//import { useState } from "react";
import { useMemo, useState } from "react";
//import SearchBox from "../common/SearchBox";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { useCaseContext } from "../../contexts/CaseContext";
import { useToast } from "../../contexts/ToastContext";
import TableActions from "../common/TableActions";
//import CaseActions from "./CaseActions";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
//import CaseFilters from "./CaseFilters";
import Pagination from "react-bootstrap/Pagination";
//const CasesTable = () => {
const CasesTable = ({ cases }) => {
    //----------------------------------------------------------
    // Contexto
    //----------------------------------------------------------
        const {
        loading,
        error,
        removeCase,
        loadCases
    } = useCaseContext();
    //const {
    //loading,
    //error,
    //removeCase,
    //loadCases
    //} = useCaseContext();
    //----------------------------------------------------------
    const { showToast } = useToast();
    //----------------------------------------------------------
    // Navegación
    //----------------------------------------------------------
    const navigate = useNavigate();
    //----------------------------------------------------------
    // Buscador
    //----------------------------------------------------------

    //const [search, setSearch] = useState("");
    //----------------------------------------------------------
    // Filtros
    //----------------------------------------------------------
    //const [estadoFiltro, setEstadoFiltro] = useState("");
    //const [prioridadFiltro, setPrioridadFiltro] = useState("");
    //const [institucionFiltro, setInstitucionFiltro] = useState("");
    //----------------------------------------------------------
    // Ordenamiento
    //----------------------------------------------------------
    const [sortField, setSortField] = useState("fechaCreacion");
    const [sortDirection, setSortDirection] = useState("desc");
    //----------------------------------------------------------
    // Paginación
    //----------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    //----------------------------------------------------------
    // Modal eliminar
    //----------------------------------------------------------
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    //----------------------------------------------------------
    // Colores Estado
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
    // Colores Prioridad
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
    // Confirmar eliminación
    //----------------------------------------------------------
    const handleDelete = async () => {
        if (!selectedCase) return;
        try {
            setDeleteLoading(true);
            await removeCase(selectedCase.id);
            //await loadCases();
            setShowDelete(false);
            setSelectedCase(null);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setDeleteLoading(false);
        }
    };
    //----------------------------------------------------------
    // Instituciones disponibles
    //----------------------------------------------------------
    //const instituciones = useMemo(() => {
      //  return [
        //    ...new Set(
          //      cases
        //           .map((item) => item.institucion)
        //            .filter(Boolean)
         //   )
       // ].sort();
    //}, [cases]);
    //----------------------------------------------------------
    // Casos filtrados
    //----------------------------------------------------------
    //const filteredCases = useMemo(() => {
        //const texto = search.trim().toLowerCase();
       // return cases.filter((item) => {
          //  const coincideBusqueda =
             //   item.titulo?.toLowerCase().includes(texto) ||
            //    item.institucion?.toLowerCase().includes(texto) ||
             //   item.responsableNombre?.toLowerCase().includes(texto);
           // const coincideEstado =
              //  !estadoFiltro ||
              //  item.estado === estadoFiltro;
            //const coincidePrioridad =
              //  !prioridadFiltro ||
               // item.prioridad === prioridadFiltro;
            //const coincideInstitucion =
              //  !institucionFiltro ||
             //   item.institucion === institucionFiltro;
            //return (
             //   coincideBusqueda &&
             //   coincideEstado &&
            //    coincidePrioridad &&
             //   coincideInstitucion
           // );
       // });
   // }, [
      //  cases,
       // search,
      //  estadoFiltro,
      //  prioridadFiltro,
      //  institucionFiltro
    //]);
    //----------------------------------------------------------
    // Casos ordenados
    //----------------------------------------------------------
   // const sortedCases = useMemo(() => {
    //    const items = [...filteredCases];
     //   items.sort((a, b) => {
      //      let valueA = a[sortField];
       //     let valueB = b[sortField];
       //     if (sortField === "fechaCreacion") {
        //        valueA = valueA?.toDate?.() ?? new Date(0);
         //       valueB = valueB?.toDate?.() ?? new Date(0);
          //  }
           // if (typeof valueA === "string") {
           //     valueA = valueA.toLowerCase();
            //}
           // if (typeof valueB === "string") {
             //   valueB = valueB.toLowerCase();
            //}
            //if (valueA < valueB) {
             //   return sortDirection === "asc" ? -1 : 1;
            //}
           // if (valueA > valueB) {
             //   return sortDirection === "asc" ? 1 : -1;
            //}
            //return 0;
        //});
        //return items;
    //}, [
      //  filteredCases,
     //   sortField,
      //  sortDirection
    //]);
        const sortedCases = useMemo(() => {
        const items = [...cases];
        items.sort((a, b) => {
            let valueA = a[sortField];
            let valueB = b[sortField];
            if (sortField === "fechaCreacion") {
                valueA = valueA?.toDate?.() ?? new Date(0);
                valueB = valueB?.toDate?.() ?? new Date(0);
            }
            if (typeof valueA === "string") {
                valueA = valueA.toLowerCase();
            }
            if (typeof valueB === "string") {
                valueB = valueB.toLowerCase();
            }
            if (valueA < valueB) {
                return sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
        return items;
    }, [
        cases,
        sortField,
        sortDirection
    ]);
        //----------------------------------------------------------
    // Datos paginados
    //----------------------------------------------------------
    const totalPages = Math.ceil(
        sortedCases.length / itemsPerPage
    );
    const paginatedCases = useMemo(() => {
        const start =
            (currentPage - 1) * itemsPerPage;
        const end =
            start + itemsPerPage;
        return sortedCases.slice(start, end);
    }, [
        sortedCases,
        currentPage
    ]);
    //----------------------------------------------------------
    // Cambiar orden
    //----------------------------------------------------------
    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection((prev) =>
                prev === "asc"
                    ? "desc"
                    : "asc"
            );
        }
        else {
            setSortField(field);
            setSortDirection("asc");
        }
    };
    //----------------------------------------------------------
    // Loading
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
    // Error
    //----------------------------------------------------------
    if (error) {
        return (
            <Alert variant="danger">
                Error al obtener los casos.
            </Alert>
        );
    }
    //----------------------------------------------------------
    // Sin registros
    //----------------------------------------------------------
    if (cases.length === 0) {
        return (
            <Alert variant="info">
                No existen casos registrados.
            </Alert>
        );
    }
    //----------------------------------------------------------
    // Tabla
    //----------------------------------------------------------
    return (
        <>
            <Table
                hover
                striped
                bordered
                responsive
                className="align-middle"
            >
                <thead className="table-dark">
                    <tr>
                       <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("titulo")}
                        >
                            Título
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("personaNombre")}
                        >
                            Persona
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("institucion")}
                        >
                            Institución
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("estado")}
                        >
                            Estado
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("prioridad")}
                        >
                            Prioridad
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("responsableNombre")}
                        >
                            Responsable
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("fechaCreacion")}
                        >
                            Fecha
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSort("acciones")}
                        >
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //cases.map((item) => (
                            //filteredCases.map((item) => (
                            paginatedCases.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    {item.titulo}
                                </td>
                                <td>
                                    {item.institucion}
                                </td>
                                <td>
                                    {item.personaNombre && item.personaId ? (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-link p-0 fw-semibold text-decoration-none text-start"
                                                onClick={() =>
                                                    navigate(`/personas/${item.personaId}`)
                                                }
                                            >
                                                {item.personaNombre}
                                            </button>
                                            <div>
                                                <small className="text-muted">
                                                    {item.personaRut}
                                                </small>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-muted">
                                            Sin persona
                                        </span>
                                    )}
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
                                <TableActions
                                    onView={() =>
                                        navigate(`/casos/${item.id}`)
                                    }
                                    onEdit={() =>
                                        navigate(`/casos/${item.id}/editar`)
                                    }
                                    onDelete={() => {
                                        setSelectedCase(item);
                                        setShowDelete(true);
                                    }}
                                />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() =>
                    setCurrentPage(currentPage - 1)
                }
            />
            {
                [...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() =>
                            setCurrentPage(index + 1)
                        }
                    >
                        {index + 1}
                    </Pagination.Item>
                ))
            }
            <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() =>
                    setCurrentPage(currentPage + 1)
                }
            />
        </Pagination>
            <ConfirmDeleteModal
                show={showDelete}
                title="Eliminar Caso"
                message={
                    selectedCase
                        ? `¿Desea eliminar el caso "${selectedCase.titulo}"?`

                        : ""
                }
                loading={deleteLoading}
                onCancel={() => {
                    setShowDelete(false);
                    setSelectedCase(null);
                }}
                onConfirm={handleDelete}
            />
        </>
    );
};
export default CasesTable;