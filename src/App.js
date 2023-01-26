import "./App.css";
import SearchbarComponents from "./components/SearchbarComponents.jsx";
import WeatherDisplayComponents from "./components/WeatherDisplayComponents";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  return (
    <>
      <SearchbarComponents setWeather={setWeather} />
      {weather !== null && <WeatherDisplayComponents weather={weather} />}
    </>
  );
}

export default App;
