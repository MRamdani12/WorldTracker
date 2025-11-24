import grid from "../../assets/grid.svg";
import africa from "../../assets/africa.svg";
import smallMap from "../../assets/smallmap.svg";
import styles from "./Background.module.css";

type BackgroundProps = {
    className?: string;
};

export function BackgroundGrid({ className }: BackgroundProps) {
    return (
        <img
            className={`${styles.backgroundGrid} ${className}`}
            src={grid}
            alt="grid"
        />
    );
}

export function BackgroundMap({ className }: BackgroundProps) {
    return (
        <img
            className={`${styles.backgroundMap} ${className}`}
            src={africa}
            alt="africa"
        />
    );
}

export function BackgroundMapSmall({ className }: BackgroundProps) {
    return (
        <img
            className={`${styles.backgroundMapSmall} ${className}`}
            src={smallMap}
            alt="africa"
        />
    );
}
