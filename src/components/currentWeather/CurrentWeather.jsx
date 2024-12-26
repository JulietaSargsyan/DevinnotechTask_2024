import React, { useEffect, useState } from 'react';
import './currentWeather.css'

function CurrentWeather({ searchLocation, unitIcon, unit }) {
    const [location, setLocation] = useState();
    const [weather, setWeather] = useState();

    const API_KEY = 'e2bf4fe32fe6b544c483860294c5c409'

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
    
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`)
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

    return (
        <div className='currWeather'>
            {weather ? (
            <>
              <h2>{weather.name}</h2>
              <p className='temp'>{weather.main.temp.toFixed() + unitIcon}</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
              <p>{weather.weather[0].description}</p>
            </>
      ) : (
        <p>Set location</p>
      )}
        </div>
  )
}

export default CurrentWeather;