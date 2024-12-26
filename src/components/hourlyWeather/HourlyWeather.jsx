import React, { useEffect, useState } from 'react';
import './hourlyWeather.css'

function HourlyWeather({ searchLocation, unit, unitIcon }) {
    const [location, setLocation] = useState();
    const [weather, setWeather] = useState();

    const API_KEY = 'b7e7f4fd35d3db0c1f437221a1012824';

    useEffect(() => {
        getLocation()
    }, [searchLocation, unit]);

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          console.log("Geolocation not supported");
        }
      }
    
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`)
          .then(response => response.json())
          .then(data => {
            setWeather(data);
            console.log(data);
          })
          .catch(error => console.log(error));
      }
    
      function error() {
        console.log("Unable to retrieve your location");
    }
    const slicedData = weather ? weather.list.slice(0,8) : null;

    return (
        <div>
            {slicedData ? (
            <ul className='weatherList'>
                {slicedData.map((item) => <li>
                    <p>{item.dt_txt.split(' ')[1]}</p>
                    <p>{item.main.temp.toFixed() + unitIcon}</p>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                </li>)}
            </ul>
      ) : (
        <p>Set location</p>
      )}
        </div>
  )
}

export default HourlyWeather;