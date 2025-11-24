import styles from "./Message.module.css";

type MessageProps = {
    children: React.ReactNode;
    className?: "message" | "error";
};

export default function Message({
    children,
    className = "message",
}: MessageProps) {
    return <div className={styles[className]}>{children}</div>;
}
