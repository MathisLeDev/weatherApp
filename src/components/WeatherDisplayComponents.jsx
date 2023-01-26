import { useEffect, useState } from "react";

function WeatherDisplayComponents(props) {
  const { weather } = props;
  const [weatherPerDay, setweatherPerDay] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  useEffect(() => {
    for (let i = 0; i < weather.daily.time.length; i++) {
      weatherPerDay.push({
        day: weather.daily.time[i],
        tempMin: weather.daily.temperature_2m_min[i],
        tempMax: weather.daily.temperature_2m_max[i],
      });
    }
    setIsReady(true);
    console.log(weatherPerDay);
  }, [weather]);

  const getActualDayWeather = () => {
    return <>selectedDay: {selectedDay}</>;
  };

  const handleDayClicked = (event) => {
    console.log(event.target.id);
    setSelectedDay(event.target.id);
  };

  const getWeatherOfTheWeek = () => {
    if (isReady) {
      console.log(weatherPerDay);
      return (
        <ul>
          {weatherPerDay.map((day) => (
            <li id={day.day} key={day.day} onClick={handleDayClicked}>
              {day.day}, {day.tempMin}/{day.tempMax}
            </li>
          ))}
        </ul>
      );
    } else {
      return <span>vide</span>;
    }
  };

  return (
    <>
      {getActualDayWeather()}
      {weatherPerDay !== [] && getWeatherOfTheWeek()}
      {weatherPerDay !== [] && <p>dz</p>}
      WeatherDisplayComponents
    </>
  );
}

export default WeatherDisplayComponents;
