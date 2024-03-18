import "./App.css";
import SearchbarComponents from "./components/SearchbarComponents.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import partiallycloudy from "./img/wi-cloudy.svg";
import sunny from "./img/wi-day-sunny.svg";
import fog from "./img/wi-day-fog.svg";
import rainy from "./img/wi-day-rain.svg";
import snow from "./img/wi-snow.svg";
import lightning from "./img/wi-lightning.svg";
import PrimaryCard from "./v2/components/primaryCard/primaryCard";
import HourCard from "./v2/components/hourCard/hourCard";
import PrevisionCard from "./v2/components/previsionCard/previsionCard";
import SecondaryCard from "./v2/components/secondaryCard/secondaryCard";
import sunnyDay from "./assets/beautiful-day.jpg";
import rainyDay from "./assets/rainy-day.jpg";
import cloudyDay from "./assets/cloudy-day.jpg";
import stormyDay from "./assets/stormy-day.jpg";


function App() {

  const [weather, setWeather] = useState({
    current_weather : {
      temperature: 0,
      weathercode: 0,


    },

  });
  const [choosenCity, setChoosenCity] = useState({ name: "--" });
  const [textValue, setTextValue] = useState("");
  const [timezone, setTimezone] = useState(null);


  const getBackGround = (weatherCode) => {
    switch (weatherCode) {
      case 0:
        return sunnyDay;
      case 1:
        return cloudyDay;
      case 2:
        return cloudyDay;
      case 3:
        return cloudyDay;
      case 45:
        return cloudyDay;
      case 48:
        return cloudyDay;
      case 51:
        return rainyDay;
      case 53:
        return rainyDay;
      case 55:
        return rainyDay;
      case 56:
        return rainyDay;
      case 57:
        return rainyDay;
      case 61:
        return rainyDay;
      case 63:
        return rainyDay;
      case 65:
        return rainyDay;
      case 66:
        return rainyDay;
      case 67:
        return rainyDay;
      case 71:
        return cloudyDay;
      case 73:
        return cloudyDay;
      case 75:
        return cloudyDay;
      case 77:
        return cloudyDay;
      case 80:
        return rainyDay;
      case 81:
        return rainyDay;
      case 82:
        return rainyDay;
      case 85:
        return cloudyDay;
      case 86:
        return cloudyDay;
      case 95:
        return stormyDay;
      case 96:
        return stormyDay;
      case 99:
        return stormyDay;
        default:
        return sunnyDay;
    }
  }

  /**
   * return l'icone associé au code météo selon la documentation de l'api utilisée. ex: weathercode = 0 équivaut à un temps ensoleillé
   * @param code
   * @returns {string}
   */
  const getIconWeatherCode = (code) => {
    let icon;
    switch (code) {
      case 0:
        icon = sunny;
        break;
      case 1:
        icon = partiallycloudy;
        break;
      case 2:
        icon = partiallycloudy;
        break;
      case 3:
        icon = partiallycloudy;
        break;
      case 45:
        icon = fog;
        break;
      case 48:
        icon = fog;
        break;
      case 51:
        icon = rainy;
        break;
      case 53:
        icon = rainy;
        break;
      case 55:
        icon = rainy;
        break;
      case 56:
        icon = rainy;
        break;
      case 57:
        icon = rainy;
        break;
      case 61:
        icon = rainy;
        break;
      case 63:
        icon = rainy;
        break;
      case 65:
        icon = rainy;
        break;
      case 66:
        icon = partiallycloudy;
        break;
      case 67:
        icon = partiallycloudy;
        break;
      case 71:
        icon = snow;
        break;
      case 73:
        icon = snow;
        break;
      case 75:
        icon = snow;
        break;
      case 77:
        icon = partiallycloudy;
        break;
      case 80:
        icon = lightning;
        break;
      case 81:
        icon = lightning;
        break;
      case 82:
        icon = lightning;
        break;
      case 85:
        icon = snow;
        break;
      case 86:
        icon = snow;
        break;
      case 95:
        icon = lightning;
        break;
      case 96:
        icon = partiallycloudy;
        break;
      case 99:
        icon = partiallycloudy;
        break;
      default:
        icon = "";
        break;
    }
    return icon;
  };


  /**
   * renvoie la description textuelle du weathercode de sa météo.
   * @param code int qui correspond au weathercode de l'api utilisé.
   * @returns {string}
   */
  const getDescriptionWeatherCode = (code) => {
    let description = "--";
    switch (code) {
      case 0:
        description = "Ciel clair";
        break;
      case 1:
        description = "Plutôt dégagé";
        break;
      case 2:
        description = "Partiellement nuageux";
        break;
      case 3:
        description = "Couvert";
        break;
      case 45:
        description = "Brouillard";
        break;
      case 48:
        description = "Dépôt de brouillard givré";
        break;
      case 51:
        description = "Bruine légère";
        break;
      case 53:
        description = "Bruine modérée";
        break;
      case 55:
        description = "Bruine dense";
        break;
      case 56:
        description = "Légère bruine verglaçante";
        break;
      case 57:
        description = "Dense bruine verglaçante";
        break;
      case 61:
        description = "Pluie faible";
        break;
      case 63:
        description = "Pluie modérée";
        break;
      case 65:
        description = "Forte pluie";
        break;
      case 66:
        description = "Légère pluie verglaçante";
        break;
      case 67:
        description = "Forte pluie verglaçante";
        break;
      case 71:
        description = "Légère chute de neige";
        break;
      case 73:
        description = "Chute de neige modérée";
        break;
      case 75:
        description = "Forte chute de neige";
        break;
      case 77:
        description = "grêle";
        break;
      case 80:
        description = "Légères averses de pluie";
        break;
      case 81:
        description = "Averses de pluie modérées";
        break;
      case 82:
        description = "Violentes averses de pluie";
        break;
      case 85:
        description = "Légères averses de neige";
        break;
      case 86:
        description = "Fortes averses de neige";
        break;
      case 95:
        description = "Orage";
        break;
      case 96:
        description = "Orage avec grêle légère";
        break;
      case 99:
        description = "Orage avec grêle forte";
        break;
      default:
        description = "--------";
        break;
    }
    return description;
  };

  useEffect(() => {
    setTextValue(choosenCity.name);
    console.log(choosenCity)
  }, [choosenCity]);


  /**
   * Est appelé à chaque changement de choosenCity et de timezone.
   * Ce qui correspond au moment où l'utilisateur change de ville.
   * Appelle alors d'un GET pour avoir le temps actuelle, de la journée h/h et de la semaine en j/j
   * exemple JSON type:  {
   *     "latitude": 48.11,
   *     "longitude": -1.6700001,
   *     "generationtime_ms": 1.7910003662109375,
   *     "utc_offset_seconds": 7200,
   *     "timezone": "Europe/Paris",
   *     "timezone_abbreviation": "CEST",
   *     "elevation": 44.0,
   *     "current_weather": {
   *         "temperature": 11.6,
   *         "windspeed": 20.8,
   *         "winddirection": 332.0,
   *         "weathercode": 0,
   *         "time": "2023-03-26T19:00"
   *     },
   *     "hourly_units": {
   *         "time": "iso8601",
   *         "temperature_2m": "°C",
   *         "weathercode": "wmo code"
   *     },
   *     "hourly": {
   *         "time": [
   *             "2023-03-26T00:00",
   *             "2023-03-26T01:00",
   *             "2023-03-26T02:00",
   *             "2023-03-26T03:00",
   *             "2023-03-26T04:00"
   *         ],
   *         "temperature_2m": [
   *             9.4,
   *             9.5,
   *             10.7,
   *             10.0,
   *             9.4
   *         ],
   *         "weathercode": [
   *             51,
   *             53,
   *             55,
   *             3,
   *             3
   *         ]
   *     },
   *     "daily_units": {
   *         "time": "iso8601",
   *         "temperature_2m_max": "°C",
   *         "temperature_2m_min": "°C",
   *         "weathercode": "wmo code"
   *     },
   *     "daily": {
   *         "time": [
   *             "2023-03-26",
   *             "2023-03-27",
   *             "2023-03-28",
   *             "2023-03-29",
   *             "2023-03-30",
   *             "2023-03-31",
   *             "2023-04-01"
   *         ],
   *         "temperature_2m_max": [
   *             12.3,
   *             13.6,
   *             14.2,
   *             17.7,
   *             14.3,
   *             12.7,
   *             11.6
   *         ],
   *         "temperature_2m_min": [
   *             7.8,
   *             3.7,
   *             6.1,
   *             10.1,
   *             10.8,
   *             8.7,
   *             6.8
   *         ],
   *         "weathercode": [
   *             61,
   *             3,
   *             51,
   *             3,
   *             80,
   *             80,
   *             3
   *         ]
   *     }
   * }
   */
  useEffect(() => {
    if (choosenCity.name !== "" && timezone) {
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
        "&current_weather=true" +
        "&hourly=temperature_2m,weathercode" +
        "&timezone=" +
        timezone;
      console.log(url)
      //GET vers l'API

      axios(url).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setWeather(response.data);
        }
      });
    }
  }, [choosenCity, timezone]);




  /**
   * App.js est la racine du projet. Elle contient toutes les branches (composants) qu'elle appelle (ex: <SearchbarComponents ../>) Ces composants peuvent à leurs tours appeler des composants.
   * La documentation et commentaire de ces composants sont situé à l'intérieur d'eux-mêmes.
   */


  const [mode, setMode] = useState("C" || "F");
  const [weatherIcon, setWeatherIcon] = useState("");

  const handleChangeLocationClick = (e) => {
    e.preventDefault();
    setChoosenCity({ name: "--" });
  }

  //https://www.youtube.com/watch?v=wnhvanMdx4s pour la video en arriere plan

  return (
      <div className={"min-h-screen bg-black flex flex-col justify-between "}>
        <img className={"transition-all duration-200"} style={{position:"absolute", zIndex:0, height:"100%", minWidth:"100%",  objectFit: "cover"}} src={getBackGround(weather.current_weather.weathercode)} alt=""/>


        <div className={"z-10 mt-10 mx-10"}>

        <SearchbarComponents
            setChoosenCity={setChoosenCity}
            textValue={textValue}
            setTextValue={setTextValue}
            choosenCity={choosenCity}
            setTimezone={setTimezone}
        />

        <div className={"flex flex-row justify-between pr-auto "} style={{zIndex:1}}>
          <div className={"p-10 mr-auto "}>
              <PrimaryCard temp={weather.current_weather.temperature} mode={mode} setMode={setMode} icon={getIconWeatherCode(weather.current_weather.weathercode)} weatherStr={getDescriptionWeatherCode(weather.current_weather.weathercode)} City={choosenCity.name} Country={choosenCity.country} handleChangeLocationClick={handleChangeLocationClick} />
          </div>
          <div className={"p-10 ml-auto "}>
            <HourCard />
          </div>
        </div>
        </div>


        <div className={"flex flex-row gap-5 mx-10 my-4"} style={{zIndex:1}}>
          <SecondaryCard weather={weather || {}}/>
          <PrevisionCard choosenCity={choosenCity} weather={weather} getIconWeatherCode={getIconWeatherCode} mode={mode}/>
        </div>

      </div>
  );
}

export default App;
