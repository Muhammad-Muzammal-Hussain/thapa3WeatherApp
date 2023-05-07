import React, { useEffect, useState } from 'react'
import Weathercard from './Weathercard'
import './Style.css'
export default function Temperature() {
    const [searchValue,setSearchValue]=useState()
  const [tempInfo, setTempInfo] = useState({});
    
    const getWeatherInfo = async() => {
        try{

            let url= `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=919f9f8bd119ffb25a85477984e3a74c`
            let res=await fetch(url)
            let data= await res.json()
            console.log(data)
            const {temp,pressure,humidity}=data.main
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

            const {main:weathermood}=data.weather[0]
            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
              };
      setTempInfo(myNewWeatherInfo);
        
            // console.log(temp)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        getWeatherInfo();
      }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard  {...tempInfo}/>
    </>
  )
}
