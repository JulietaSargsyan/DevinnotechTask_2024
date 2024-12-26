import './App.css';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import HourlyWeather from './components/hourlyWeather/HourlyWeather';
import Header from './components/header/Header';
import DailyForecast from './components/dailyForecast/DailyForecast';
import { useState } from 'react';

function App() {
  const [unit, setUnit] = useState('metric')
  const [unitIcon, setUnitIcon] = useState('℃')

  function handleToggle(unitData) {
    console.log(unitData)
    unitData === 'C' ? setUnitIcon('℃') : setUnitIcon('℉')
    unitData === 'C' ? setUnit('metric') : setUnit('imperial')
  }

  return (
    <>
      <Header handleToggle={handleToggle} />
      <main>
        <CurrentWeather unitIcon={unitIcon} unit={unit}/>
        <HourlyWeather unitIcon={unitIcon} unit={unit}/>
      </main>
      <div>
        <DailyForecast unitIcon={unitIcon}  unit={unit}/>
      </div>
    </>
  );
}

export default App;
