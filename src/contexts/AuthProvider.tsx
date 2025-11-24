// This is a auth provider, haven't learned back-end yet.

import { createContext, useState } from "react";

type AuthContextType = {
    isLogin: boolean;
    error: string;
    login: (email: string, password: string, onSuccess: () => void) => void;
    clearError: () => void;
};

const user = {
    email: "logan@example.com",
    password: "qwerty",
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState("");

    function login(email: string, password: string, onSuccess: () => void) {
        if (email === user.email && password === user.password) {
            setIsLogin(true);
            setError("");
            onSuccess();
        } else {
            setError(
                "Wrong credentials. Try using: logan@gmail.com & qwerty as email and password"
            );
        }
    }

    function clearError() {
        setError("");
    }

    return (
        <AuthContext.Provider value={{ isLogin, error, login, clearError }}>
            {children}
        </AuthContext.Provider>
    );
}
