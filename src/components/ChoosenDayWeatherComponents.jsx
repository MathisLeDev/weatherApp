import React, { useEffect, useState } from "react";
import axios from "axios";

function ChoosenDayWeatherComponents(props) {
  const { choosenDay, choosenCity } = props;
  const [weatherOfTheDay, setWeatherOfTheDay] = useState([]);
  useEffect(() => {
    if (choosenDay) {
      const latitude = choosenCity.latitude;
      const longitude = choosenCity.longitude;
      const timezone = choosenCity.timezone;
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&daily=temperature_2m_max," +
        "temperature_2m_min," +
        "windspeed_10m_max," +
        "winddirection_10m_dominant," +
        "weathercode" +
        "&current_weather=true" +
        "&start_date=" +
        choosenDay +
        "&end_date=" +
        choosenDay +
        "&timezone=" +
        timezone;
      axios(url).then((response) => {
        setWeatherOfTheDay(response.data);
      });
    }
  }, [choosenDay]);

  const displayWeatherOfTheDay = () => {
    if (weatherOfTheDay.daily) {
      return (
        <ul>
          <li>min:{weatherOfTheDay.daily.temperature_2m_min}</li>
          <li>min:{weatherOfTheDay.daily.temperature_2m_max}</li>
          <li>currentWeather:{weatherOfTheDay.daily.weathercode}</li>
          <li>
            windDirection:{weatherOfTheDay.daily.winddirection_10m_dominant}
          </li>
          <li>windSpeed:{weatherOfTheDay.daily.windspeed_10m_max}</li>
        </ul>
      );
    }
  };

  return (
    <div>
      ChoosenDayWeatherComponents
      {displayWeatherOfTheDay()}
    </div>
  );
}

export default ChoosenDayWeatherComponents;
