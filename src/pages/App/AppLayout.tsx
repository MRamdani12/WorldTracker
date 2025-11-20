import AppMap from "../../components/App/AppMap";
import AppSidebar from "../../components/App/AppSidebar";

import styles from "./AppLayout.module.css";

export function AppLayout() {
    return (
        <div className={styles.app}>
            <AppSidebar />
            <AppMap />
        </div>
    );
}
