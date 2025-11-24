// This is a fake login components, all it does is just matching the form input with the AuthProvider's email and password

import { useEffect, useState, type FormEvent } from "react";

import {
    BackgroundGrid,
    BackgroundMapSmall,
} from "../../components/ui/Background";
import Button from "../../components/ui/Button";
import Navigation from "../../components/ui/Navigation";

import styles from "./Login.module.css";
import { useAuthContext } from "../../utility/hooks/useAuthContext";
import Message from "../../components/ui/Message";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("logan@example.com");
    const [password, setPassword] = useState("qwerty");
    const navigate = useNavigate();

    const { error, login, clearError } = useAuthContext();

    function formSubmit(e: FormEvent) {
        e.preventDefault();

        login(email, password, () => navigate("/app"));
    }

    // Clean the error everytime component mount
    useEffect(() => {
        clearError();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navigation showButton={false} />
            <div className={styles.login}>
                <BackgroundGrid />
                <form onSubmit={formSubmit} className={styles.form} action="#">
                    <BackgroundMapSmall className={styles.formBg} />
                    <div className={styles.inputWrapper}>
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>

                    <Button>Login</Button>
                </form>
            </div>
            {error && (
                <div className={styles.error}>
                    <Message className="error">{error}</Message>
                </div>
            )}
        </>
    );
}
