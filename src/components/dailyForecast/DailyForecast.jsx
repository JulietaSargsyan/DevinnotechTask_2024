import React, { useEffect, useState } from 'react';
import './dailyForecast.css'

function DailyForecast({ searchLocation, unit, unitIcon }) {
    const [location, setLocation] = useState();
    const [weather, setWeather] = useState();
    const [dailyData, setDailyData] = useState([]);

    const API_KEY = 'b7e7f4fd35d3db0c1f437221a1012824';

    useEffect(() => {
        getLocation()
    }, [unit]);

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
    const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
    let daily;
    if (weather) {
        daily = every_nth(weather.list, 8);
        daily.unshift(weather.list[0]);
        console.log('daily is',daily)
    }
    const slicedData = daily ? daily.slice(0,5) : null;

    return (
        <div>
            {slicedData ? (
            <ul className='dailyList'>
                {slicedData.map((item) => <li>
                    <p>{item.dt_txt.split(' ')[0]}</p>
                    <div className='tempImg'>
                        <p className='temp'>{item.main.temp.toFixed() + unitIcon}</p>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                    </div>
                </li>)}
            </ul>
      ) : (
        <p>Set location</p>
      )}
        </div>
  )
}

export default DailyForecast;