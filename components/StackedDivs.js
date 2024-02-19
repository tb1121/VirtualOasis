import React from 'react';
import '@react95/icons/icons.css';
import { useAuth }  from './AuthContext';
import WindowComp from './WindowComp';
import Notes from './Notes'
import { useState, useEffect } from 'react';


const StackedDivs = () => {

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      setIsTunesOpen(false);
    }
  }, [isLoggedIn]);

  const [clicked, setClicked] = useState(false)
  const [ isTunesOpen, setIsTunesOpen ] = useState(false);
  const [ isNotesOpen, setIsNotesOpen] = useState(false);
  const handleTunesClick = () => {
    if (isLoggedIn) {
      // Open the WindowComp
      setClicked(!clicked)
      setIsTunesOpen(true);
    if(!clicked){
      setIsTunesOpen(false)
    } 
    
    }
    else {
      alert('Please login!');
    }
  };

  const handleNotesClick = () => {
    if (isLoggedIn) {
      // Open the WindowComp
      setClicked(!clicked)
      setIsNotesOpen(true);
    if(!clicked){
      setIsNotesOpen(false)
    } 
    
    }
    else {
      alert('Please login!');
    }
  };
  

  const handleDiv3Click = () => {
    console.log('Div 3 clicked!');
    // Add your custom logic for "Div 3" click event
  };

  const handleDiv4Click = () => {
    console.log('Div 4 clicked!');
    // Add your custom logic for "Div 4" click event
  };

  const handleDiv5Click = () => {
    console.log('Div 5 clicked!');
    // Add your custom logic for "Div 5" click event
  };

  const divsContent = [
    {
      iconClass: 'CdMusic_32x32_4',
      text: 'Tunes.exe',
      onClick: handleTunesClick,
    },
    {
      iconClass: 'FilePencil_32x32_4',
      text: 'Notes.exe',
      onClick: handleNotesClick,
    },
    {
      iconClass: 'YourNextIconClass',
      text: 'Text for Div 3',
      onClick: handleDiv3Click,
    },
    {
      iconClass: 'YourNextIconClass',
      text: 'Text for Div 4',
      onClick: handleDiv4Click,
    },
    {
      iconClass: 'YourNextIconClass',
      text: 'Text for Div 5',
      onClick: handleDiv5Click,
    },
  ];

  
  return (
    <div style={{ margin: '100px 0 100px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      {isTunesOpen && <WindowComp onClose={() => setIsTunesOpen(false)} />} {/* Pass onClose handler to WindowComp */}
      {isNotesOpen && <Notes onClose={() => setIsNotesOpen(false)} />} 
    </div>
  );
};

export default StackedDivs;