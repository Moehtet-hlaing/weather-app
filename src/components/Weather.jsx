import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '/assets/search.png';
import clear_icon from '/assets/clear.png';
import cloud_icon from '/assets/cloud.png';
import drizzle_icon from '/assets/drizzle.png';
import humidity_icon from '/assets/humidity.png';
import rain_icon from '/assets/rain.png';
import snow_icon from '/assets/snow.png';
import wind_icon from '/assets/wind.png';
import { FaSearch } from 'react-icons/fa';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  };
const search = async (city) => {
  if (city === '') {
    alert('Please enter a city name');
    return;
  }
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e7f51f9953b6741bdbcce82ff653b1f5`);
    const data = await response.json();
    if (!response.ok) {
      alert(data.message);
      return;
    }
    const icon = allIcons[data.weather[0].icon] || clear_icon;
    setWeatherData(
      {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      }
    )
  } catch (error) {
    setWeatherData(false);
    console.error(error);
  }
};

    useEffect(() => {
      search('London');
    }, []);
  return (
    <div className=' flex justify-center items-center w-[100%] mx-auto min-h-screen bg-[#e2d4ff] '>
      <div className='weather bg-gradient-to-br from-indigo-700 to-purple-500 text-white rounded-2xl p-6 w-full max-w-[400px] shadow-lg flex flex-col justify-center'>
    <div className=" flex justify-center items-center ">
      <div className="search-bar flex items-center gap-3 max-w-[250px]">
        <input type="text"  placeholder='Search' ref={inputRef} className=' max-w-[200px] placeholder:text-gray-500'/>
        <button onClick={() => search(inputRef.current.value)} className='flex items-center justify-center'>
          <FaSearch className='w-6 h-6'/>
        </button>
    </div>
    </div>

    {weatherData ? <>
      
    <img src={weatherData.icon} alt="" className='weather-icon '/>
    <p className='temperature'>{weatherData.temperature} °C</p>
    <p className='location'>{weatherData.location}</p>
    <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div className="">
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div className="">
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
    </div>
    </> : <></>}

    </div>
    </div>
  )
}

export default Weather