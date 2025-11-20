import type { CityType } from "../../../utility/types/CitiesType";
import Loading from "../../ui/Loading";
import AppCityList from "./AppCityList";

import styles from "./AppCities.module.css";

type AppCitiesProps = {
    cities: CityType[];
    loading: boolean;
};

export default function AppCities({ cities, loading = true }: AppCitiesProps) {
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <ul className={styles.list}>
                    {cities.map((c) => {
                        return <AppCityList key={c.id} city={c} />;
                    })}
                </ul>
            )}
        </>
    );
}
