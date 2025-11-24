import { useContext } from "react";
import { CitiesContext } from "../../contexts/CitiesProvider";

// Small custom hook to check if the context is null or not.
export function useCitiesContext() {
    const context = useContext(CitiesContext);
    if (!context)
        throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}
