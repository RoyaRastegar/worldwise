import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import { useCities } from "../Context/CitiesContext";
import PropTypes from "prop-types";
CountryList.propTypes = {
  cities: PropTypes.array.isRequired,
};
export default function CountryList() {
  const { cities } = useCities();
  if (!cities.length)
    return (
      <Message Message="Add your first city by clicking on a city on the map" />
    );
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log(typeof countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((countri, index) => (
        <CountryItem countri={countri} key={index} />
      ))}
    </ul>
  );
}
