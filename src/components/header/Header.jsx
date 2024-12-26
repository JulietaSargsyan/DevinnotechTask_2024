import React from 'react';
import './header.css';

function Header({ handleToggle }) {
  return (
    <header>
        <div className='searchBox'>
            <input type="text" placeholder='Type city name' />
            <button>Search city</button>
        </div>
        <div className='toggler'>
            <input id='c' type='radio' name='idk' value='C' onClick={(e) => handleToggle(e.target.value)}/>
            <label className='celcius' htmlFor='c'>&#8451;</label>
            <input id='f' type='radio' name='idk' value='F' onClick={(e) => handleToggle(e.target.value)}/>
            <label htmlFor='f'>&#8457;</label>
        </div>
    </header>
  )
}

export default Header