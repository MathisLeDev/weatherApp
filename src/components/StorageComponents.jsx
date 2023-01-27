import React, { useEffect, useState } from "react";

function StorageComponents(props) {
  const { setChoosenCity, setTextValue, choosenCity } = props;
  const [lastCity, setLastCity] = useState("");
  useEffect(() => {
    if (localStorage.getItem("lastCity")) {
      const JSONParsedCity = JSON.parse(localStorage.getItem("lastCity"));
      setLastCity(JSONParsedCity);
    }
  }, [choosenCity]);

  const displayLastCity = () => {
    if (lastCity) {
      return (
        <li>
          <span id={lastCity.name} onClick={handleLastCityClick}>
            lastCity: {lastCity.name}
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

  return (
    <div>
      StorageComponents
      {displayLastCity()}
    </div>
  );
}

export default StorageComponents;
