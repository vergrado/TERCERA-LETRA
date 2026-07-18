// ============================================================
// CasesContainer.jsx
// ============================================================
import { useMemo, useState } from "react";
import { useCaseContext } from "../../contexts/CaseContext";
import CasesDashboard from "./CasesDashboard";
import CasesToolbar from "./CasesToolbar";
import CasesTable from "./CasesTable";
const CasesContainer = () => {
    //----------------------------------------------------------
    // Contexto
    //----------------------------------------------------------
    const { cases } = useCaseContext();
    //----------------------------------------------------------
    // Buscador
    //----------------------------------------------------------
    const [search, setSearch] = useState("");
    //----------------------------------------------------------
    // Filtros
    //----------------------------------------------------------
    const [estadoFiltro, setEstadoFiltro] = useState("");
    const [prioridadFiltro, setPrioridadFiltro] = useState("");
    const [institucionFiltro, setInstitucionFiltro] = useState("");
    //----------------------------------------------------------
    // Instituciones
    //----------------------------------------------------------
    const instituciones = useMemo(() => {
        return [
            ...new Set(
                cases
                    .map(c => c.institucion)
                    .filter(Boolean)
            )
        ].sort();
    }, [cases]);
    //----------------------------------------------------------
    // Casos filtrados
    //----------------------------------------------------------
    const filteredCases = useMemo(() => {
        return cases.filter(item => {
            const texto = search.toLowerCase();
            const coincideBusqueda =
                item.titulo?.toLowerCase().includes(texto) ||
                item.institucion?.toLowerCase().includes(texto) ||
                item.responsableNombre?.toLowerCase().includes(texto);
            const coincideEstado =
                !estadoFiltro ||
                item.estado === estadoFiltro;
            const coincidePrioridad =
                !prioridadFiltro ||
                item.prioridad === prioridadFiltro;
            const coincideInstitucion =
                !institucionFiltro ||
                item.institucion === institucionFiltro;
            return (
                coincideBusqueda &&
                coincideEstado &&
                coincidePrioridad &&
                coincideInstitucion
            );
        });
    }, [
        cases,
        search,
        estadoFiltro,
        prioridadFiltro,
        institucionFiltro
    ]);
    //----------------------------------------------------------
    return (
        <>
            <CasesDashboard
                cases={cases}
            />
            <CasesToolbar
                search={search}
                setSearch={setSearch}
                estadoFiltro={estadoFiltro}
                setEstadoFiltro={setEstadoFiltro}
                prioridadFiltro={prioridadFiltro}
                setPrioridadFiltro={setPrioridadFiltro}
                institucionFiltro={institucionFiltro}
                setInstitucionFiltro={setInstitucionFiltro}
                instituciones={instituciones}
                cases={filteredCases}
            />
            <CasesTable
                cases={filteredCases}
            />
        </>
    );
};
export default CasesContainer;