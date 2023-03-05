import React, { useEffect, useState } from "react";
import axios from "axios";
import ChoosenDayWeatherComponents from "./ChoosenDayWeatherComponents";

function WeatherDisplayComponents(props) {
  const { choosenCity, setChoosenDay, weather, getIconWeatherCode } = props;
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const getDayName = (time) => {
    const date = new Date(time);
    switch (date.getDay()) {
      case 0:
        return "Lun";
        break;
      case 1:
        return "Mar";
      case 2:
        return "Mer";
      case 3:
        return "Jeu";
      case 4:
        return "Ven";
      case 5:
        return "Sam";
      case 6:
        return "Dim";
    }
  };

  useEffect(() => {
    if (weather) {
      const weeklyWeatherPushed = [];
      console.log(weather);
      for (let i = 0; i < weather.daily.time.length; i++) {
        weeklyWeatherPushed.push({
          temperature_2m_max: weather.daily.temperature_2m_max[i],
          temperature_2m_min: weather.daily.temperature_2m_min[i],
          time: getDayName(weather.daily.time[i]),
          weathercode: weather.daily.weathercode[i],
        });
      }
      setWeeklyWeather(weeklyWeatherPushed);
    }
  }, [weather]);

  // Cette fonction permet d'interpreter le weatherCode renvoyé par l'api et ainsi envoyé la bonne description

  const displayWeeklyWeather = () => {
    if (weeklyWeather.length > 0) {
      console.log("oui");
      return (
        <>
          {weeklyWeather.map((element, key) => (
            <ul key={key}>
              <li>
                {element.temperature_2m_max}/{element.temperature_2m_min}
              </li>
              <li>
                <img src={getIconWeatherCode(element.weathercode)} />
              </li>
              <li>{element.time}</li>
            </ul>
          ))}
        </>
      );
    } else {
      console.log("non");
    }
  };

  return (
    <ul className="secondary-card-weather-display-container">
      {displayWeeklyWeather()}
    </ul>
  );
}

export default WeatherDisplayComponents;
