import { useState } from "react";

import {
    BackgroundGrid,
    BackgroundMapSmall,
} from "../../components/ui/Background";
import Button from "../../components/ui/Button";
import Navigation from "../../components/ui/Navigation";

import styles from "./Login.module.css";

export default function Login() {
    const [email, setEmail] = useState("logan@example.com");
    const [password, setPassword] = useState("qwerty");

    return (
        <>
            <Navigation showButton={false} />
            <div className={styles.login}>
                <BackgroundGrid />
                <form className={styles.form} action="#">
                    <BackgroundMapSmall />
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
                    <Button url="/app">Login</Button>
                </form>
            </div>
        </>
    );
}
