import React from 'react';
import changeLocationIcon from "../../../assets/changeLocation.svg";
const PrimaryCard = (props) => {
    const {temp, mode, setMode, icon, weatherStr, City, Country, handleChangeLocationClick} = props;
    return (
        <div className={"flex flex-col gap-3 py-8 px-20 mr-auto rounded-md bg-black/30 backdrop-blur"}>
            <div className={"flex flex-row gap-2 items-center"}>
                <h1 className={"text-6xl text-white"}>
                    {temp}°
                </h1>
                <div onClick={()=>setMode(!mode)} className={"flex flex-col "}>
                    <span className={`${mode === "C" ? "text-white" : "text-gray-400"} font-semibold text-xl`}>
                        C
                    </span>
                    <span className={`${mode === "F" ? "text-white" : "text-gray-400"} font-semibold text-xl`}>
                        F
                    </span>
                </div>
                <div className={"flex flex-col gap-2 ml-4 items-center"}>
                    <img src={icon} alt="" height={25} width={25}/>
                    <span className={"text-gray-300"}>{weatherStr}</span>
                </div>
            </div>
            <div className={"flex flex-col"}>
                <span className={"text-white text-bold text-3xl"}>
                    {City}
                </span>
                <span className={"text-gray-300 text-xl"}>
                    {Country}
                </span>
            </div>
            <div onClick={handleChangeLocationClick} className={"flex flex-row gap-2 cursor-pointer text-gray-300 transition-all duration-100 bg-black/50 hover:bg-black/70 p-3 rounded-xl "}>
                <img src={changeLocationIcon} alt="" style={{color:"#c1b9c1"}} height={20} width={20} />
                <span>
                Change location
                </span>
            </div>
        </div>
    );
};

export default PrimaryCard;
