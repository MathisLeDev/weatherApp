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
    const updatedCityHistory = [];
    if (cityHistory) {
      for (let i = 0; i < cityHistory.length; i++) {
        updatedCityHistory.push(cityHistory[i]);
      }
    }
    if (choosenCity.name !== "") {
      updatedCityHistory.push(choosenCity);
      localStorage.setItem("cityHistory", JSON.stringify(updatedCityHistory));
    }
    if (updatedCityHistory.length > 2) {
      setCityHistory(updatedCityHistory);
    }
  }, [choosenCity]);

  const displayLastCity = () => {
    if (lastCity) {
      return (
        <li>
          Dernière ville
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
    if (cityHistory.length > 0) {
      cityHistory.reverse();
      return (
        <ul>
          {cityHistory.map((city) => (
            <li>
              <span
                key={city.id}
                id={city.id}
                onClick={handleCityFromHistoryClick}
              >
                {city.name}
              </span>
            </li>
          ))}
        </ul>
      );
    }
  };

  const handleCityFromHistoryClick = (e) => {
    console.log(e.target.id);
    console.log(cityHistory);
    console.log(cityHistory.find((element) => element.id == e.target.id));
    setChoosenCity(cityHistory.find((element) => element.id == e.target.id));
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
