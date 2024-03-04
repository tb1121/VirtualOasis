import React from 'react';
import '@react95/icons/icons.css';
import { useAuth } from './AuthContext';
import WindowComp from './WindowComp';
import Notes from './Notes';
import Internet from './Internet';
import { useState, useEffect } from 'react';
import 'animate.css';

const StackedDivs = () => {
  const { isLoggedIn, username } = useAuth();
  const [notesData, setNotesData] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      setIsTunesOpen(false);
    }
  }, [isLoggedIn]);

  const [clicked, setClicked] = useState(false);
  const [isTunesOpen, setIsTunesOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isInternetOpen, setIsInternetOpen] = useState(false);

  const handleTunesClick = () => {
    if (isLoggedIn) {
      setClicked(!clicked);
      setIsTunesOpen(!clicked);
    } else {
      alert('Please login!');
    }
  };

  const handleNotesClick = async () => {
    if (isLoggedIn) {
      setClicked(!clicked);
      setIsNotesOpen(!clicked);

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

  const handleInternetClick = () => {
    if (isLoggedIn) {
      setClicked(!clicked);
      setIsInternetOpen(!clicked);
    } else {
      alert('Please login!');
    }
  };

  const handleDiv3Click = () => {
    console.log('Div 3 clicked!');
  };

  const handleDiv4Click = () => {
    console.log('Div 4 clicked!');
  };

  const handleDiv5Click = () => {
    console.log('Div 5 clicked!');
  };

  const divsContent = [
    {
      iconClass: 'CdMusic_32x32_4',
      text: 'Tunes.exe',
      onClick: handleTunesClick,
    },
    {
      iconClass: 'FilePencil_32x32_4',
      text: 'Notes.txt',
      onClick: handleNotesClick,
    },
    {
      iconClass: 'Explorer100_32x32_4',
      text: 'Internet.exe',
      onClick: handleInternetClick,
    },
    {
      iconClass: 'YourNextIconClass',
      text: '',
      onClick: handleDiv4Click,
    },
    {
      iconClass: 'YourNextIconClass',
      text: '',
      onClick: handleDiv5Click,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '6vw 2vw 0vw 1vw' }}>
        {divsContent.map((content, index) => (
          <div key={index} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      <div style={{minWidth: '100%', minHeight: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'row', marginTop: '6vw', marginLeft:'1.6vw'}}>
        {isTunesOpen && <WindowComp style={{}}isTunesOpen={isTunesOpen} setIsTunesOpen={setIsTunesOpen} onClose={() => setIsTunesOpen(false)} />}
        {isInternetOpen && <Internet />}
        {isNotesOpen && <Notes setNotesData={setNotesData} notesData={notesData} onClose={() => setIsNotesOpen(false)} />}
        
      </div>
    </div>
  );
};

export default StackedDivs;
