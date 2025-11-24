import { Navigate } from "react-router-dom";
import { useAuthContext } from "../utility/hooks/useAuthContext";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fake login function
    const { isLogin } = useAuthContext();

    return isLogin ? children : <Navigate to="/" />;
}
