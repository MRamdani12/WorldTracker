import Button from "./Button";
import styles from "./Navigation.module.css";
import Logo from "./Logo";

export default function Navigation({
    showButton = true,
}: {
    showButton?: boolean;
}) {
    return (
        <nav className={styles.nav}>
            <Logo />
            {showButton && <Button url="login">Login</Button>}
        </nav>
    );
}
