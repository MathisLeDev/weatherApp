import "./App.css";
import SearchbarComponents from "./components/SearchbarComponents.jsx";
import WeatherDisplayComponents from "./components/WeatherDisplayComponents";
import { useState } from "react";
import GeoLocalisationComponents from "./components/GeoLocalisationComponents";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [choosenCity, setChoosenCity] = useState(null);

  /*{weather !== null && (
        <WeatherDisplayComponents weather={weather} location={location} />
      )}
      
   */
  return (
    <>
      <SearchbarComponents
        setWeather={setWeather}
        location={location}
        setLocation={setLocation}
        setChoosenCity={setChoosenCity}
      />
      <GeoLocalisationComponents setLocation={setLocation} />
      <WeatherDisplayComponents choosenCity={choosenCity} />
    </>
  );
}

export default App;
