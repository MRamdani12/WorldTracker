import { useSearchParams } from "react-router-dom";

// Small custom hook to get the url position
export function useUrlPosition() {
    const [searchParams] = useSearchParams();

    const lat = Number(searchParams.get("lat"));
    const lng = Number(searchParams.get("lng"));

    return [lat, lng];
}
