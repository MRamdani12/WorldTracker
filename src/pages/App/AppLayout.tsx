import AppMap from "../../components/App/map/AppMap";
import AppSidebar from "../../components/App/AppSidebar";

import styles from "./AppLayout.module.css";

export default function AppLayout() {
    return (
        <div className={styles.app}>
            <AppSidebar />
            <AppMap />
        </div>
    );
}
