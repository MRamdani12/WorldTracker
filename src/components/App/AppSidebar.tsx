import { NavLink, Outlet } from "react-router-dom";
import Logo from "../ui/Logo";
import styles from "./AppSidebar.module.css";

export default function AppSidebar() {
    return (
        <aside className={styles.sidebar}>
            <Logo />
            <nav className={styles.nav}>
                <NavLink to="cities">Cities</NavLink>
                <NavLink to="countries">Countries</NavLink>
            </nav>

            <Outlet />

            <footer>
                © Copyright {new Date().getFullYear()} by WorldTracker Inc.
            </footer>
        </aside>
    );
}
