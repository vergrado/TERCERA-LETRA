// ============================================================
// DocumentAssociationFields.jsx
// ------------------------------------------------------------
// Asociación del documento con Personas y Casos.
// ============================================================
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const DocumentAssociationFields = ({
    persons = [],
    personaId,
    setPersonaId,
    cases = [],
    casoId,
    setCasoId
}) => {
    const availableCases = personaId
        ? cases.filter(
            (caseItem) =>
                !caseItem.personaId ||
                caseItem.personaId === personaId
        )
        : cases;
    return (
        <>
            <h5 className="mb-3">
                Asociación
            </h5>
            <Row className="g-3">
                <Col md={6}>
                    <Form.Group controlId="documentPerson">
                        <Form.Label>
                            Persona asociada
                        </Form.Label>
                        <Form.Select
                            value={personaId}
                            onChange={(event) => {
                                const nextPersonId =
                                    event.target.value;
                                setPersonaId(nextPersonId);
                                const selectedCase =
                                    cases.find(
                                        (caseItem) =>
                                            caseItem.id === casoId
                                    );
                                if (
                                    selectedCase?.personaId &&
                                    selectedCase.personaId !==
                                    nextPersonId
                                ) {
                                    setCasoId("");
                                }
                            }}
                        >
                            <option value="">
                                Sin persona asociada
                            </option>
                            {persons.map((person) => (
                                <option
                                    key={person.id}
                                    value={person.id}
                                >
                                    {`${person.nombres || ""} ${person.apellidos || ""}`.trim()}
                                    {person.rut
                                        ? ` — ${person.rut}`
                                        : ""}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="documentCase">
                        <Form.Label>
                            Caso asociado
                        </Form.Label>
                        <Form.Select
                            value={casoId}
                            onChange={(event) =>
                                setCasoId(event.target.value)
                            }
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
                            Debe seleccionar al menos una persona
                            o un caso.
                        </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <hr className="my-4" />
        </>
    );
};
export default DocumentAssociationFields;