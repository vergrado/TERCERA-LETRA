// ============================================================
// AlertAssociationFields.jsx
// ------------------------------------------------------------
// Asociación de la alerta con Personas y Casos.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// ============================================================
const AlertAssociationFields = ({
    persons = [],
    personaId,
    setPersonaId,
    cases = [],
    casoId,
    setCasoId
}) => {
    //----------------------------------------------------------
    // Casos disponibles según la persona seleccionada
    //----------------------------------------------------------
    const availableCases = personaId
        ? cases.filter(
            (caseItem) =>
                !caseItem.personaId ||
                caseItem.personaId === personaId
        )
        : cases;
    //----------------------------------------------------------
    // Cambiar persona
    //----------------------------------------------------------
    const handlePersonChange = (event) => {
        const nextPersonId = event.target.value;
        setPersonaId(nextPersonId);
        const selectedCase = cases.find(
            (caseItem) => caseItem.id === casoId
        );
        if (
            selectedCase?.personaId &&
            selectedCase.personaId !== nextPersonId
        ) {
            setCasoId("");
        }
    };
    //----------------------------------------------------------
    // Cambiar caso
    //----------------------------------------------------------
    const handleCaseChange = (event) => {
        const nextCaseId = event.target.value;
        setCasoId(nextCaseId);
        const selectedCase = cases.find(
            (caseItem) => caseItem.id === nextCaseId
        );
        if (selectedCase?.personaId) {
            setPersonaId(selectedCase.personaId);
        }
    };
    //----------------------------------------------------------
    // Render
    //----------------------------------------------------------
    return (
        <>
            <h5 className="mb-3">
                Asociación
            </h5>
            <Row className="g-3">
                <Col md={6}>
                    <Form.Group controlId="alertPerson">
                        <Form.Label>
                            Persona asociada
                        </Form.Label>
                        <Form.Select
                            value={personaId}
                            onChange={handlePersonChange}
                        >
                            <option value="">
                                Sin persona asociada
                            </option>
                            {persons.map((person) => {
                                const fullName =
                                    `${person.nombres || ""} ${
                                        person.apellidos || ""
                                    }`.trim();
                                return (
                                    <option
                                        key={person.id}
                                        value={person.id}
                                    >
                                        {fullName ||
                                            "Persona sin nombre"}

                                        {person.rut
                                            ? ` — ${person.rut}`
                                            : ""}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="alertCase">
                        <Form.Label>
                            Caso asociado
                        </Form.Label>
                        <Form.Select
                            value={casoId}
                            onChange={handleCaseChange}
                        >
                            <option value="">
                                Sin caso asociado
                            </option>
                            {availableCases.map((caseItem) => (
                                <option
                                    key={caseItem.id}
                                    value={caseItem.id}
                                >
                                    {caseItem.titulo ||
                                        "Caso sin título"}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Text className="text-muted">
                            Debe asociar la alerta al menos a una
                            persona o a un caso.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <hr className="my-4" />
        </>
    );
};
export default AlertAssociationFields;