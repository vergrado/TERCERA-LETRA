// ============================================================
// PersonaActions.jsx
// ============================================================
import { useNavigate } from "react-router-dom";
import TableActions from "../common/TableActions";
// ============================================================
const PersonaActions = ({
    person,
    onDelete
}) => {
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`/personas/${person.id}`);
    };
    const handleEdit = () => {
        navigate(`/personas/${person.id}/editar`);
    };
    const handleDelete = () => {
        onDelete(person);
    };
    return (
        <TableActions
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
};
export default PersonaActions;