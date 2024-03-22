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
  
  //here, i need to only send the location, then on the backend just save the location
  //so i need to modify the user/weather model to hold just a string.
  try{
    const response = await fetch('http://localhost:3001/api/findWeather/setWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({location, username})
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

function convertTo12HourFormat(time) {
  let [hour, minute] = time.split(":").map(Number);
  let period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
}

const grabSetWeatherOnOpen = async () => {
  //make get request to backend to grab most recent setWeather
  //here I need to grab the location from the database on the backend, then make an axios request to the weather api with the location
  //and then populate currWeather, location, and condition with the response.
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
  console.log('weather data is ', data)

  let dateAndTime = data.location.localtime;

  let timeOnly = dateAndTime.split(" ")[1];
  let twelveHourTime = convertTo12HourFormat(timeOnly)
  console.log('time is ', twelveHourTime)

  let AM;
  let PM;

    if (twelveHourTime.includes('AM')) {
      AM = 'AM';
    } else {
    PM = 'PM';
    }

// Now you can use the AM and PM variables elsewhere in your code


  // Determine the part of the day based on twelveHourTime
  const hour = parseInt(twelveHourTime.split(":")[0]);
  console.log('hour is ' , hour)

  //check if AM is populated, else assume PM is populated and check using 12 hour clock

let partOfDay;
//if am exists
if(AM === 'AM'){
  //if the hour is over 5 or under 12, its morning
  if (hour >= 5 && hour < 12) {
    partOfDay = "this morning!";
  }
  else {
    partOfDay = "tonight!";
  }
}
//if PM exists
if(PM === 'PM'){
  if (hour >= 12 || hour < 6){
    partOfDay = "this afternoon!"
  }
  else {
    partOfDay = "tonight!"
  }
}


// console.log('period is ' , period)
console.log('part of day is ' , partOfDay)

  
  //set states with data
  setCurrWeather(data.current.temp_f);
  setLocation(data.location.name);
  setCondition(data.current.condition.text);
  setOnOpen(false)

  const currWeatherNumber = parseFloat(data.current.temp_f);

    if(currWeatherNumber <= 32){
      setWeatherColor('lightblue')
      setWeatherText(`\'oooo Chilly ${partOfDay}\'`)
    }
    else if(currWeatherNumber <= 59){
      setWeatherColor('blue')
      setWeatherText(`\'A bit cold out ${partOfDay}\'`)
    }
    else if(currWeatherNumber <= 79){
      setWeatherColor('yellow')
      setWeatherText(`\'Wow, its nice ${partOfDay}\'`)//dynamically change the word day text based on time, change the word day to morning, afternoon or night
    }
    else if(currWeatherNumber <= 90){
      setWeatherColor('orange')
      setWeatherText(`\'Wow, its hot ${partOfDay}\'`)//dynamically change the word today to this morning, this afternoon, or tonight
    }
    else if(currWeatherNumber <= 130){
      setWeatherColor('red')
      setWeatherText(`\'It\'s a scortcher ${partOfDay}\'`)//dynamically change the word today to This morning, This afternoon, or Tonight
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

    let dateAndTime = data.location.localtime;

  let timeOnly = dateAndTime.split(" ")[1];
  let twelveHourTime = convertTo12HourFormat(timeOnly)
  console.log('time is ', twelveHourTime)

  let AM;
  let PM;

    if (twelveHourTime.includes('AM')) {
      AM = 'AM';
    } else {
    PM = 'PM';
    }

// Now you can use the AM and PM variables elsewhere in your code


  // Determine the part of the day based on twelveHourTime
  const hour = parseInt(twelveHourTime.split(":")[0]);
  console.log('hour is ' , hour)

  //check if AM is populated, else assume PM is populated and check using 12 hour clock

  let partOfDay;
  //if am exists
  if(AM === 'AM'){
    //if the hour is over 5 or under 12, its morning
    if (hour >= 5 && hour < 12) {
      partOfDay = "this morning!";
    }
    else {
      partOfDay = "tonight!";
    }
  }
  //if PM exists
  if(PM === 'PM'){
    if (hour >= 12 || hour < 6){
      partOfDay = "this afternoon!"
    }
    else {
      partOfDay = "tonight!"
    }
  }


// console.log('period is ' , period)
console.log('part of day is ' , partOfDay)


    //handle response and populate component with weather data
  
    setCurrWeather(data.current.temp_f);
    setLocation(data.location.name);
    setCondition(data.current.condition.text);

    const currWeatherNumber = parseFloat(data.current.temp_f);

    if(currWeatherNumber <= 32){
      setWeatherColor('lightblue')
      setWeatherText(`\'oooo Chilly ${partOfDay}\'`)
    }
    else if(currWeatherNumber <= 59){
      setWeatherColor('blue')
      setWeatherText(`\'A bit cold out ${partOfDay}\'`)
    }
    else if(currWeatherNumber <= 79){
      setWeatherColor('yellow')
      setWeatherText(`\'Wow, its nice ${partOfDay}\'`)//dynamically change the word day text based on time, change the word day to morning, afternoon or night
    }
    else if(currWeatherNumber <= 90){
      setWeatherColor('orange')
      setWeatherText(`\'Wow, its hot ${partOfDay}\'`)//dynamically change the word today to this morning, this afternoon, or tonight
    }
    else if(currWeatherNumber <= 130){
      setWeatherColor('red')
      setWeatherText(`\'It\'s a scortcher ${partOfDay}\'`)//dynamically change the word today to This morning, This afternoon, or Tonight
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
