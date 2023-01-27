import { useEffect, useState } from "react";
import axios from "axios";
import ChoosenDayWeatherComponents from "./ChoosenDayWeatherComponents";

function WeatherDisplayComponents(props) {
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const { choosenCity } = props;
  const [choosenDay, setChoosenDay] = useState("");
  useEffect(() => {
    if (choosenCity) {
      const latitude = choosenCity.latitude;
      const longitude = choosenCity.longitude;
      const timezone = choosenCity.timezone;
      const weeklyWeatherPushed = [];
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
          weeklyWeatherPushed.push({
            time: response.data.daily.time[i],
            tempMin: response.data.daily.temperature_2m_min[i],
            tempMax: response.data.daily.temperature_2m_max[i],
          });
        }
        setWeeklyWeather(weeklyWeatherPushed);
      });
    }
  }, [choosenCity]);

  const displayWeeklyWeather = () => {
    if (weeklyWeather.length > 0) {
      console.log("display weekly weather");
      return (
        <ul>
          {weeklyWeather.map((weather) => (
            <li
              key={weather.time}
              id={weather.time}
              onClick={handleDaySelection}
            >
              {weather.tempMin}
            </li>
          ))}
        </ul>
      );
    }
  };

  const handleDaySelection = (event) => {
    setChoosenDay(event.target.id);
  };

  return (
    <>
      getWeatherOfTheWeek
      {displayWeeklyWeather()}
      <ChoosenDayWeatherComponents
        choosenDay={choosenDay}
        choosenCity={choosenCity}
      />
    </>
  );
}

export default WeatherDisplayComponents;
