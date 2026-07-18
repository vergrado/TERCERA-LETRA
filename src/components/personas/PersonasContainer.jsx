// ============================================================
// PersonasContainer.jsx
// ------------------------------------------------------------
// Contenedor principal del módulo Personas.
//
// Plataforma:
// TERCERA LETRA
//
// Funcionalidades:
//
// • Dashboard.
// • Búsqueda.
// • Filtro por estado.
// • Ordenamiento.
// • Paginación.
// • Exportación de resultados filtrados.
//
// ============================================================
import {
    useEffect,
    useMemo,
    useState
} from "react";
import {
    Form,
    Pagination
} from "react-bootstrap";
import { usePersonContext } from "../../contexts/PersonContext";
import PersonasDashboard from "./PersonasDashboard";
import PersonasToolbar from "./PersonasToolbar";
import PersonasTable from "./PersonasTable";
// ============================================================
const PersonasContainer = () => {
    // ---------------------------------------------------------
    // Contexto
    // ---------------------------------------------------------
    const { persons } = usePersonContext();
    // ---------------------------------------------------------
    // Búsqueda y filtros
    // ---------------------------------------------------------
    const [search, setSearch] = useState("");
    const [estadoFiltro, setEstadoFiltro] = useState("");
    // ---------------------------------------------------------
    // Ordenamiento
    // ---------------------------------------------------------
    const [sortField, setSortField] = useState("nombres");
    const [sortDirection, setSortDirection] = useState("asc");
    // ---------------------------------------------------------
    // Paginación
    // ---------------------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    // ---------------------------------------------------------
    // Personas filtradas
    // ---------------------------------------------------------
    const filteredPersons = useMemo(() => {
        const texto = search
            .trim()
            .toLowerCase();
        return persons.filter((person) => {
            const nombreCompleto = [
                person.nombres,
                person.apellidos
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            const rut =
                person.rut?.toLowerCase() || "";
            const correo =
                person.correo?.toLowerCase() || "";
            const telefono =
                person.telefono?.toLowerCase() || "";
            const coincideBusqueda =
                !texto ||
                nombreCompleto.includes(texto) ||
                rut.includes(texto) ||
                correo.includes(texto) ||
                telefono.includes(texto);
            const coincideEstado =
                !estadoFiltro ||
                person.estado === estadoFiltro;
            return (
                coincideBusqueda &&
                coincideEstado
            );
        });
    }, [
        persons,
        search,
        estadoFiltro
    ]);
    // ---------------------------------------------------------
    // Personas ordenadas
    // ---------------------------------------------------------
    const sortedPersons = useMemo(() => {
        const personsCopy = [...filteredPersons];
        personsCopy.sort((personA, personB) => {
            let valueA = "";
            let valueB = "";
            if (sortField === "nombres") {
                valueA = [
                    personA.nombres,
                    personA.apellidos
                ]
                    .filter(Boolean)
                    .join(" ");
                valueB = [
                    personB.nombres,
                    personB.apellidos
                ]
                    .filter(Boolean)
                    .join(" ");
            } else {
                valueA = personA[sortField] || "";
                valueB = personB[sortField] || "";

            }
            const comparison = String(valueA).localeCompare(
                String(valueB),
                "es",
                {
                    sensitivity: "base",
                    numeric: true
                }
            );
            return sortDirection === "asc"
                ? comparison
                : -comparison;
        });
        return personsCopy;
    }, [
        filteredPersons,
        sortField,
        sortDirection
    ]);
    // ---------------------------------------------------------
    // Total de páginas
    // ---------------------------------------------------------
    const totalPages = Math.ceil(
        sortedPersons.length / itemsPerPage
    );
    // ---------------------------------------------------------
    // Personas de la página actual
    // ---------------------------------------------------------
    const paginatedPersons = useMemo(() => {
        const startIndex =
            (currentPage - 1) *
            itemsPerPage;
        const endIndex =
            startIndex +
            itemsPerPage;

        return sortedPersons.slice(
            startIndex,
            endIndex
        );

    }, [
        sortedPersons,
        currentPage,
        itemsPerPage
    ]);
    // ---------------------------------------------------------
    // Reiniciar paginación al buscar o filtrar
    // ---------------------------------------------------------
    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        estadoFiltro,
        itemsPerPage
    ]);
    // ---------------------------------------------------------
    // Corregir página tras eliminar personas
    // ---------------------------------------------------------
    useEffect(() => {
        if (
            totalPages > 0 &&
            currentPage > totalPages
        ) {
            setCurrentPage(totalPages);
        }
        if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [
        totalPages,
        currentPage
    ]);
    // ---------------------------------------------------------
    // Cambiar ordenamiento
    // ---------------------------------------------------------
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(
                previousDirection =>
                    previousDirection === "asc"
                        ? "desc"
                        : "asc"
            );
        } else {
            setSortField(field);
            setSortDirection("asc");

        }
        setCurrentPage(1);
    };
    // ---------------------------------------------------------
    // Cambiar registros por página
    // ---------------------------------------------------------
    const handleItemsPerPageChange = (event) => {

        const newItemsPerPage = Number(
            event.target.value
        );
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };
    // ---------------------------------------------------------
    // Rango mostrado
    // ---------------------------------------------------------
    const firstVisibleRecord =
        sortedPersons.length === 0
            ? 0
            : (
                (currentPage - 1) *
                itemsPerPage
            ) + 1;
    const lastVisibleRecord = Math.min(
        currentPage * itemsPerPage,
        sortedPersons.length
    );
    // ---------------------------------------------------------
    // Números de página
    // ---------------------------------------------------------
    const pageNumbers = useMemo(() => {
        if (totalPages <= 5) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        }
        let startPage = Math.max(
            currentPage - 2,
            1
        );
        let endPage = Math.min(
            startPage + 4,
            totalPages
        );
        if (endPage - startPage < 4) {
            startPage = Math.max(
                endPage - 4,
                1
            );
        }
        return Array.from(
            {
                length:
                    endPage -
                    startPage +
                    1
            },
            (_, index) =>
                startPage + index
        );

    }, [
        currentPage,
        totalPages
    ]);
    // ---------------------------------------------------------
    // Render
    // ---------------------------------------------------------
    return (
        <>
            <PersonasDashboard
                persons={persons}
            />

            <PersonasToolbar
                search={search}
                setSearch={setSearch}
                estadoFiltro={estadoFiltro}
                setEstadoFiltro={setEstadoFiltro}
                /*
                 * La exportación recibe todos los resultados
                 * filtrados y ordenados, no solo la página actual.
                 */
                persons={sortedPersons}
            />
            <PersonasTable
                persons={paginatedPersons}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
            />
            {sortedPersons.length > 0 && (
                <div
                    className="
                        d-flex
                        flex-column
                        flex-lg-row
                        justify-content-between
                        align-items-lg-center
                        gap-3
                        mt-4
                    "
                >
                    {/* Cantidad por página */}
                    <div
                        className="
                            d-flex
                            align-items-center
                            gap-2
                        "
                    >
                        <span className="text-muted">
                            Mostrar
                        </span>

                        <Form.Select
                            value={itemsPerPage}
                            onChange={
                                handleItemsPerPageChange
                            }
                            aria-label="Cantidad de personas por página"
                            style={{
                                width: "90px"
                            }}
                        >
                            <option value={5}>
                                5
                            </option>

                            <option value={10}>
                                10
                            </option>

                            <option value={20}>
                                20
                            </option>

                            <option value={50}>
                                50
                            </option>
                        </Form.Select>

                        <span className="text-muted">
                            registros
                        </span>
                    </div>
                    {/* Resumen */}
                    <div className="text-muted">
                        Mostrando{" "}
                        <strong>
                            {firstVisibleRecord}
                        </strong>
                        {" "}a{" "}
                        <strong>
                            {lastVisibleRecord}
                        </strong>
                        {" "}de{" "}
                        <strong>
                            {sortedPersons.length}
                        </strong>
                        {" "}personas
                    </div>
                    {/* Navegación */}
                    {totalPages > 1 && (
                        <Pagination className="mb-0">

                            <Pagination.First
                                onClick={() =>
                                    setCurrentPage(1)
                                }
                                disabled={
                                    currentPage === 1
                                }
                                aria-label="Primera página"
                            />
                            <Pagination.Prev
                                onClick={() =>
                                    setCurrentPage(
                                        previousPage =>
                                            Math.max(
                                                previousPage - 1,
                                                1
                                            )
                                    )
                                }
                                disabled={
                                    currentPage === 1
                                }
                                aria-label="Página anterior"
                            />
                            {pageNumbers.map((page) => (
                                <Pagination.Item
                                    key={page}
                                    active={
                                        page === currentPage
                                    }
                                    onClick={() =>
                                        setCurrentPage(page)
                                    }
                                >
                                    {page}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() =>
                                    setCurrentPage(
                                        previousPage =>
                                            Math.min(
                                                previousPage + 1,
                                                totalPages
                                            )
                                    )
                                }
                                disabled={
                                    currentPage ===
                                    totalPages
                                }
                                aria-label="Página siguiente"
                            />
                            <Pagination.Last
                                onClick={() =>
                                    setCurrentPage(
                                        totalPages
                                    )
                                }
                                disabled={
                                    currentPage ===
                                    totalPages
                                }
                                aria-label="Última página"
                            />
                        </Pagination>
                    )}
                </div>
            )}
        </>
    );
};
export default PersonasContainer;