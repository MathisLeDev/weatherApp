import localisationImg from "../img/localisation_icon.png";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import MeteoComponents from "./MeteoComponents";
import GeoLocalisationComponents from "./GeoLocalisationComponents";
import { useEffect } from "react";
import axios from "axios";

function SearchbarComponents(props) {
  const { setChoosenCity, location, textValue, setTextValue, choosenCity } =
    props;
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (location) {
      getCityNameFromLocation();
    }
  }, [location]);

  useEffect(() => {
    if (textValue.length > 2) {
      checkForSuggestions(textValue);
    }
  }, [textValue]);

  const getCityNameFromLocation = () => {
    const url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
      location.latitude +
      "&lon=" +
      location.longitude;
    axios(url).then((response) => {
      setTextValue(response.data.address.city);
    });
  };

  const handleTextChange = (event) => {
    event.preventDefault();
    setTextValue(event.target.value);
    if (event.target.value.length > 2) {
      checkForSuggestions();
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    localStorage.setItem("lastCity", JSON.stringify(choosenCity));
  }, [choosenCity]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (suggestions.length > 0) {
      setChoosenCity(suggestions[0]);
    }
  };

  const checkForSuggestions = (currentText) => {
    let city = "";
    if (currentText) {
      city = currentText;
    } else {
      city = textValue;
    }
    const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + city;
    axios(url).then((res) => {
      if (res.data.results) {
        setSuggestions(res.data.results);
      }
    });
  };

  const displaySuggestions = () => {
    if (suggestions.length > 0) {
      return (
        <ul className="suggestions btn w-75 text-start ">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={handleSuggestionClick}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      );
    }
  };

  const handleSuggestionClick = (event) => {
    setTextValue(event.target.innerHTML);
    checkForSuggestions(event.target.innerHTML);
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="d-flex d-flex justify-content-center w-75 "
      >
        <input
          type="text"
          placeholder="Rennes, Alençon..."
          value={textValue}
          onChange={handleTextChange}
          className="bg-transparent border-end-0 border-start-0 border-top-0 w-75"
        />
        <button type="submit" className="btn w-75">
          Rechercher
        </button>
      </form>
      {displaySuggestions()}
    </>
  );
}

export default SearchbarComponents;
