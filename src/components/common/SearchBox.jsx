// ============================================================
// SearchBox.jsx
// ------------------------------------------------------------
// Componente reutilizable de búsqueda.
//
// Plataforma:
// TERCERA LETRA
//
// Responsabilidades:
//
// • Capturar texto de búsqueda.
// • Notificar cambios al componente padre.
// • Ser reutilizable en cualquier módulo.
//
// ============================================================

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const SearchBox = ({
    value,
    onChange,
    placeholder = "Buscar..."
}) => {

    return (

        <InputGroup className="mb-4">

            <InputGroup.Text>

                <i className="bi bi-search"></i>

            </InputGroup.Text>

            <Form.Control

                type="text"

                placeholder={placeholder}

                value={value}

                onChange={(e) => onChange(e.target.value)}

            />

        </InputGroup>

    );

};

export default SearchBox;