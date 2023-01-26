import "./App.css";
import SearchbarComponents from "./components/SearchbarComponents.jsx";
import WeatherDisplayComponents from "./components/WeatherDisplayComponents";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState();
  return (
    <>
      <SearchbarComponents />
      {weather !== null && <WeatherDisplayComponents />}
    </>
  );
}

export default App;
