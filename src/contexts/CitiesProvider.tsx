import { createContext, useReducer } from "react";

// import { fetchJSON } from "../utility/api/fetchJSON";
import type { CityType } from "../utility/types/CitiesType";
import type { CitiesActionType } from "../utility/types/CitiesActionType";
// import LoadingFullPage from "../components/ui/LoadingFullPage";

// Creating the necessary types
type CitiesContextType = {
    cities: CityType[] | [];
    currentCity: CityType | null;
    loading: boolean;
    error: string;
    getCity: (id: number | string) => void;
    createCity: (city: CityType) => void;
    deleteCity: (id: string | number) => void;
    clearError: () => void;
};

type CitiesReducerType = {
    cities: CityType[] | [];
    currentCity: CityType | null;
    loading: boolean;
    error: string;
};

// Disabled es-lint since I don't want to create a new file just for the context
// eslint-disable-next-line react-refresh/only-export-components
export const CitiesContext = createContext<CitiesContextType | null>(null);

// Change this according to your json-server port
// const BASE_URL = "http://localhost:8000";

const initialState: CitiesReducerType = {
    cities: [],
    currentCity: null,
    loading: false,
    error: "",
};

function reducer(state: CitiesReducerType, action: CitiesActionType) {
    switch (action.type) {
        case "loading":
            return { ...state, loading: true };
        case "cities/loaded":
            return { ...state, cities: action.payload, loading: false };
        case "city/loaded":
            return { ...state, currentCity: action.payload };
        case "city/created":
            return {
                ...state,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
                loading: false,
            };
        case "city/deleted":
            return {
                ...state,
                cities: state.cities.filter((c) => c.id !== action.payload),
                loading: false,
            };
        case "rejected":
            return { ...state, error: action.payload };
        case "clearError":
            return { ...state, error: "" };
        default:
            throw new Error("Action type unknown");
    }
}

export function CitiesProvider({ children }: { children: React.ReactNode }) {
    const [{ cities, currentCity, loading, error }, dispatch] = useReducer(
        reducer,
        initialState
    );

    // const [pageLoading, setPageLoading] = useState(true);

    // useEffect(() => {
    //     function handlePageLoad() {
    //         setPageLoading(false);
    //     }

    //     if (document.readyState === "complete") {
    //         setPageLoading(false);
    //     } else {
    //         window.addEventListener("load", handlePageLoad);

    //         return () => {
    //             window.removeEventListener("load", handlePageLoad);
    //         };
    //     }
    // }, []);

    // Uncomment the code below if you want to use json-server for the fake API

    // useEffect(() => {
    //     async function fetchCities() {
    //         dispatch({ type: "loading" });
    //         try {
    //             const data = await fetchJSON<CityType[]>(`${BASE_URL}/cities`);

    //             dispatch({ type: "cities/loaded", payload: data });
    //         } catch (err) {
    //             dispatch({ type: "rejected", payload: String(err) });
    //         }
    //     }
    //     fetchCities();
    // }, []);

    function getCity(id: number | string) {
        if (id === currentCity?.id) return;

        const [city] = cities.filter((c) => c.id === id);

        dispatch({ type: "city/loaded", payload: city });
    }

    // Uncomment the code below if you want to use json-server for the fake API

    // async function createCity(city: CityType) {
    //     dispatch({ type: "loading" });

    //     try {
    //         await fetch(`${BASE_URL}/cities`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(city),
    //         });
    //         dispatch({ type: "city/created", payload: city });
    //     } catch (err) {
    //         dispatch({ type: "rejected", payload: String(err) });
    //     }
    // }

    function createCity(city: CityType) {
        dispatch({ type: "city/created", payload: city });
    }

    // Uncomment the code below if you want to use json-server for the fake API

    // async function deleteCity(id: string | number) {
    //     dispatch({ type: "loading" });

    //     try {
    //         await fetch(`${BASE_URL}/cities/${id}`, {
    //             method: "DELETE",
    //         });
    //         dispatch({ type: "city/deleted", payload: id });
    //     } catch (err) {
    //         dispatch({ type: "rejected", payload: String(err) });
    //     }
    // }

    function deleteCity(id: string | number) {
        dispatch({ type: "city/deleted", payload: id });
    }

    function clearError() {
        dispatch({ type: "clearError" });
    }

    // if (pageLoading) return <LoadingFullPage>Loading page...</LoadingFullPage>;

    return (
        <CitiesContext.Provider
            value={{
                cities,
                currentCity,
                loading,
                error,
                getCity,
                createCity,
                deleteCity,
                clearError,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}
