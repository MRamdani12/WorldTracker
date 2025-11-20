import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    url?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
    children,
    className = "primary",
    url = "/",
    onClick,
}: ButtonProps) {
    return (
        <Link to={`${url}`}>
            {" "}
            <button
                onClick={onClick}
                className={`${styles.button} ${styles[className]}`}
            >
                {children}
            </button>
        </Link>
    );
}
