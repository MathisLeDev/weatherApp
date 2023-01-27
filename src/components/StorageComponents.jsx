import React, { useEffect, useState } from "react";

function StorageComponents(props) {
  const { setChoosenCity, setTextValue, choosenCity } = props;
  const [lastCity, setLastCity] = useState("");
  const [cityHistory, setCityHistory] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("lastCity")) {
      const JSONParsedCity = JSON.parse(localStorage.getItem("lastCity"));
      setLastCity(JSONParsedCity);
    }
  }, [choosenCity]);

  useEffect(() => {
    const cityHistory = JSON.parse(localStorage.getItem("cityHistory")); //recup l'historique
    console.log(cityHistory);
    const updatedCityHistory = [];

    if (cityHistory) {
      for (let i = 0; i < cityHistory.length; i++) {
        updatedCityHistory.push(cityHistory[i]);
      }
    }
    if (choosenCity) {
      updatedCityHistory.push(choosenCity);
      console.log("AJOUTE");
      localStorage.setItem("cityHistory", JSON.stringify(updatedCityHistory));
    }
    console.log(updatedCityHistory);
    console.log(updatedCityHistory.length);
    if (updatedCityHistory.length > 2) {
      setCityHistory(updatedCityHistory);
    }
  }, [choosenCity]);

  const displayLastCity = () => {
    if (lastCity) {
      return (
        <li>
          Derniere ville
          <span id={lastCity.name} onClick={handleLastCityClick}>
            : {lastCity.name}
          </span>
          <button onClick={handleLastCityDelete}> Del</button>
        </li>
      );
    } else {
      return <> votre historique est vide</>;
    }
  };

  const handleLastCityClick = (e) => {
    setChoosenCity(lastCity);
    setTextValue(lastCity.name);
  };

  const handleLastCityDelete = (e) => {
    localStorage.removeItem("lastCity");
    setLastCity();
  };

  const displayCityHistory = () => {
    let cityNameMapped = [];
    if (cityHistory.length > 0) {
      for (const city of cityHistory) {
        cityNameMapped.push(city.name);
      }
    }
    cityNameMapped = cityNameMapped.reverse();
    return (
      <ul>
        {cityNameMapped.map((name, index) => (
          <li key={index}>
            <span onClick={() => handleCityFromHistoryClick(name)}>{name}</span>
          </li>
        ))}
      </ul>
    );
  };

  const handleCityFromHistoryClick = (e) => {
    console.log(e);
  };

  return (
    <div>
      StorageComponents
      {displayLastCity()}
      {displayCityHistory()}
    </div>
  );
}

export default StorageComponents;
