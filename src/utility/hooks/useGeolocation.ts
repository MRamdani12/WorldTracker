// Custom hook to get the user's current position

import { useState } from "react";

type GeolocationTypes = {
    lat: string;
    lng: string;
};

export function useGeolocation(): [
    GeolocationTypes | null,
    () => void,
    boolean
] {
    const [geolocation, setGeolocation] = useState<GeolocationTypes | null>(
        null
    );
    const [loading, setLoading] = useState(false);

    function getGeolocation() {
        if (!navigator.geolocation) {
            alert("Your browser does not support geolocation");
            console.error("Your browser does not support geolocation");
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (location) => {
                setGeolocation({
                    lat: String(location.coords.latitude),
                    lng: String(location.coords.longitude),
                });
                setLoading(false);
            },
            (err) => {
                alert(err);
                console.error(err);
                setLoading(false);
            }
        );
    }
    return [geolocation, getGeolocation, loading];
}
