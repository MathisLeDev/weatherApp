import "./App.css";
import SearchbarComponents from "./components/SearchbarComponents.jsx";
import WeatherDisplayComponents from "./components/WeatherDisplayComponents";
import { useEffect, useState } from "react";
import GeoLocalisationComponents from "./components/GeoLocalisationComponents";
import StorageComponents from "./components/StorageComponents";

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [choosenCity, setChoosenCity] = useState({ name: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    setTextValue(choosenCity.name);
  }, [choosenCity]);

  /*return (
    <section className="vh-100">
      <SearchbarComponents
        location={location}
        setChoosenCity={setChoosenCity}
        textValue={textValue}
        setTextValue={setTextValue}
        choosenCity={choosenCity}
      />
      <GeoLocalisationComponents setLocation={setLocation} />
      <WeatherDisplayComponents choosenCity={choosenCity} />
      <StorageComponents
        setChoosenCity={setChoosenCity}
        setTextValue={setTextValue}
        choosenCity={choosenCity}
      />
    </section>
  );*/

  return (
    <section className="vh-100 flex-column d-flex justify-content-around align-items-center ">
      <SearchbarComponents
        location={location}
        setChoosenCity={setChoosenCity}
        textValue={textValue}
        setTextValue={setTextValue}
        choosenCity={choosenCity}
      />
      <GeoLocalisationComponents setLocation={setLocation} />

      <div className="card w-75 h-25 rounded-5">
        <div className="card-header w-75 bg-body border-0 h-25 bg-transparent">
          <span></span>
        </div>
      </div>
      <div className="card w-75 h-25 rounded-5">
        <div className="card-header w-75 bg-body border-0 h-25 bg-transparent">
          <span></span>
        </div>
      </div>
      <div className="card w-75 h-25 rounded-5">
        <div className="card-header w-75 bg-body border-0 h-25 bg-transparent">
          <span></span>
        </div>
      </div>
    </section>
  );
}

export default App;
