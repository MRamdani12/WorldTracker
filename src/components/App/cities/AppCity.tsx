import { useNavigate } from "react-router-dom";
import { useCitiesContext } from "../../../utility/hooks/useCitiesContext";

import Button from "../../ui/Button";

import styles from "./AppCity.module.css";

const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

export default function AppCity() {
    const { currentCity } = useCitiesContext();
    const navigate = useNavigate();

    if (!currentCity) return;
    const currentCityDate = new Date(currentCity.date).toLocaleDateString(
        "en-GB",
        options
    );

    return (
        <div className={styles.cityWrapper}>
            <div className={styles.cityInfoWrapper}>
                <div className={styles.cityInfoItem}>
                    <span>City Name</span>
                    <div className={styles.city}>
                        <p>{currentCity?.cityName}</p>
                        <div className={styles.flagWrapper}>
                            <img
                                className={styles.flag}
                                alt={currentCity.countryCode}
                                src={`https://flagservice.net/${currentCity.countryCode}/flag.svg`}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.cityInfoItem}>
                    <span>You went to {currentCity.cityName} on</span>
                    <p>{currentCityDate}</p>
                </div>
                {currentCity?.notes && (
                    <div className={styles.cityInfoItem}>
                        <span>Your Notes</span>
                        <p>{currentCity.notes}</p>
                    </div>
                )}
                <div className={styles.cityInfoItem}>
                    <span>Learn More</span>
                    <div>
                        <a
                            href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
                            target="_blank"
                        >
                            Check out {currentCity.cityName} on Wikipedia →
                        </a>
                    </div>
                </div>
                <Button
                    onClick={() => navigate(-1)}
                    className="secondaryWithBg"
                >
                    ← Back
                </Button>
            </div>
        </div>
    );
}
