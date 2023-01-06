

import React, { useState } from "react";
import MeteoComponents from "./MeteoComponents";

function SearchbarComponents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [choosenCityCoordinates, setChoosenCityCoordinates] = useState();
  const [choiceConfirmed, setChoiceConfirmed] = useState(false);
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleInput(event) {
    setChoiceConfirmed(false);
    event.preventDefault();
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}`)
        .then(res => res.json())
        .then(data => setResults(data.results))
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    setChoiceConfirmed(true);
  }

  const handleSuggestionSelect = (event) => {
    const coordinates = event.target.attributes[0].value;
    const coordinatesSplitted = coordinates.split(":")
    setChoosenCityCoordinates({"latitude": coordinatesSplitted[0], "longitude":coordinatesSplitted[1]});
    setSearchTerm(event.target.innerHTML);
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onInput={handleInput}
          />
          <button type="submit">Search</button>
        </form>

        {results != null ? results.map(result => (
            <li key={result.id} value={result.latitude+":"+result.longitude} onClick={handleSuggestionSelect}>{result.name}</li>
        )) : ''}

        {choiceConfirmed !== false ?<MeteoComponents choosenCityCoordinates = {choosenCityCoordinates}/>:''}
      </div>
  )
}

export default SearchbarComponents
