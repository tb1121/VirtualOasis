import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Button, Window, WindowContent, WindowHeader, TextInput } from 'react95';
import { useAuth } from '../components/AuthContext';
import 'animate.css';

export default function Notes({ notesData, setNotesData }) {
  const { username } = useAuth();
  const { isLoggedIn } = useAuth();
  console.log('Username: ', username);
  console.log('isLoggedIn: ', isLoggedIn);
  const [content, setContent] = useState('');
  const [savedNote, setSavedNote] = useState(false);
  const [previousNoteData, setPreviousNoteData] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newNoteButtonPressed, setNoteButtonPressed] = useState(false)
  const [firstPreviousPressed, setFirstPreviousPressed] = useState(false)
  const [disableNext, setDisableNext] = useState(false)

  useEffect(() => {
    // Set content to the most recent note
    setContent(notesData[notesData.length - 1]);

    // Set previous note data to the second-to-last note
    setPreviousNoteData(notesData.length > 1 ? notesData[notesData.length - 2] : '');

    // Set current index to the most recent note index
    setCurrentIndex(notesData.length -1);

    console.log('notes data is ' + content);
  }, [notesData]);

  useEffect (() => {
    if(newNoteButtonPressed){
      setNoteButtonPressed(false);
    }
    }, [newNoteButtonPressed])
  
    const handleNewNoteClickandSaveCurrentNote = async () => {
      // Check if content is defined and not null
      if (content !== '') {
        setNoteButtonPressed(true);
        await saveNotes();
        setTimeout(() => {
          setContent(''); // Clear content after a short delay
        }, 100);
      }
    };
  

    const handlePreviousNoteClick = async () => {
      console.log('previous pressed');
      // Check if there are notes before stepping back
      if (currentIndex > 0) {
        setDisableNext(false)
        // Check the first press and set to the first index
        if (!firstPreviousPressed) {
          setFirstPreviousPressed(true);
          await setCurrentIndex((prevIndex) => {
            // Set content to the note at the updated index
            setContent(notesData[prevIndex]);
            // Return the updated index
            return prevIndex;
          });
        } else {
          // Decrement the current index and use the updated state
          await setCurrentIndex((prevIndex) => {
            // Set content to the note at the updated index
            setContent(notesData[prevIndex -1]);
            // Return the updated index
            return prevIndex - 1;
          });
        }
      }
    };
    
    
  const handleNextNoteClick = () => {
    console.log('next pressed')
    if(currentIndex + 2 === notesData.length){
      console.log('done')
      setDisableNext(true)

    }
    // Check if there are notes before moving forward
    if (currentIndex < notesData.length) {
      // Increment the current index and use the updated state
      setCurrentIndex((currIndex) => {
        // Set content to the note at the updated index
        setContent(notesData[currIndex + 1]);

        setFirstPreviousPressed(true)
  
        // Return the updated index
        return currIndex + 1;
      });
    }
  };
  
  

  const saveNotes = async () => {
  // Save the current note
  const response = await fetch('http://localhost:3001/api/notes/save-notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, content }),
  });

  const data = await response.json();
  console.log(data);

  setSavedNote(true);

  // Retrieve the updated notes data
  const updatedNotesResponse = await fetch(`http://localhost:3001/api/notes/get-all-notes/${username}`);
  const updatedNotesData = await updatedNotesResponse.json();
  const newData = updatedNotesData.allNotes;

  setNotesData(newData);
  setFirstPreviousPressed(false)

  // Set content to the most recent note
  if(newNoteButtonPressed){
    setFirstPreviousPressed(false)
    setContent('')
    setNoteButtonPressed(false)
    setTimeout(() => {
      setSavedNote(false);
    }, 2000);
  
  }else{
 
  // setContent(newData[newData.length - 1]);
  

  // Update the parent component's notesData (assuming setNotesData is a state in the parent component)
  setNotesData(newData);

  setTimeout(() => {
    setSavedNote(false);
  }, 2000);
};
  }
  

  

  return (
    <Draggable handle=".window-header" style={{ position: 'fixed' }}>
      <div style={{ position: 'fixed', margin: '10vw 3vw 0vw 0vw', padding: '0', top: '0', right: '0' }}>
        <Window>
          <WindowHeader className="window-header">
            <span className="FilePen_16x16_4"></span>
            Notes.txt
          </WindowHeader>
          <WindowContent>
            {savedNote && (
              <h1 className={`animate__animated ${savedNote ? 'animate__bounceIn' : ''}`}>Note Saved!</h1>
            )}
            <div>
              <TextInput
                placeholder="Lets get it done!"
                style={{ minWidth: '22vw', height: '22vw', }}
                multiline
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </WindowContent>
          <Button onClick={saveNotes}>Save</Button>
          {/* when I press save here, I want to also grab the entire content again to include the note just saved, so essentially just update content with the most recent saved note */}
          <Button onClick={handlePreviousNoteClick}>Previous</Button>
          <Button disabled={disableNext} onClick={handleNextNoteClick}>Next</Button>
          <Button onClick={handleNewNoteClickandSaveCurrentNote}>New Note</Button>
        </Window>
      </div>
    </Draggable>
  );
}
