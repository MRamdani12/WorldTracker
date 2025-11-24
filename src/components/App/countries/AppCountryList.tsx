import type { CityType } from "../../../utility/types/CitiesType";
import styles from "./AppCountryList.module.css";

type AppCountryListProps = {
    city: CityType;
};

export default function AppCountryList({ city }: AppCountryListProps) {
    return (
        <li className={styles.countryList}>
            <p>{city.country}</p>
            <div className={styles.flagWrapper}>
                <img
                    className={styles.flag}
                    alt={city.countryCode}
                    src={`https://flagservice.net/${city.countryCode}/flag.svg`}
                />
            </div>
        </li>
    );
}
