import type { CityType } from "../../../utility/types/CitiesType";
import styles from "./AppCityList.module.css";

type AppCityListProps = {
    city: CityType;
};

export default function AppCityList({ city }: AppCityListProps) {
    const date = new Date(city.date).toLocaleString();

    return (
        <li className={styles.cityList}>
            <div className={styles.country}>
                <div className={styles.flagWrapper}>
                    <img
                        className={styles.flag}
                        alt={city.countryCode}
                        src={`https://flagservice.net/${city.countryCode}/flag.svg`}
                    />
                </div>

                <p>{city.cityName}</p>
            </div>
            <div className={styles.date}>
                <p className="date">({date})</p>
                <div className="closeButton">x</div>
            </div>
        </li>
    );
}
