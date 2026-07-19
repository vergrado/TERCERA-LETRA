import { useDocumentContext } from "../../contexts/DocumentContext";
import DocumentsDashboard from "./DocumentsDashboard";
import DocumentsTable from "./DocumentsTable";
const DocumentsContainer = () => {
    const { documents = [] } = useDocumentContext();
    return (
        <>
            <DocumentsDashboard documents={documents} />
            <DocumentsTable />
        </>
    );
};
export default DocumentsContainer;