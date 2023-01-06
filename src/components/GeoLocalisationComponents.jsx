import { useState } from 'react'
import MeteoComponents from "./MeteoComponents";

function GeoLocalisationComponents() {
    const [location, setLocation] = useState(null);

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Votre navigateur ne prend pas en charge l'API de géolocalisation.");
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
    };

    return (
        <div>
            <button onClick={getLocation}>Récupérer ma position</button>
            {location ? (
                <p>Latitude : {location.latitude} / Longitude : {location.longitude}</p>
            ) : (
                <p>Aucune position n'a été récupérée</p>
            )}
        </div>
    );
}

export default GeoLocalisationComponents