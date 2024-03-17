import React, { useState, useEffect } from 'react';
import '@react95/icons/icons.css';
import { useAuth } from './AuthContext';
import WindowComp from './WindowComp';
import Notes from './Notes';
import Internet from './Internet';
import Weather from './Weather'
import 'animate.css';


const StackedDivs = ({ theme }) => {
  const { isLoggedIn, username } = useAuth();
  const [notesData, setNotesData] = useState('');
  const [isTunesOpen, setIsTunesOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isInternetOpen, setIsInternetOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [onOpen, setOnOpen] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsTunesOpen(false);
    }
  }, [isLoggedIn]);

  const toggleTunes = () => {
    if (isLoggedIn){
    setIsTunesOpen(prevState => !prevState);
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

  const handleDiv5Click = () => {
    console.log('Div 5 clicked!');
  };

  setTimeout(() => {
    setOnOpen(false)
  }
  ,4000)

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
      iconClass: 'YourNextIconClass',
      text: '',
      onClick: handleDiv5Click,
    },
  ];
//import animation
//set class to ternary, empty if onOpen is false, and animated if onOpen is true.
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '6vw 2vw 0vw 1vw' }}>
        {divsContent.map((content, index) => (
          <div key={index} className={`animate__animated animate__zoomIn animate__delay-${index + 1}s`} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      <div style={{rowGap: '2vw', flexWrap: 'wrap', minWidth: '85vw', minHeight: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', margin: '6vw .5vw 0vw .5vw' }}>
        {isTunesOpen && <WindowComp isTunesOpen={isTunesOpen} setIsTunesOpen={setIsTunesOpen} onClose={() => setIsTunesOpen(false)} />}
        {isInternetOpen && <Internet onClose={() => setIsInternetOpen(false)} />}
        {isNotesOpen && <Notes setNotesData={setNotesData} notesData={notesData} onClose={() => setIsNotesOpen(false)} />}
        {isWeatherOpen && <Weather onClose={() => setIsWeatherOpen(false)} />}
      </div>
    </div>
  );
};

export default StackedDivs
