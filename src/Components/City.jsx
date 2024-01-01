// import styles from "./City.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useCities } from "../Context/CitiesContext";
import styles from "./City.module.css";
import { useEffect } from "react";
import Button from "./Button";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { currentCity, getCity } = useCities();
  const navigate = useNavigate();

  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  const { id } = useParams();
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );
  const { cityName, emoji, date, notes } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
