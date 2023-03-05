import "./App.css";
import SearchbarComponents from "./components/SearchbarComponents.jsx";
import WeatherDisplayComponents from "./components/WeatherDisplayComponents";
import { useEffect, useState } from "react";
import GeoLocalisationComponents from "./components/GeoLocalisationComponents";
import StorageComponents from "./components/StorageComponents";
import ChoosenDayWeatherComponents from "./components/ChoosenDayWeatherComponents";
import axios from "axios";
import sunny from "./assets/wi-day-sunny.svg";
import partiallycloudy from "./assets/wi-cloudy.svg";
import fog from "./assets/wi-day-fog.svg";
import rainy from "./assets/wi-day-rain.svg";
import raindrops from "./assets/wi-raindrops.svg";
import hail from "./assets/wi-day-hail.svg";
import snow from "./assets/wi-snow.svg";
import lightning from "./assets/wi-lightning.svg";
import WeatherDisplayOfSelectedDay from "./components/WeatherDisplayOfSelectedDay";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [choosenCity, setChoosenCity] = useState({ name: "--" });
  const [suggestions, setSuggestions] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [choosenDay, setChoosenDay] = useState("");
  const [timezone, setTimezone] = useState(null);

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
        icon = raindrops;
        break;
      case 63:
        icon = raindrops;
        break;
      case 65:
        icon = raindrops;
        break;
      case 66:
        icon = hail;
        break;
      case 67:
        icon = hail;
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
      case code == 77:
        icon = hail;
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
      case code == 95:
        icon = lightning;
        break;
      case 96:
        icon = hail;
        break;
      case 99:
        icon = hail;
        break;
      default:
        icon = "";
        break;
    }
    return icon;
  };

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
  }, [choosenCity]);

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
      axios(url).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setWeather(response.data);
        }
      });
    }
  }, [choosenCity, timezone]);

  return (
    <section className="vh-100 flex-column d-flex justify-content-around align-items-center ">
      <SearchbarComponents
        location={location}
        setChoosenCity={setChoosenCity}
        textValue={textValue}
        setTextValue={setTextValue}
        choosenCity={choosenCity}
        setTimezone={setTimezone}
      />
      <GeoLocalisationComponents setLocation={setLocation} />

      <div className="card w-75 h-25 rounded-5">
        <ChoosenDayWeatherComponents
          choosenDay={choosenDay}
          choosenCity={choosenCity}
          weather={weather}
          getIconWeatherCode={getIconWeatherCode}
          getDescriptionWeatherCode={getDescriptionWeatherCode}
        />
      </div>
      <div className="card w-75 h-25 rounded-5">
        <div className="card-header w-100 bg-body border-0 h-100 bg-transparent">
          <WeatherDisplayOfSelectedDay
            weather={weather}
            getIconWeatherCode={getIconWeatherCode}
          />
        </div>
      </div>
      <div className="card w-75 h-25 rounded-5">
        <div className="card-header w-100 bg-body border-0 h-100 bg-transparent">
          <WeatherDisplayComponents
            choosenCity={choosenCity}
            setChoosenDay={setChoosenDay}
            getDescriptionWeatherCode={getDescriptionWeatherCode}
            weather={weather}
            getIconWeatherCode={getIconWeatherCode}
          />
        </div>
      </div>
    </section>
  );
}

export default App;
