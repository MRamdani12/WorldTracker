import { useCitiesContext } from "../../../utility/hooks/useCitiesContext";

import Loading from "../../ui/Loading";
import AppCountryList from "./AppCountryList";

import styles from "./AppCountries.module.css";

export default function AppCountries() {
    const { cities, loading } = useCitiesContext();
    const uniqueCountry = Array.from(
        new Map(cities.map((c) => [c.countryCode, { ...c }])).values()
    );
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <ul className={styles.list}>
                    {uniqueCountry.map((c) => {
                        return <AppCountryList key={c.id} city={c} />;
                    })}
                </ul>
            )}
        </>
    );
}
