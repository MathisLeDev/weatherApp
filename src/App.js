import "./App.css";
import SearchbarComponents from "./components/SearchbarComponents.jsx";
import WeatherDisplayComponents from "./components/WeatherDisplayComponents";
import { useState } from "react";
import GeoLocalisationComponents from "./components/GeoLocalisationComponents";
import StorageComponents from "./components/StorageComponents";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [choosenCity, setChoosenCity] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [textValue, setTextValue] = useState("");

  /*{weather !== null && (
        <WeatherDisplayComponents weather={weather} location={location} />
      )}
      
   */
  return (
    <>
      <SearchbarComponents
        location={location}
        setChoosenCity={setChoosenCity}
        textValue={textValue}
        setTextValue={setTextValue}
      />
      <GeoLocalisationComponents setLocation={setLocation} />
      <WeatherDisplayComponents choosenCity={choosenCity} />
      <StorageComponents
        setChoosenCity={setChoosenCity}
        setTextValue={setTextValue}
        choosenCity={choosenCity}
      />
    </>
  );
}

export default App;
