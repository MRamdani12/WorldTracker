import Button from "./Button";
import styles from "./Navigation.module.css";
import Logo from "./Logo";
import { useAuthContext } from "../../utility/hooks/useAuthContext";

export default function Navigation({
    showButton = true,
}: {
    showButton?: boolean;
}) {
    const { isLogin } = useAuthContext();

    return (
        <nav className={styles.nav}>
            <Logo />
            {showButton && (
                <Button url={`${isLogin ? "app" : "login"}`}>
                    {isLogin ? "Go to app" : "login"}
                </Button>
            )}
        </nav>
    );
}
