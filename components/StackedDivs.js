import React, { useState } from 'react';
// import '@react95/icons/icons.css';
import { useAuth } from './AuthContext';
import WindowComp from './WindowComp';
import Notes from './Notes';
import Internet from './Internet';
import Weather from './Weather';
import Calendar from './Calendar';
import Calculator from './Calculator';
import 'animate.css';



const StackedDivs = ({ theme }) => {
  const { isLoggedIn, username } = useAuth();
  const [notesData, setNotesData] = useState('');
  const [isTunesOpen, setIsTunesOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isInternetOpen, setIsInternetOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const {setStopMusic, stopMusic} =  useAuth();

  const toggleTunes = () => {
    if (isLoggedIn) {
      if (isTunesOpen) {
        setStopMusic(true); // Stop the music if it's currently playing
        setTimeout(() => {
          setIsTunesOpen(false); // Close the window after a delay
        }, 100);
      } else {
        setStopMusic(false); // Start the music if it's not playing
        setIsTunesOpen(true); // Open the window
      }
    }
  };
  

  const toggleNotes = async () => {
    if (isLoggedIn) {
      setIsNotesOpen(prevState => !prevState);

      if (!isNotesOpen) {
        try {
          const response = await fetch(`http://localhost:3001/api/notes/get-all-notes/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setNotesData(data.allNotes);
            console.log('All notes:', data);
          } else {
            console.error('Error fetching most recent note');
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    } else {
      alert('Please login!');
    }
  };

  const toggleInternet = () => {
    if (isLoggedIn){
    setIsInternetOpen(prevState => !prevState);
    }
  };

  const toggleWeather = () => {
    if (isLoggedIn){
    setIsWeatherOpen(prevState => !prevState);
    }
  };

  const toggleCalendar = () => {
    if (isLoggedIn){
    setIsCalendarOpen(prevState => !prevState);
    }
  };

  const toggleCalculator = () => {
    if (isLoggedIn){
    setIsCalculatorOpen(prevState => !prevState);
    }
  };

  const divsContent = [
    {
      iconClass: 'CdMusic_32x32_4',
      text: 'Tunes.exe',
      onClick: toggleTunes,
    },
    {
      iconClass: 'FilePencil_32x32_4',
      text: 'Notes.txt',
      onClick: toggleNotes,
    },
    {
      iconClass: 'ComputerFind_32x32_4',
      text: 'Internet.exe',
      onClick: toggleInternet,
    },
    {
      iconClass: 'Explore_32x32_4',
      text: 'Weather.exe',
      onClick: toggleWeather,
    },
    {
      iconClass: 'Timedate_32x32_4',
      text: 'Calendar.exe',
      onClick: toggleCalendar,
    },
    {
      iconClass: 'Calculator_32x32_4',
      text: 'Calculator.exe',
      onClick: toggleCalculator,
    }
  ];
//import animation
//set class to ternary, empty if onOpen is false, and animated if onOpen is true.
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '70px 2vw 0vw 1vw' }}>
        {divsContent.map((content, index) => (
          <div key={index} className={`animate__animated animate__zoomIn animate__delay-${index}s`} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              className={content.iconClass}
              onClick={content.onClick}
              style={{ cursor: content.onClick ? 'pointer' : 'default', margin: '0', padding: '0' }}
            ></span>
            <p style={{ margin: '0', color: 'white', fontSize: '15px', textAlign: 'center' }}>
              {content.text}
            </p>
          </div>
        ))}
      </div>
      <div style={{rowGap: '2vw', flexWrap: 'wrap', minWidth: '85vw', minHeight: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', margin: '65px .5vw 2vw .5vw' }}>
        {isTunesOpen && <WindowComp />}
        {isInternetOpen && <Internet />}
        {isNotesOpen && <Notes setNotesData={setNotesData} notesData={notesData} />}
        {isWeatherOpen && <Weather style={{ marginBottom: '20px' }}/>}
        {isCalendarOpen && <Calendar />}
        {isCalculatorOpen && <Calculator />}

      </div>
    </div>
  );
};

export default StackedDivs
