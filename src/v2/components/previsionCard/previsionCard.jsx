import React, {useEffect, useState} from 'react';

const PrevisionCard = (props) => {
    const { choosenCity, setChoosenDay, weather, getIconWeatherCode, mode } = props;
    const [weeklyWeather, setWeeklyWeather] = useState([]);


    const getDayName = (time) => {
        const date = new Date(time);
        switch (date.getDay()) {
            case 0:
                return "Lun";
                break;
            case 1:
                return "Mar";
            case 2:
                return "Mer";
            case 3:
                return "Jeu";
            case 4:
                return "Ven";
            case 5:
                return "Sam";
            case 6:
                return "Dim";
        }
    };



    useEffect(() => {
        if (weather && weather.daily) { // Vérifie si l'objet weather est présent
            const weeklyWeatherPushed = []; // Initialise un tableau vide pour stocker les données hebdomadaires
            for (let i = 0; i < weather.daily.time.length; i++) { // Boucle sur les données journalières pour remplir le tableau hebdomadaire
                weeklyWeatherPushed.push({
                    temperature_2m_max: weather.daily.temperature_2m_max[i], // Ajoute la température maximale à l'objet poussé dans le tableau
                    temperature_2m_min: weather.daily.temperature_2m_min[i], // Ajoute la température minimale à l'objet poussé dans le tableau
                    time: getDayName(weather.daily.time[i]), // Ajoute le nom du jour de la semaine à l'objet poussé dans le tableau en utilisant la fonction getDayName
                    weathercode: weather.daily.weathercode[i], // Ajoute le code météo à l'objet poussé dans le tableau
                });
            }
            setWeeklyWeather(weeklyWeatherPushed); // Définit les données hebdomadaires en utilisant le tableau rempli
        }
    }, [weather]); // Exécute l'effet lorsque l'objet weather est modifié



    return (
        <div className={"px-10 py-6 flex-1 backdrop-blur rounded-md bg-black/30"}>
            <h1 className={"font-light text-3xl text-white mb-20"}>This week</h1>
            <div className="flex gap-4 justify-evenly">
                {weeklyWeather.length > 0 ? weeklyWeather.map((element, key) => (
                    <ul key={key} className={" flex flex-col bg-black/70 items-center px-8 py-4  text-gray-300"}>
                        <li className={" "}>
                            <img src={getIconWeatherCode(element.weathercode)} height={30} width={30} />
                            <span className={"text-center"}>{element.time}</span>
                        </li>
                        <li className={"text-center  text-white font-semibold"}>
                                    <span className={"text-2xl"}>
                                    {(element.temperature_2m_max + element.temperature_2m_min / 2).toFixed(0)}°
                                    </span>
                            <span className={"text-sm"}>
                                        {mode}
                                    </span>
                        </li>
                    </ul>
                )) : <div className={"flex justify-center flex-1"}> <h1 className={"text-2xl text-white font-light"}>Nothing to display for the moment...</h1></div>}
            </div>
        </div>

    );
};

export default PrevisionCard;
