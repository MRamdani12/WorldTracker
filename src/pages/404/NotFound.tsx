import styles from "./NotFound.module.css";

import { BackgroundGrid } from "../../components/ui/Background";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <Link to="/">
                <h1>Page not found</h1>
                <BackgroundGrid />
                <Button>Go back home</Button>
            </Link>
        </div>
    );
}
