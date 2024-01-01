import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";
CountryItem.propTypes = {
  countri: PropTypes.string.isRequired,
};
function CountryItem({ countri }) {
  const { emoji, country } = countri;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
