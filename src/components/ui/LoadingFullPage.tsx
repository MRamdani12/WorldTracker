import { LoadAnimation } from "../Animations/LoadingAnimation";

import styles from "./LoadingFullPage.module.css";

export default function LoadingFullPage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${styles.loading} ${styles.wide}`}>
            <LoadAnimation />
            {children}
        </div>
    );
}
