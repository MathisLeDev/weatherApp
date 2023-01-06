import React, {useEffect} from 'react'
import { useState } from 'react'
import axios from "axios";

function MeteoComponents(choosenCityCoordinates) {


  const [meteo,setMeteo] = useState()

  useEffect(()=>{
    const latitude = choosenCityCoordinates.choosenCityCoordinates.latitude;
    const longitude = choosenCityCoordinates.choosenCityCoordinates.longitude;

    const url = "https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m"
    axios.get(url).then(r => {
      console.log(r);
      setMeteo(r.data.latitude);
    })
  },[])


  const test = () => {
    return meteo && (
        <div>{meteo}</div>
    )
  }


  return (
    <>
      {test()}
      MeteoComponents
    </>
  )

}

export default MeteoComponents