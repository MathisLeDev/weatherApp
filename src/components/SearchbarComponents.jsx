import "bootstrap/dist/css/bootstrap.css";
import React, {useState} from "react";
import {useEffect} from "react";

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
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTextValue(data.address.city);
                const url =
                    "https://geocoding-api.open-meteo.com/v1/search?name=" +
                    data.address.city;
                fetch(url)
                    .then(response => response.json()).catch((error) => {
                    localStorage.setItem("weatherAppError", "Impossible de récupérer la météo pour cette ville");
                })
                    .then(res => {
                        if (res.results) {
                            setChoosenCity(res.results[0]);
                        }
                    }).catch((error) => {
                    localStorage.setItem("weatherAppError", "Impossible de récupérer la météo pour cette ville");
                });
            }).catch((error) => {
            localStorage.setItem("weatherAppError", "Impossible de récupérer la météo pour cette ville");
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
        fetch(url)
            .then(response => response.json())
            .then(res => {
                if (res.results) {
                    setTimezone(res.results[0].timezone);
                    setSuggestions(res.results);
                }
            });
    };

    const displaySuggestions = () => {
        if (suggestions.length > 0) {
            return (
                <ul
                    className="absolute mt-[470px] w-[500px] mr-[115px] bg-black/40 rounded-xl p-1"
                    onBlur={handleFocusEvent}
                >
                    {suggestions.map((suggestion) => (
                        <li
                            className=" p-2 rounded-xl hover:bg-black/60 cursor-pointer text-gray-200 "
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
        <div className={" z-10 mx-auto flex flex-row relative items-center justify-center "}>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-row items-center justify-center rounded-lg "
            >
                <input
                    type="text"
                    placeholder="Rennes, Alençon..."
                    value={textValue}
                    onChange={handleTextChange}
                    className="w-[500px]  px-2 py-2.5 text-gray-200 bg-black/40 rounded-l-xl backdrop-blur"
                    onFocus={handleFocusEvent}
                />
                <button type="submit" className={"p-2 rounded-r-xl text-gray-300 text-lg  bg-black/40 hover:bg-black/70 backdrop-blur"}>
                    Search
                </button>
            </form>
            {isSearchBarActive && displaySuggestions()}
        </div>
    );
}

export default SearchbarComponents;
