import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Button, ScrollView, TextInput, Window, WindowContent, WindowHeader } from 'react95';
import { useZIndex } from './ZIndexContext';
import 'animate.css';

export default function Internet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [localZIndex, setLocalZIndex] = useState(3);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false)
  const [clicked, setClicked] = useState(false);
  const { globalZIndex, incrementZIndex } = useZIndex();

  const handleMouseDown = () => {
    incrementZIndex();
    setLocalZIndex(globalZIndex + 1);
  };

  const handleSearch = async () => {
    setClicked(true)
    try {
      const response = await fetch('http://localhost:3001/api/internet/getResults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });

      const data = await response.json();

      if(data.items){
      setSearchResults(data.items);
      setNoResults(false)
      }
      else{
        setNoResults(true);
        setSearchResults([])
      }
    } catch (error) {
      console.error('Error during search:', error);
    }finally {
      // Use setTimeout to delay setting 'clicked' to false, allowing time for the animation
      setTimeout(() => {
        setClicked(false);
      }, 1000); // You can a
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Draggable onMouseDown={handleMouseDown} handle=".window-header">
      <div style={{ zIndex: localZIndex, padding: '0', top: '0', right: '0' }}>
        <Window style={{ width: '350px', minWidth: '275px' }}>
          <WindowHeader className="window-header">
            <span className="Explorer100_16x16_4"></span>
            {' '}
            Internet.exe
          </WindowHeader>
          <WindowContent style={{ maxHeight: '450px' }}>
            <div>
              <div className='animate__animated animate__backInRight' style={{ fontSize: '5vw' }}>
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#34A853' }}>g</span>
                <span style={{ color: '#4285F4' }}>l</span>
                <span style={{ color: '#0F9D58' }}>e</span>
              </div>
              <TextInput
                placeholder='Just Google it'
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button className={clicked?'animate__animated animate__tada': ''} onClick={handleSearch}>Search</Button>
            </div>
            {searchResults.length > 0 && (
              <ScrollView style={{ width: '305px', height: '180px' }}>
                <div>
                  <h2 style={{ fontWeight: 'bold' }}>Search Results:</h2>
                  <br></br>
                  <ul>
                    {searchResults.map((result, index) => (
                      <li key={index} style={{
                        marginBottom: '10px',
                        borderBottom: '1px solid black',
                        paddingBottom: '10px',
                        listStyle: 'none', // Remove default list styling
                      }}>
                        <a style={{ color: 'blue' }} href={result.link} target="_blank" rel="noopener noreferrer">
                          {result.link}
                        </a>
                        <br></br>
                        <strong style={{ fontWeight: 'bold' }}>{result.title}</strong>
                        <br></br>
                        <p>{result.snippet}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollView>
            )}
            {noResults && (
            <ScrollView>
              <div>
                Sorry your search returned no results. 
              </div>
            </ScrollView>
            )}
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
