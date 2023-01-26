import { useEffect, useState } from "react";
import axios from "axios";

function WeatherDisplayComponents(props) {
  const { choosenCity } = props;
  let weeklyWeather = [];

  useEffect(() => {
    if (choosenCity) {
      console.log("get weather data");
      console.log(choosenCity);
      const latitude = choosenCity.latitude;
      const longitude = choosenCity.longitude;
      const timezone = choosenCity.timezone;
      const url =
        "https://api.open-meteo.com/v1/forecast?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&daily=temperature_2m_max" +
        "&daily=temperature_2m_min" +
        "&current_weather=true" +
        "&timezone=" +
        timezone;
      axios(url).then((response) => {
        //weeklyWeather.push(response.data.daily);
        for (let i = 0; i < response.data.daily.time.length; i++) {
          weeklyWeather.push({
            time: response.data.daily.time[i],
            tempMin: response.data.daily.temperature_2m_min[i],
            tempMax: response.data.daily.temperature_2m_max[i],
          });
        }
        console.log(weeklyWeather);
      });
    }
  });

  useEffect(() => {
    console.log(weeklyWeather);
    displayWeeklyWeather();
  }, [weeklyWeather]);

  const displayWeeklyWeather = () => {
    if (weeklyWeather.length > 0) {
      console.log("display weekly weather");
      return (
        <ul>
          {weeklyWeather.map((weather) => (
            <li key={weather.time}>{weather.tempMin}</li>
          ))}
        </ul>
      );
    } else {
      console.log(weeklyWeather.length);
    }
  };

  return (
    <>
      getWeatherOfTheWeek
      {displayWeeklyWeather()}
    </>
  );
}

export default WeatherDisplayComponents;
