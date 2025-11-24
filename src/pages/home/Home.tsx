import { BackgroundGrid, BackgroundMap } from "../../components/ui/Background";
import Navigation from "../../components/ui/Navigation";
import bgVideo from "../../assets/background-video.mp4";

import styles from "./Home.module.css";

export default function Home() {
    return (
        <>
            <Navigation />
            <div className={styles.home}>
                <BackgroundGrid />
                <BackgroundMap />
                <div className={styles.displayText}>
                    <video src={bgVideo} muted autoPlay loop preload="auto" />
                    <svg>
                        <clipPath id="text-overlay" width="100%" height="100%">
                            <text
                                id="title"
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                WORLDTRACKER
                            </text>
                        </clipPath>
                    </svg>
                </div>
                <div className={styles.footerText}>
                    <p>
                        Whether you're a casual traveler or a dedicated
                        explorer, Worldtracker makes it easy to revisit your
                        journey, track your progress across the globe, and
                        discover patterns in your travel history. WorldTracker
                        turns your memories into a beautifully organized travel
                        footprint, letting you see your world. Literally. At a
                        glance.
                    </p>
                    <small>BY MRAMDANI</small>
                </div>
            </div>
        </>
    );
}
