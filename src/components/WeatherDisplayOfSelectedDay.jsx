import React, { useEffect, useState } from "react";

function WeatherDisplayOfSelectedDay(props) {
  const { weather, getIconWeatherCode } = props;
  const [dailyWeather, setDailyWeather] = useState();

  useEffect(() => {
    if (weather !== null) {
      const dailyWeatherPushed = [];
      let currentHour = getCurrentTime();
      console.log(currentHour);
      const test = 24 - parseInt(currentHour);
      console.log(test);
        console.log("weather", weather);
      for (currentHour; currentHour < 48-test; currentHour++) {
        dailyWeatherPushed.push({
          time: weather.hourly.time[currentHour].split("T")[1],
          temperature_2m: weather.hourly.temperature_2m[currentHour],
          weathercode: weather.hourly.weathercode[currentHour],
        });
        console.log(currentHour);
      }
      setDailyWeather(dailyWeatherPushed);
      console.log(dailyWeatherPushed);
    }
  }, [weather]);

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
