import localisationImg from "../img/localisation_icon.png";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import MeteoComponents from "./MeteoComponents";
import GeoLocalisationComponents from "./GeoLocalisationComponents";
import { useEffect } from "react";
import axios from "axios";

function SearchbarComponents(props) {
  const { setChoosenCity, location } = props;
  const [textValue, setTextValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (location) {
      console.log(location);
      getCityNameFromLocation();
    }
  }, [location]);

  const getCityNameFromLocation = () => {
    const url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
      location.latitude +
      "&lon=" +
      location.longitude;
    axios(url).then((response) => {
      setTextValue(response.data.address.city);
      checkForSuggestions(response.data.address.city);
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (suggestions.length > 0) {
      setChoosenCity(suggestions[0]);
      console.log("sbmit");
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
        <ul>
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
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Rennes, Alençon..."
          value={textValue}
          onChange={handleTextChange}
        />
        <button type="submit">Envoyer</button>
      </form>
      {displaySuggestions()}
    </>
  );
  /*const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [choosenCityCoordinates, setChoosenCityCoordinates] = useState();
  const [choiceConfirmed, setChoiceConfirmed] = useState(false);
  const [geoLocalisationConfirmed, setGeoLocalisationComponents] = useState(false);

  
  useEffect(()=>{
    setGeoLocalisationComponents(true);
  },[])


  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleInput(event) {
    setChoiceConfirmed(false);
    event.preventDefault();
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setResults(data.results));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setChoiceConfirmed(true);
  }

  const handleSuggestionSelect = (event) => {
    const coordinates = event.target.attributes[0].value;
    const coordinatesSplitted = coordinates.split(":");
    setChoosenCityCoordinates({
      latitude: coordinatesSplitted[0],
      longitude: coordinatesSplitted[1],
    });
    setSearchTerm(event.target.innerHTML);
  };

 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onInput={handleInput}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {results != null
        ? results.map((result) => (
            <li
              key={result.id}
              value={result.latitude + ":" + result.longitude}
              onClick={handleSuggestionSelect}
            >
              {result.name}
            </li>
          ))
        : ""}

      {choiceConfirmed !== false ? (
        <MeteoComponents
          choosenCityCoordinates={choosenCityCoordinates}
          setWeather={setWeather}
        />
      ) : (
        ""
      )}
      {geoLocalisationConfirmed !== false ? (
        <GeoLocalisationComponents
          location={location}
          setLocation={setLocation}
          setSearchTerm={setSearchTerm}
          setChoosenCityCoordinates={setChoosenCityCoordinates}
        />
      ) : (
        ""
      )}
    </div>
  );*/
}

export default SearchbarComponents;
