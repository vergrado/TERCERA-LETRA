// ============================================================
// ToastContext.jsx
// ------------------------------------------------------------
// Notificaciones globales.
//
// Plataforma:
// TERCERA LETRA
// ============================================================
import {
    createContext,
    useContext,
    useState
} from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);
export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        show: false,
        title: "",
        message: "",
        bg: "success"
    });
    //----------------------------------------------------------
    const showToast = (
        title,
        message,
        bg = "success"
    ) => {
        setToast({
            show: true,
            title,
            message,
            bg
        });
    };
    //----------------------------------------------------------
    return (
        <ToastContext.Provider
            value={{ showToast }}
        >
            {children}
            <ToastContainer
                position="top-end"
                className="p-3"
            >
                <Toast
                    bg={toast.bg}
                    show={toast.show}
                    delay={3000}
                    autohide
                    onClose={() =>
                        setToast({
                            ...toast,
                            show: false
                        })
                    }
                >
                    <Toast.Header>
                        <strong className="me-auto">
                            {toast.title}
                        </strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {toast.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </ToastContext.Provider>
    );
};