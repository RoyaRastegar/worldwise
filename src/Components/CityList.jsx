import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCities } from "../Context/CitiesContext";
// import PropTypes from "prop-types";
// CityList.propTypes = {
//   cities: PropTypes.array.isRequired,
// };
export default function CityList() {
  const { cities } = useCities();

  if (!cities.length)
    return (
      <Message Message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
