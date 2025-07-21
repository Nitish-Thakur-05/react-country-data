import styles from '../App.module.css'
import { Link } from "react-router-dom";

export default function CardContainer({imageSrc, countryName, totalPopulation, region, capital, data, continent}) {
  return (
    <Link to={`${countryName}`} className={styles.card} state={data}>
        <img src={imageSrc} alt="flag-img" loading="lazy"/>
        <div className={styles["card-text"]}>
          <h3>
            {countryName}
          </h3>
          <p>
            <b>Population:</b> {totalPopulation}
          </p>
          <p>
            <b>Region:</b> {region}
          </p>
          <p>
            <b>Capital:</b> {capital}
          </p>
        </div>
    </Link>
  );
}
