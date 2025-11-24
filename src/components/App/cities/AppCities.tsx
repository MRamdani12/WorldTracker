import Loading from "../../ui/Loading";
import AppCityList from "./AppCityList";

import styles from "./AppCities.module.css";
import { useCitiesContext } from "../../../utility/hooks/useCitiesContext";
import Message from "../../ui/Message";

export default function AppCities() {
    const { cities, loading } = useCitiesContext();

    if (loading) {
        return <Loading />;
    }

    if (!cities.length) {
        return <Message>Click on the map to start your journey!</Message>;
    }

    return (
        <ul className={styles.list}>
            {cities.map((c) => {
                return <AppCityList key={c.id} city={c} />;
            })}
        </ul>
    );
}
