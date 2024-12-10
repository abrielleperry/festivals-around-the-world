import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import { format, parseISO, differenceInSeconds } from "date-fns";

const Card = ({ name, description, streetAddress, addressLocality, country, startDate, endDate, postalCode, image, locationName }) => {
    const [remainingTime, setRemainingTime] = useState("");

    const formattedStartDate =
        startDate && !isNaN(Date.parse(startDate))
            ? format(parseISO(startDate), "MMM d, yy")
            : "TBD";
    const formattedEndDate =
        endDate && !isNaN(Date.parse(endDate))
            ? format(parseISO(endDate), "MMM d, yy")
            : "TBD";

    useEffect(() => {
        if (startDate) {
            const interval = setInterval(() => {
                const now = new Date();
                const start = parseISO(startDate);
                const end = endDate ? parseISO(endDate) : null;
                const diffInSeconds = differenceInSeconds(start, now);
                const diffInSecondsToEnd = end ? differenceInSeconds(end, now) : null;

                if (diffInSeconds <= 0) {
                    if (end && diffInSecondsToEnd > 0) {
                        setRemainingTime("Already underway however you can still buy tickets!");
                    } else {
                        setRemainingTime("This festival has already concluded!");
                    }
                    clearInterval(interval);
                } else {
                    const days = Math.floor(diffInSeconds / (3600 * 24));
                    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
                    const minutes = Math.floor((diffInSeconds % 3600) / 60);
                    const seconds = diffInSeconds % 60;

                    setRemainingTime(`Starts in ${days}d ${hours}h ${minutes}m ${seconds}s`);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [startDate, endDate]);

    return (
        <div className={styles.card}>
            <img className={styles.image} src={image} alt={name} />
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.description}>at <strong>{locationName}</strong></p>
            <p className={styles.streetAddress}> {streetAddress}</p>
            <p className={styles.addressDetails}> {addressLocality}, {country}</p>
            <p className={styles.startDate}>{formattedStartDate} - {formattedEndDate}</p>
            <p className={styles.countdown}> {remainingTime}</p>
        </div>
    );
};

export default Card;
