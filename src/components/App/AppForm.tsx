import { useNavigate } from "react-router-dom";
import { BackgroundMap } from "../ui/Background";
import Button from "../ui/Button";

import styles from "./AppForm.module.css";
import { useUrlPosition } from "../../utility/hooks/useUrlPosition";
import { useEffect, useReducer } from "react";
import { fetchJSON } from "../../utility/api/fetchJSON";
import Message from "../ui/Message";
import Loading from "../ui/Loading";
import type { FormReducerStateType } from "../../utility/types/FormReducerStateType";
import type { FormReducerActionType } from "../../utility/types/FormReducerActionType";
import { useCitiesContext } from "../../utility/hooks/useCitiesContext";

type ReverseGeocodeRes = {
    city: string;
    countryCode: string;
    countryName: string;
};

// Using bigDataCloud reverse-geocode API
const BASE_URL = "https://api-bdc.net/data/reverse-geocode";

const initialState: FormReducerStateType = {
    city: "",
    countryCode: "",
    countryName: "",
    geocodeLoading: false,
    date: new Date().toISOString().slice(0, 10),
    notes: "",
    error: null,
};

function formReducer(
    state: FormReducerStateType,
    action: FormReducerActionType
) {
    switch (action.type) {
        case "city/updated":
            return { ...state, city: action.payload };
        case "countryCode/updated":
            return { ...state, countryCode: action.payload };
        case "date/updated":
            return { ...state, date: action.payload };
        case "notes/updated":
            return { ...state, notes: action.payload };
        case "state/updated":
            return { ...state, ...action.payload, geocodeLoading: false };
        case "geocodeLoading":
            return { ...state, geocodeLoading: true };
        case "rejected":
            return { ...state, error: action.payload, geocodeLoading: false };
        case "clearError":
            return { ...state, error: "" };
        default:
            throw new Error("Action unknown");
    }
}

export default function AppForm() {
    const [
        { city, countryCode, countryName, geocodeLoading, date, notes, error },
        dispatch,
    ] = useReducer(formReducer, initialState);
    const navigate = useNavigate();
    const [lat, lng] = useUrlPosition();
    const { createCity } = useCitiesContext();

    useEffect(() => {
        if (!lat && !lng) return;

        async function fetchReverseGeocode() {
            dispatch({ type: "geocodeLoading" });
            try {
                // Change the URL with your own API
                const data = await fetchJSON<ReverseGeocodeRes>(
                    `${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=${
                        import.meta.env.VITE_BIGDATACLOUD_API_KEY
                    }`
                );
                dispatch({ type: "state/updated", payload: data });
            } catch (err) {
                console.error(err);
                dispatch({
                    type: "rejected",
                    payload: `Error when fetching reverse geocode: ${String(
                        err
                    )}`,
                });
            }
        }
        fetchReverseGeocode();
    }, [lat, lng]);

    useEffect(() => {
        dispatch({ type: "clearError" });
    }, []);

    function formSubmit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();

        const cityObj = {
            cityName: city,
            country: countryName,
            countryCode: countryCode,
            date: date,
            notes: notes,
            position: {
                lat: lat,
                lng: lng,
            },
            id: crypto.randomUUID(),
        };

        createCity(cityObj);
        navigate("/app");
    }

    if (!lat && !lng) {
        return <Message>Click on the map</Message>;
    }

    if (geocodeLoading) {
        return <Loading />;
    }

    if (error) {
        return <Message className="error">{error}</Message>;
    }

    if (!countryCode) {
        return (
            <Message>There doesn't seem to be any city in that area</Message>
        );
    }

    return (
        <form className={`${styles.form}`}>
            <BackgroundMap className={styles.formBg} />
            <div className={styles.inputWrapper}>
                <label>City name</label>
                <input
                    required
                    value={city}
                    onChange={(e) =>
                        dispatch({
                            type: "city/updated",
                            payload: e.target.value,
                        })
                    }
                    type="text"
                    placeholder="City Name"
                />
                <img
                    className={styles.flag}
                    src={`https://flagservice.net/${countryCode}/flag.svg`}
                    alt={countryCode}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label>When did you go to {city}?</label>
                <input
                    required
                    value={date}
                    onChange={(e) => {
                        dispatch({
                            type: "date/updated",
                            payload: e.target.value,
                        });
                    }}
                    type="date"
                    placeholder="When did you go to "
                />
            </div>
            <div className={styles.inputWrapper}>
                <label>Notes about your trip to {city}</label>
                <textarea
                    value={notes}
                    onChange={(e) =>
                        dispatch({
                            type: "notes/updated",
                            payload: e.target.value,
                        })
                    }
                    placeholder="Notes"
                ></textarea>
            </div>

            <div className={styles.formButtonsWrapper}>
                <Button onClick={formSubmit} className="secondary">
                    Add
                </Button>
                <Button
                    className="secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/app");
                    }}
                >
                    ← Back
                </Button>
            </div>
        </form>
    );
}
