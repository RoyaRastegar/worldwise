import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
const BASE_URL = "http://localhost:9000";
import PropTypes from "prop-types";
CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const CitiesContext = createContext();
const initState = {
  cities: [],
  currentCity: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, cities: action.payload };
    case "city/load":
      return { ...state, currentCity: action.payload };
    case "city/creat":
      return { ...state, cities: [...state.cities, action.payload] };
    case "city/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
  }
}
function CitiesProvider({ children }) {
  const [{ cities, currentCity }, dispatch] = useReducer(reducer, initState);

  useEffect(function () {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "loading", payload: data });
      } catch {
        alert("the cities is Loading...");
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/load", payload: data });
      } catch {
        alert("the city is geting city...");
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/creat", payload: data });
    } catch {
      alert("the city is crating...");
    }
  }
  async function deleteCity(id) {
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: id });
    } catch {
      alert("the City is Deleting...");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}
export { CitiesProvider, useCities };
