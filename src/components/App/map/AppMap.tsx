import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../../utility/hooks/useUrlPosition";
import { useEffect, useRef, useState } from "react";

import leaflet, { type LatLngTuple } from "leaflet";
import styles from "./AppMap.module.css";
import { useCitiesContext } from "../../../utility/hooks/useCitiesContext";
import Button from "../../ui/Button";
import { useGeolocation } from "../../../utility/hooks/useGeolocation";

export default function AppMap() {
    const [mapLat, mapLng] = useUrlPosition();
    const [mapPosition, setMapPosition] = useState<LatLngTuple>([
        -5.189707330332176, 123.818312401592,
    ]);
    const navigate = useNavigate();

    // Save the current map in a ref so it doesn't get re-rendered.
    const mapRef = useRef<leaflet.Map | null>(null);

    // Save the leaflet layerGroup to clear it later.
    const markersGroupRef = useRef<leaflet.LayerGroup | null>(null);
    const { cities } = useCitiesContext();
    const [geolocation, getGeolocation, loading] = useGeolocation();
    const clickInsideMap = useRef(false);

    // Initialize map
    useEffect(() => {
        // Return if there's already a map or layerGroup
        if (mapRef.current || markersGroupRef.current) return;

        // Initialize the map in leaflet with default coordinates to Indonesia
        mapRef.current = leaflet
            .map("map")
            .setView([-5.189707330332176, 123.818312401592], 5);

        // Adding layerGroup to the map.
        markersGroupRef.current = leaflet.layerGroup().addTo(mapRef.current);

        // Used open street map for the tiles, the {s} is important for caching.
        leaflet
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            })
            .addTo(mapRef.current);
    }, []);

    // Adding marker to each coordinates
    useEffect(() => {
        if (!mapRef.current || !markersGroupRef.current) return;
        const group = markersGroupRef.current;

        // Clear the layer everytime the effect run so the map can synchronize the markers with the cities state.
        group.clearLayers();

        cities.map((c) =>
            leaflet
                .marker([c.position.lat, c.position.lng])
                .addTo(group)
                .bindPopup(
                    `
                    <span class="popup">
                        <img src="https://flagservice.net/${c.countryCode}/flag.svg" alt="${c.countryCode}" /> ${c.cityName}
                    </span>
                    
                    `
                )
        );
    }, [cities]);

    // Update mapPosition according to url
    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    // Move map position according to mapPosition
    useEffect(() => {
        if (!mapRef.current) return;

        // check if a click is coming from inside the map. If not, just set the view to mapPosition state instead of using useNavigate hook.
        mapRef.current.setView(mapPosition);

        if (clickInsideMap.current) {
            navigate(`form?lat=${mapPosition[0]}&lng=${mapPosition[1]}`);
        }

        clickInsideMap.current = false;
    }, [mapPosition, navigate]);

    // Watch map click event on initial mount
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current;

        function handleMapClick(e: leaflet.LeafletMouseEvent) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            // set the map position to button click position and also mark the click as inside the map.
            setMapPosition([lat, lng]);
            clickInsideMap.current = true;
        }

        map.on("click", handleMapClick);

        return () => {
            map.off("click", handleMapClick);
        };
    }, []);

    // Update mapPosition to user position
    useEffect(() => {
        if (geolocation) {
            setMapPosition([Number(geolocation.lat), Number(geolocation.lng)]);
            clickInsideMap.current = true;
        }
    }, [geolocation]);

    return (
        <div className={styles.map}>
            <div className={styles.leafletMap} id="map"></div>
            {!geolocation && (
                <Button onClick={getGeolocation} className="secondaryWithBg">
                    {loading ? (
                        "Loading..."
                    ) : (
                        <>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_2377_12)">
                                    <path
                                        d="M12.0003 0C8.04556 0 4.7998 3.2352 4.7998 7.18128C4.7998 8.71056 5.2894 10.1357 6.115 11.303L6.08548 11.257L10.6947 19.2245L10.7182 19.255C10.904 19.4974 11.0878 19.6927 11.3103 19.8398C11.5328 19.987 11.8176 20.0798 12.0975 20.0518C12.6567 19.9956 12.9816 19.6092 13.2819 19.2022L13.3006 19.177L18.3824 10.5288L18.3864 10.5216C18.5081 10.302 18.5962 10.0805 18.6716 9.86592C19.0201 9.01376 19.1995 8.10195 19.1998 7.18128C19.1998 3.2352 15.955 0 12.0003 0ZM12.0003 1.2C15.3012 1.2 17.9998 3.89232 17.9998 7.18128C18 7.94949 17.85 8.71033 17.5582 9.42096L17.5522 9.43584L17.5469 9.45144C17.4838 9.63312 17.4152 9.798 17.336 9.94104L12.3058 18.5009C12.0831 18.7942 11.9278 18.8633 11.9777 18.858C12.0034 18.8556 12.0272 18.8758 11.9722 18.8393C11.9196 18.8047 11.8124 18.7025 11.6852 18.5402L7.111 10.632L7.09516 10.6097C6.40516 9.63528 5.9998 8.4552 5.9998 7.18128C5.9998 3.89256 8.69932 1.2 12.0003 1.2ZM12.0003 3.084C9.7294 3.084 7.89268 4.91424 7.89268 7.18128C7.89268 9.44832 9.72964 11.2786 12.0003 11.2786C14.2709 11.2786 16.1069 9.44808 16.1069 7.18128C16.1069 4.91424 14.2709 3.084 12.0003 3.084ZM12.0003 4.284C13.6364 4.284 14.9069 5.5524 14.9069 7.18128C14.9069 8.81016 13.6366 10.0786 12.0003 10.0786C10.364 10.0786 9.09268 8.80992 9.09268 7.18128C9.09268 5.5524 10.3642 4.284 12.0003 4.284Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M15.3237 17.605L14.9918 18.0154C15.4406 18.0696 15.875 18.1332 16.2818 18.2103L14.9668 18.5998L16.7219 19.0666L18.0302 18.654C18.8337 18.9235 19.9463 19.2531 20.315 19.6277H17.6918L17.9524 20.3899H20.6745C20.6663 20.8195 19.8983 21.1685 19.1649 21.4512L17.3047 21.049L15.5519 21.6771L17.4239 22.1043C16.331 22.4019 14.4959 22.5828 12.9767 22.6661L12.9129 21.7925H11.0875L11.0234 22.6661C9.50417 22.5828 7.66937 22.4021 6.57617 22.1045L8.44841 21.6771L6.69569 21.049L4.83521 21.4512C4.11233 21.2316 3.33401 20.8193 3.32585 20.3899H6.04817L6.30881 19.6277H3.68561C4.05425 19.2531 5.16689 18.9235 5.97041 18.654L7.27865 19.0666L9.03377 18.5998L7.71881 18.2103C8.14347 18.1318 8.57058 18.0672 8.99945 18.0166L8.67233 17.6055C5.12393 17.9743 2.17481 18.7599 1.40153 20.0004C0.168173 21.9775 4.71809 23.9664 11.849 23.9974C11.9551 24.0027 12.0597 23.9988 12.1586 23.9974C19.2854 23.9647 23.8312 21.9766 22.5988 20.0004C21.8251 18.7594 18.8743 17.9736 15.3237 17.605Z"
                                        fill="CurrentColor"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2377_12">
                                        <rect
                                            width="24"
                                            height="24"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            Use your position{" "}
                        </>
                    )}
                </Button>
            )}
        </div>
    );
}
