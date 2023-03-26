import localisationImg from "../img/localisation_icon.png";
import "bootstrap/dist/css/bootstrap.css";
import React, {useState} from "react";
import MeteoComponents from "./MeteoComponents";
import GeoLocalisationComponents from "./GeoLocalisationComponents";
import {useEffect} from "react";
import axios from "axios";

/**
 * Constitue le squelette de la barre de recherche qui se charge de d'affecter une ville selectionné,
 * de proposer des suggestions en fonctions des inputs de l'utilisateur,
 * de géocaliser l'utilisateur pour lui afficher la météo la plus proche dès le lancement de l'application.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SearchbarComponents(props) {
    //Ces props sont passés en paramètres du composant dans App.js
    const {
        setChoosenCity,
        location,
        textValue,
        setTextValue,
        choosenCity,
        setTimezone,
    } = props;


    //Un tableau de suggestions qui contiendra les villes et leurs informations.
    //Elle sera réinitialiser a chaque changement de la barre de recherche.
    const [suggestions, setSuggestions] = useState([]);

    //Pour gérer l'affichage des suggestions sur l'interface pour les masquer si l'utilisateur ne l'utilise pas.
    const [isSearchBarActive, setIsSearchBarActive] = useState(false);

    // A chaque fois que la localisation change. on appelle getCityNameFromLocation() pour avoir le nom de la ville en fonction des lat, longitude sauvegardé.
    useEffect(() => {
        if (location) {
            getCityNameFromLocation();
        }
    }, [location]);

    // Rempli le tableau de suggestions dès que la barre de recherche change.
    useEffect(() => {
        if (textValue.length > 2) {
            //Le get est efficace à partir d'une chaine de plus de 2 caractères.
            //Rempli le tableau de suggestions.
            checkForSuggestions(textValue);
        }
    }, [textValue]);


    /**
     * return le nom de la ville fonction de la latitude et longitude du useState location.
     */
    const getCityNameFromLocation = () => {
        const url =
            "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
            location.latitude +
            "&lon=" +
            location.longitude;
        axios(url).then((response) => {
            console.log(response);
            setTextValue(response.data.address.city);

            const url =
                "https://geocoding-api.open-meteo.com/v1/search?name=" +
                response.data.address.city;
            axios(url).then((res) => {
                if (res.data.results) {
                    setChoosenCity(res.data.results[0]);
                    console.log(res.data.results);
                }
            });
        });
    };


    //Appelé à chaque nouvel input sur la barre de recherche
    const handleTextChange = (event) => {
        event.preventDefault();
        setTextValue(event.target.value);
        if (event.target.value.length > 2) {
            checkForSuggestions();
        } else {
            setSuggestions([]);
        }
    };

    //Prototype d'utilisation du localstorage en cours...
    useEffect(() => {
        localStorage.setItem("lastCity", JSON.stringify(choosenCity));
    }, [choosenCity]);



    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (suggestions.length > 0) {
            setChoosenCity(suggestions[0]);
        }
    };

    const checkForSuggestions = (currentText) => {
        let city = "";
        if (currentText) {
            city = currentText;
        } else {
            city = textValue;
        }
        const url = "https://geocoding-api.open-meteo.com/v1/search?name=" + city;
        axios(url).then((res) => {
            if (res.data.results) {
                console.log(res.data);
                setTimezone(res.data.results[0].timezone);
                setSuggestions(res.data.results);
            }
        });
    };

    const displaySuggestions = () => {
        if (suggestions.length > 0) {
            return (
                <ul
                    className="suggestions btn w-75 text-start suggestions-list"
                    onBlur={handleFocusEvent}
                >
                    {suggestions.map((suggestion) => (
                        <li
                            className="suggestion-container"
                            key={suggestion.id}
                            onClick={handleSuggestionClick}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            );
        }
    };

    const handleSuggestionClick = (event) => {
        setTextValue(event.target.innerHTML);
        checkForSuggestions(event.target.innerHTML);
        setIsSearchBarActive(false);
    };

    const handleFocusEvent = (event) => {
        console.log("de");
        setIsSearchBarActive(true);
    };

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className="d-flex d-flex justify-content-center w-75 "
            >
                <input
                    type="text"
                    placeholder="Rennes, Alençon..."
                    value={textValue}
                    onChange={handleTextChange}
                    className="bg-transparent border-end-0 border-start-0 border-top-0 w-75"
                    onFocus={handleFocusEvent}
                />
                <button type="submit" className="btn w-75">
                    Rechercher
                </button>
            </form>
            {isSearchBarActive && displaySuggestions()}
        </>
    );
}

export default SearchbarComponents;
