import styles from "./LoadingAnimation.module.css";

export function LoadAnimation() {
    return (
        <div className={styles.loadContainer}>
            <div className={styles.loadPeriod}></div>
            <div className={styles.loadPeriod}></div>
            <div className={styles.loadPeriod}></div>
            <div className={styles.loadPeriod}></div>
        </div>
    );
}
