import React, {useEffect, useState} from 'react';

const HourCard = () => {
    const [loading, setLoading] = useState(true);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [ampm, setAmpm] = useState("AM");
    const [dayString, setDayString] = useState("");
    const [monthString, setMonthString] = useState("");
    const [year, setYear] = useState(0);
    const [dayNumber, setDayNumber] = useState(0);

    useEffect(() => {
        const updateDateTime = () => {
            const date = new Date();
            setHours(date.getHours());
            setMinutes(date.getMinutes());
            setAmpm(date.getHours() >= 12 ? 'PM' : 'AM');
            setDayString(date.toLocaleString("en-US", { weekday: "long" }));
            setMonthString(date.toLocaleString("en-US", { month: "long" }));
            setYear(date.getFullYear());
            setDayNumber(date.getDate());
            setLoading(false);
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className={"py-4 px-8 ml-auto  backdrop-blur rounded-md bg-black/30"}>
            <h1 className={"font-bold text-4xl text-white text-end"}>
                {loading ? <span className={"loading"}/> :
                    `${hours}:${minutes} ${ampm}`
                }
            </h1>
            <h2 className={"font-light text-xl text-gray-300"}>
                {loading ? <span className={"loading"}/> :
                `${dayString}, ${dayNumber} ${monthString} ${year}`
                }
            </h2>
        </div>
    );
};

export default HourCard;
