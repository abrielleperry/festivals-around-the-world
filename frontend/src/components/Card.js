import styles from "./Card.module.css";
import { format, parseISO } from "date-fns";

const Card = ({ name, description, addressLocality, country, startDate, endDate, image }) => {
    const formattedStartDate = startDate
        ? format(parseISO(startDate), "MMMM d, yyyy")
        : "TBD";
    const formattedEndDate = endDate
        ? format(parseISO(endDate), "MMMM d, yyyy")
        : "TBD";

    return (
        <div className={styles.card}>
            <img className={styles.image} src={image} alt={name} />
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.description}>{description}</p>
            <p className={styles.location}><strong>City:</strong> {addressLocality}</p>
            <p className={styles.country}><strong>Country:</strong> {country}</p>
            <p className={styles.startDate}><strong>Start Date:</strong> {formattedStartDate}</p>
            <p className={styles.endDate}><strong>End Date:</strong> {formattedEndDate}</p>
        </div>
    );
};

export default Card;
