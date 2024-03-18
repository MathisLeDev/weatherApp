import React from 'react';
import humidity from "../../../img/humidity.svg";
import wind from "../../../img/wind.svg";
import visibility from "../../../img/visibility.svg";
const SecondaryCard = (props) => {
    const {weather} = props;

    //#1c1f22
return (
        <div className={"  flex-1 backdrop-blur rounded-md bg-black/30 p-4"}>
            <div className={" border-b px-6 pb-2 border-b-gray-200/40 flex-row flex justify-between"}>
                <h1 className={"text-2xl text-white font-light cursor-pointer hover:bg-black/70 rounded p-1"}>Today's Forecast</h1>
                <h1 className={"text-2xl text-gray-400 font-light cursor-pointer hover:bg-black/70 rounded p-1"}>Hourly's Forecast</h1>
                <h1 className={"text-2xl text-gray-400 font-light cursor-pointer hover:bg-black/70 rounded p-1"}>Daily's Forecast</h1>
            </div>
            <div className={"grid grid-cols-3 mt-10"}>
                {weather.current_weather && <>
                    <div className={"flex gap-4"}>
                        <div className={"flex items-center gap-2"}>
                            <img src={humidity} alt="" height={25} width={25}/>
                            <span>Humidity</span>
                        </div>
                        <span className={"text-gray-100"}>{weather?.current_weather?.relative_humidity_2m || "Ø%"}</span>
                    </div>

                    <div className={"flex gap-4"}>
                        <div className={"flex items-center gap-2"}>
                            <img src={wind} alt="" height={25} width={25}/>
                            <span>Wind</span>
                        </div>
                        <span className={"text-gray-100"}>{weather?.current_weather?.windspeed + " km/h" || "Økm/h"}</span>
                    </div>

                    <div className={"flex gap-4"}>
                        <div className={"flex items-center gap-2"}>
                            <img src={visibility} alt="" height={25} width={25}/>
                            <span>Visibility</span>
                        </div>
                        <span className={"text-gray-100"}>{weather?.current_weather?.visibility || "Good"}</span>
                    </div>

                </>}
            </div>
        </div>
    );
};

export default SecondaryCard;
