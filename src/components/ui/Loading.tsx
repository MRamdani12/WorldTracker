import { LoadAnimation } from "../Animations/LoadingAnimation";

import styles from "./Loading.module.css";

export default function Loading() {
    return (
        <div className={`${styles.loading}`}>
            <LoadAnimation />
        </div>
    );
}
