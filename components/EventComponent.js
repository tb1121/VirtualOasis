import React, { useState } from 'react';
import { GroupBox, Button, Checkbox } from 'react95';
import { useAuth } from './AuthContext';


const EventComponent = ({setShowScheduleButton, events, handleBackButtonClick, grabAllEvents}) => {
  setShowScheduleButton(true)
  // State to track the selected events for deletion
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventsDeleted, setEventsDeleted] = useState(false)
  const { username } = useAuth();
  
  const deleteEvents = async (eventsToDelete) => {
    console.log('eventsToDelete is ' , eventsToDelete)
   
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scheduleEvent/deleteEvents/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, eventsToDelete }),
    });

    // Handle the response from the backend
    const data = await response.json();
    console.log('Response from backend:', data);
    grabAllEvents()
    setEventsDeleted(true)
    setTimeout(() => {
      setEventsDeleted(false)
      handleBackButtonClick()
    },2000)
    
  } catch (error) {
    console.error('Error deleting events:', error);
  }
};

  const toggleEventSelection = (event) => {
    // console.log('Toggle event selection:', event);
    if (selectedEvents.includes(event)) {
      const updatedSelectedEvents = selectedEvents.filter(e => e !== event);
      setSelectedEvents(updatedSelectedEvents);
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  
    
  };
console.log('selected events is ', selectedEvents)
  
  

  return (
    <>{eventsDeleted && 
      <h1 style={{color:'green', fontSize: '20px'}}>Selected Events Deleted!</h1>}
      {events.map((event, index) => (
        <GroupBox label='event' key={index} style={{ marginTop: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{event.eventName} {event.time}</span>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {/* Set checked state based on whether the current event is selected */}
              <Checkbox style={{color:'red'}}checked={selectedEvents.includes(event.eventName)} onChange={() => toggleEventSelection(event.eventName)}/>
            </div>
          </div>
        </GroupBox>
      ))}
      {eventsDeleted && 
      <h1 style={{color:'green', fontSize: '20px'}}>Selected Events Deleted!</h1>}
      <Button onClick={handleBackButtonClick}>Back</Button>
      {/* Button to delete selected events */}
      <Button disabled={!selectedEvents.length} onClick={() => deleteEvents(selectedEvents)}>Delete Selected Events</Button>
    </>
  );
};

export default EventComponent;
