import React, { useEffect } from "react";
import { useState } from "react";

function MeteoComponents(props) {
  const { choosenCityCoordinates, setWeather } = props;
  const [meteo, setMeteo] = useState();

  useEffect(() => {
    const latitude = choosenCityCoordinates.latitude;
    const longitude = choosenCityCoordinates.longitude;

    const url =
        "https://api.open-meteo.com/v1/forecast?latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&daily=temperature_2m_min" +
        "&daily=temperature_2m_max" +
        "&timezone=GMT";
    fetch(url)
        .then(response => response.json())
        .then(data => {
          setWeather(data);
          setMeteo(data.latitude);
        });
  }, []);

  return <></>;
}

export default MeteoComponents;
