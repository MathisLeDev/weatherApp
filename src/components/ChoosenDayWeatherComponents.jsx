import React, { useEffect, useState } from "react";

function ChoosenDayWeatherComponents(props) {
  const {
    choosenDay,
    choosenCity,
    weather,
    getIconWeatherCode,
    getDescriptionWeatherCode,
  } = props;

  useEffect(() => {
    if (weather !== null) { // Vérifie si l'objet weather est présent et n'est pas nul
      setActualTemp(weather.current_weather.temperature); // Définit la température actuelle en utilisant la température renvoyée par l'API météo
      setActualCity(choosenCity); // Définit la ville actuelle en utilisant la ville choisie par l'utilisateur
      setActualWeatherCode(weather.current_weather.weathercode); // Définit le code météo actuel en utilisant le code météo renvoyé par l'API météo
    }
  }, [weather]); // Exécute l'effet lorsque l'objet weather est modifié

  const [actualTemp, setActualTemp] = useState(0);
  const [actualCity, setActualCity] = useState("");
  const [actualWeatherCode, setActualWeatherCode] = useState();

  const weatherIconDisplay = (actualWeatherCode) => {
    const img = getIconWeatherCode(actualWeatherCode);
    if (img === "") {
      return <>--</>;
    } else {
      return <img src={img} />;
    }
  };

  return (
    <div className="card-header w-100 bg-body border-0 h-100 bg-transparent card-primary-container">
      <div className="card-primary-left-display">
        <ul>
          <li>{actualTemp}°C</li>
          <li className="li-secondary">{choosenCity.name}</li>
          <li className="li-secondary">
            {getDescriptionWeatherCode(actualWeatherCode)}
          </li>
        </ul>
      </div>
      <div className="card-primary-right-display">
        {weatherIconDisplay(actualWeatherCode)}
      </div>
    </div>
  );
}

export default ChoosenDayWeatherComponents;
