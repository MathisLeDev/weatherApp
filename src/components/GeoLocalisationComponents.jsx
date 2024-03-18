import { useEffect } from "react";

function GeoLocalisationComponents(props) {
  const { setLocation } = props;
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
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => {
        alert("Impossible de récupérer votre position : " + error.message);
      }
    );
  }, []);

  return <></>;
}

export default GeoLocalisationComponents;
