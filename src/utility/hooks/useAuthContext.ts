import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

// Small custom hook to check if the context is null or not.
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("AuthContext was used outside the AuthProvider");
    return context;
}
