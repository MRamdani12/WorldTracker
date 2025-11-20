import grid from "../../assets/grid.svg";
import africa from "../../assets/africa.svg";
import smallMap from "../../assets/smallmap.svg";
import styles from "./Background.module.css";

export function BackgroundGrid() {
    return <img className={styles.backgroundGrid} src={grid} alt="grid" />;
}

export function BackgroundMap() {
    return <img className={styles.backgroundMap} src={africa} alt="africa" />;
}

export function BackgroundMapSmall() {
    return (
        <img
            className={styles.backgroundMapSmall}
            src={smallMap}
            alt="africa"
        />
    );
}
