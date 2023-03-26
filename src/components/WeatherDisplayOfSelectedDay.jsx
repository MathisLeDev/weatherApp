import React, { useEffect, useState } from "react";

function WeatherDisplayOfSelectedDay(props) {
  const { weather, getIconWeatherCode } = props;
  const [dailyWeather, setDailyWeather] = useState();


  /**
   * Dès que la weather est actualisé, on trie ses informations dans un tableau qui représentera la météo de la journée.
   * Un élément du tableau qui représentera un JSON : {
   *                                                   time: 19:00,
   *                                                   temperature_2m: 13.2,
   *                                                    weathercode: 2,
   *                                                  }
   */
  useEffect(() => {
    if (weather !== null) { // Vérifie que weather est différent de null
      const dailyWeatherPushed = []; // Crée un tableau vide pour stocker les données météo quotidiennes
      let currentHour = getCurrentTime(); // Récupère l'heure actuelle
      console.log(currentHour); // Affiche l'heure actuelle dans la console
      const test = 24 - parseInt(currentHour); // Calcule le nombre d'heures restantes dans la journée
      currentHour = parseInt(currentHour); // Convertit l'heure actuelle en entier
      for (currentHour; currentHour < 48-test; currentHour++) { // Boucle sur les heures restantes de la journée et les 24 heures suivantes
        dailyWeatherPushed.push({ // Ajoute les données météo pour chaque heure à dailyWeatherPushed
          time: weather.hourly.time[currentHour].split("T")[1], // Récupère l'heure au format hh:mm:ss
          temperature_2m: weather.hourly.temperature_2m[currentHour], // Récupère la température à 2 mètres du sol
          weathercode: weather.hourly.weathercode[currentHour], // Récupère le code météo
        });
      }
      setDailyWeather(dailyWeatherPushed); // Met à jour l'état avec les données météo quotidiennes
      console.log(dailyWeatherPushed); // Affiche les données météo quotidiennes dans la console
    }
  }, [weather]); // Déclenche l'effet à chaque changement de la variable weather


  function getCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, "0");
  }

  const displayWeatherOfTheDay = () => {
    if (dailyWeather) {
      return (
        <>
          {dailyWeather.map((element, key) => (
            <ul key={key}>
              <li>{element.temperature_2m}°C</li>
              <li>
                <img src={getIconWeatherCode(element.weathercode)} />
              </li>
              <li>{element.time}</li>
            </ul>
          ))}
        </>
      );
    } else {
      return (
        <>
          <ul>
            <li>--</li>
            <li>---</li>
            <li>--</li>
          </ul>
          <ul>
            <li>--</li>
            <li>---</li>
            <li>--</li>
          </ul>
          <ul>
            <li>--</li>
            <li>---</li>
            <li>--</li>
          </ul>
          <ul>
            <li>--</li>
            <li>---</li>
            <li>--</li>
          </ul>
          <ul>
            <li>--</li>
            <li>---</li>
            <li>--</li>
          </ul>
          <ul>
            <li>--</li>
            <li>---</li>
            <li>--</li>
          </ul>
        </>
      );
    }
  };

  return (
    <>
      <ul className="secondary-card-weather-display-container">
        {displayWeatherOfTheDay()}
      </ul>
    </>
  );
}

export default WeatherDisplayOfSelectedDay;
