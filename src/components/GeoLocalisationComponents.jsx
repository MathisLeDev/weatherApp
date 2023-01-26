import { useEffect } from "react";
import axios from "axios";

function GeoLocalisationComponents(props) {
  const { location, setLocation, setSearchTerm, setChoosenCityCoordinates } =
    props;

  useEffect(() => {
    if (!navigator.geolocation) {
      alert(
        "Votre navigateur ne prend pas en charge l'API de géolocalisation."
      );
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        alert("Impossible de récupérer votre position : " + error.message);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const url =
        "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
        location.latitude +
        "&lon=" +
        location.longitude;
      axios(url).then((res) => {
        if (res.data.address.city) {
          console.log(res.data.address.city);
          setSearchTerm(res.data.address.city);
          setChoosenCityCoordinates({
            latitude: location.latitude,
            longitude: location.longitude,
          });
        } else {
          console.log("city not found");
        }
      });
    }
  }, [location]);

  return <></>;
}

export default GeoLocalisationComponents