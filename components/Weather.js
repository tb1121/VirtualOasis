import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Button, Window, WindowContent, WindowHeader, TextInput, Tooltip } from 'react95';
import { useAuth } from '../components/AuthContext';
import 'animate.css';
import { useZIndex } from './ZIndexContext';
import 'animate.css';


export default function Weather() {

const [searchQuery, setSearchQuery] = useState('');
const [localZIndex, setLocalZIndex] = useState(3);
const [clicked, setClicked] = useState(false);
const [currWeather, setCurrWeather] = useState('');
const [location, setLocation] = useState('');
const [condition, setCondition] = useState('');
const [weatherFound, setWeatherFound] = useState(false)
const [weatherColor, setWeatherColor] = useState('');
const [weatherText, setWeatherText] = useState('');
const [canSetWeather, setCanSetWeather] = useState(false);
const [weatherClicked, setWeatherClicked] = useState(false);
const [onOpen, setOnOpen] = useState(true);
const { globalZIndex, incrementZIndex } = useZIndex();
const { username } = useAuth();

useEffect(() => {
  if (onOpen) {
    grabSetWeatherOnOpen();
    setOnOpen(false); // Set onOpen to false after running the function
  }
}, [onOpen]);

const handleMouseDown = () => {
  incrementZIndex();
  setLocalZIndex(globalZIndex + 1);
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleWeatherSearch();
  }
};

const handleSetWeather = async () => {
  
  //grab current states(currWeather(number), Location(string), Condition(string))
  //make post request to backend to save those states on the user
  try{
    const response = await fetch('http://localhost:3001/api/findWeather/setWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({currWeather, location, condition, username})
    })

    if (!response.ok) {
      throw new Error('Failed to save weather data');
    }

    const data = await response.json()
    console.log(data)
    setWeatherText('Weather Saved!')

    setWeatherFound(true)

    setTimeout(()=> {
      setWeatherFound(false)
      setWeatherText('')
    },3000)


  }

  catch(error){
    console.error('Error saving weather data:', error);
  }
  //attach this to a set weather button
}

const grabSetWeatherOnOpen = async () => {
  //make get request to backend to grab most recent setWeather
  try{
  const response = await fetch(`http://localhost:3001/api/findWeather/mostRecentWeatherData/${username}`, 

  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  
  if(!response.ok){
    throw new Error('Failed getting most recent weather data');
  }

  const data = await response.json()
  
  //set states with data
  setCurrWeather(data.currWeather)
  setLocation(data.location)
  setCondition(data.condition)
  setOnOpen(false)

  const currWeatherNumber = parseFloat(data.currWeather);

    if(currWeatherNumber <= 32){
      setWeatherColor('lightblue')
      setWeatherText('\'oooo Chilly!\'')
    }
    else if(currWeatherNumber <= 59){
      setWeatherColor('blue')
      setWeatherText('\'A bit cold out!\'')
    }
    else if(currWeatherNumber <= 79){
      setWeatherColor('yellow')
      setWeatherText('\'What a nice day!\'')
    }
    else if(currWeatherNumber <= 90){
      setWeatherColor('orange')
      setWeatherText('\'Wow, its hot today!\'')
    }
    else if(currWeatherNumber <= 130){
      setWeatherColor('red')
      setWeatherText('\'Today is a scortcher!\'')
    }
    

    setWeatherFound(true)

    setTimeout(()=> {
      setWeatherFound(false)
      setWeatherText('')
    },3000)

}
catch(error){
  console.error('Error getting most recent weather data', error)
}
  //make state onOpen set to true, 
  //after this function runs set to false
  //populate the currWeather, location, and condition states
  //this function will run once on open only
}


const handleWeatherSearch = async () => {
  //make post request to backend, send User and query
  try {
    const response = await fetch('http://localhost:3001/api/findWeather/getWeather',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchQuery, username })
    })


    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    setCanSetWeather(true)//make a piece of state turn true here, to able the set weather button
    console.log(data)

    //handle response and populate component with weather data
  
    setCurrWeather(data.current.temp_f);
    setLocation(data.location.name);
    setCondition(data.current.condition.text);

    const currWeatherNumber = parseFloat(data.current.temp_f);

    if(currWeatherNumber <= 32){
      setWeatherColor('lightblue')
      setWeatherText('\'oooo Chilly!\'')
    }
    else if(currWeatherNumber <= 59){
      setWeatherColor('blue')
      setWeatherText('\'A bit cold out!\'')
    }
    else if(currWeatherNumber <= 79){
      setWeatherColor('yellow')
      setWeatherText('\'What a nice day!\'')
    }
    else if(currWeatherNumber <= 90){
      setWeatherColor('orange')
      setWeatherText('\'Wow, its hot today!\'')
    }
    else if(currWeatherNumber <= 130){
      setWeatherColor('red')
      setWeatherText('\'Today is a scortcher!\'')
    }
    

    setWeatherFound(true)

    setTimeout(()=> {
      setWeatherFound(false)
      setWeatherText('')
    },3000)

  }
  catch(error){
    console.error('Error fetching weather data:', error);
  }
  
}

  return (
    <Draggable onMouseDown={handleMouseDown} handle=".window-header">
      <div style={{ zIndex: localZIndex, padding: '0', top: '0', right: '0' }}>
        <Window style={{ width: '350px', minWidth: '275px' }}>
          <WindowHeader className="window-header">
            <span className="Mshtml32528_16x16_8"></span>
            {' '}
            Weather.exe
          </WindowHeader>
          <div style={{margin: '0 0 0 1vw'}}>
          {typeof location === 'string' &&
          <div style={{fontSize: '2vw'}}>
            {location}
          </div>}
          {typeof condition === 'string' &&
          <div style={{fontSize: '2vw'}}>
            {condition}
          </div>}
          {typeof currWeather === 'number' &&
          <div className={weatherFound?'animate__animated animate__backInRight': ''} style={{color: weatherColor,fontSize: '5vw'}}>
            {currWeather} &deg; F
          </div>}
          <div className={`animate__animated ${weatherFound ? 'animate__flipInX' : ''}`} style={{fontSize: '2vw'}}>
            {weatherText}
          </div>
          </div>
          <WindowContent style={{ maxHeight: '450px' }}>
              <TextInput
                placeholder='Please enter Zip Code or City'
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button onClick={handleWeatherSearch}>Local Weather</Button>
              <Tooltip text='Save current weather!'>
              <Button disabled={!canSetWeather} onClick={handleSetWeather}>Set Weather</Button>
              </Tooltip>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
