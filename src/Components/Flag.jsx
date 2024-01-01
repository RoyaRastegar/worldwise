import Flags from "react-flags-select";
import PropTypes from "prop-types";

// import "react-flags-select/css/react-flags-select.css";
FlagComponent.propTypes = {
  countryCode: PropTypes.string.isRequired,
};
function FlagComponent({ countryCode }) {
  return (
    <Flags
      selected={countryCode}
      options={{
        AF: "Afghanistan",
        AL: "Albania",
        // Add more countries as needed
      }}
      showSelectedLabel={false}
      onSelect={(code) => console.log(code)}
    />
  );
}
export default FlagComponent;
