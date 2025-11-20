import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ScrollView, Select, NumberInput, Window, WindowContent, WindowHeader, Button, GroupBox, TextInput } from 'react95';
import { useZIndex } from './ZIndexContext';
import 'animate.css';
import { useAuth } from '../components/AuthContext';
import EventComponent from './EventComponent';
import Confetti from 'react-dom-confetti';

export default function Calendar() {
  const [localZIndex, setLocalZIndex] = useState(3);
  const { globalZIndex, incrementZIndex } = useZIndex();
  const [showScheduleButton, setShowScheduleButton] = useState(false);
  const [windowHeight, setWindowHeight] = useState('395px');
  const [animate, setAnimate] = useState(false);
  const [isFutureDate, setIsFutureDate] = useState(false);
  const [showEventScheduler, setShowEventScheduler] = useState(false); 
  const [scheduleButtonClicked, setScheduleButtonClicked] = useState
  (false); 
  const [selectedTime, setSelectedTime] = useState('12:00 AM');
  const [eventName, setEventName] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [onMount, setOnMount] = useState(false);
  const [time, setTime] = useState('');
  const [events, setEvents] = useState('');
  const [eventsByDate, setEventsByDate] = useState({}); // State variable to store events by 
  // date
  const [showConfetti, setShowConfetti] = useState(false);
  const [eventsObject, setEventsObject] = useState([])
  const [renderEventComponent, setRenderEventComponent] = useState(false);
  const {username} = useAuth();

  const config = {
    angle: 599,
    spread: 500,
    startVelocity: 50,
    elementCount: 100,
    dragFriction: 0.3,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };


  useEffect(() => {
    grabAllEvents(); // Fetch events whenever the month or year changes
  }, [selectedMonth, selectedYear]); // Run the effect whenever the selectedMonth or selectedYear changes
  
  // Update the useEffect hook for onMount
  useEffect(() => {
    if (onMount) {
      grabAllEvents(); // Call grabAllEvents only when onMount is true
      setAnimate(true); // Trigger animation when component mounts
    }
  }, [onMount, selectedMonth, selectedYear]); // Run the effect whenever onMount or selectedMonth or selectedYear changes
  
  // Set onMount to true when the component renders
  useEffect(() => {
    setOnMount(true);
  }, []);
  

  const handleMouseDown = () => {
    incrementZIndex();
    setLocalZIndex(globalZIndex + 1);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const generateCalendar = () => {
    const days = daysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    const calendar = [];
    let dayCounter = 1;

    // Push null values for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push(null);
    }

    // Push days of the month into the calendar
    for (let i = 1; i <= days; i++) {
      calendar.push(i);
    }

    // Ensure the calendar has at least 35 cells
    while (calendar.length < 35) {
      calendar.push(null);
    }

    // If the calendar has more than 35 cells, add another row with null values
    if (calendar.length > 35) {
      calendar.push(...Array(7).fill(null));
    }

    return calendar;
  };

  const handleTimeChange = (selectedOption) => {
    setSelectedTime(selectedOption.value);
  };

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(parseInt(value));
    setSelectedDate(null); // Reset selectedDate when year changes
  };


  const handleBackButtonClick = () => {
    console.log('back button clicked')
    setRenderEventComponent(false);
    // renderCalendarDays();
  };
  
  // const EventComponent = () => {
  //   console.log('rendering EventComponent');
  
    
  
  //   return (
  //     <>
  //       {events.map((event, index) => (
  //         <GroupBox label='event' key={index} style={{ marginTop: '10px', marginBottom: '10px' }}>
  //           {event.eventName} {event.time}
  //         </GroupBox>
  //       ))}
  //       <Button onClick={() => {handleBackButtonClick()}}>Back</Button>
  //     </>
  //   );
  // };
  
 

  const handleDateSelect = (day) => {
    console.log('handleDateSelect triggered!')
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    //check if date selected is in eventsbydate, if it is then I want to conditionally render
    //a new component in scrollview that shows the event for that day.
    const eventDateKey = `${selectedMonth}/${day}/${selectedYear}`;
    if (eventsByDate[eventDateKey]) {
      setShowScheduleButton(true)
      // Extract all events for the specified date
      const eventsForDate = eventsByDate[eventDateKey];
  
      // Create an array to store event objects with both name and time
      const eventsData = eventsForDate.map(event => ({
          eventName: event.eventName,
          time: event.time
      }));
  
      // Set the aggregated events data
      setEvents(eventsData);
  
      // Set renderEventComponent to true to render the event component
      setRenderEventComponent(true);
      
  }

  

    // Check if the selected date is in the past
    if (
      selectedYear < currentYear ||
      (selectedYear === currentYear && selectedMonth < currentMonth) ||
      (selectedYear === currentYear && selectedMonth === currentMonth && day < currentDay)
    ) {
      // Do not set the selected date if it's in the past
      return;
    }

    // Update selected date and showScheduleButton state
    setSelectedDate(selectedDate === day ? null : day);
    setShowScheduleButton(day !== null); // Update showScheduleButton based on the presence of a selected date
    setIsFutureDate(day === null || (selectedYear > currentYear || (selectedYear === currentYear && selectedMonth > currentMonth) || (selectedYear === currentYear && selectedMonth === currentMonth && day >= currentDay)));

  };

  const handleMonthSelect = (value) => {
    setSelectedMonth(parseInt(value));
    setSelectedDate(null); // Reset selectedDate when month changes
  };

  const handleScheduleEvent = () => {
    // Implement your logic here to schedule an event using selectedDate, selectedMonth, and selectedYear
    console.log(`Scheduling event for ${selectedMonth}/${selectedDate}/${selectedYear}`);
    setShowEventScheduler(true); // Set to true to render the event scheduler
    setScheduleButtonClicked(true); // Set the state to indicate that the button has been clicked
  };

  const eventScheduler = () => {
    // Generate time options for the Select component
    const timeOptions = [];
    for (let hour = 0; hour <= 23; hour++) { // Start from 12:00 AM (hour 0) to 11:00 PM (hour 23)
      for (let minute = 0; minute < 60; minute += 5) {
        // Format hour and minute with leading zero if needed
        const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        
        // Determine AM or PM based on hour
        const period = hour < 12 ? 'AM' : 'PM';
  
        // Adjust hour for PM times
        const adjustedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
        // Add the time option to the array
        timeOptions.push({ label: `${adjustedHour}:${formattedMinute} ${period}`, value: `${adjustedHour}:${formattedMinute} ${period}` });
      }
    }
  
    return (
      <div>
        <p>You are scheduling an event on <span style={{color:'green'}}>{selectedMonth}/{selectedDate}/{selectedYear}</span></p>
        <GroupBox label="Event">
          <Select variant='flat' menuMaxHeight={160} width={140} style={{ marginBottom: '10px' }} options={timeOptions} onChange={handleTimeChange}/>
          <TextInput
            variant='flat'
            value={eventName} // Pass the state variable directly as the value
            onChange={handleEventNameChange} // Pass the handler function directly
            style={{marginBottom: '10px'}}
            placeholder='Event name'
          />
          <Button variant='flat' onClick={handleSaveEvent}>Save Event</Button>
          <Button variant='flat' onClick={handleCancelEvent}>Cancel</Button>
        </GroupBox>
      </div>
    );
  };

  const attachEventsToDates = (data) => {
    const eventsByDate = {};

    // Iterate through allData
    data.forEach((event) => {
        // Extract the event date and name
        const eventDate = new Date(Date.parse(event.dateTime));
        const eventName = event.eventName;

        // Format the event date without time
        const formattedDate = eventDate.toLocaleDateString('en-US');

        // If eventsByDate does not have a key for the date, create an empty array
        if (!eventsByDate[formattedDate]) {
            eventsByDate[formattedDate] = [];
        }

        // Push the event object containing both name and time to the array corresponding to the date
        eventsByDate[formattedDate].push({ eventName, time: eventDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true}) });
    });

    return eventsByDate;
};


// Call the function and store the result in a variable


// Now eventsByDate is an object where keys are dates and values are arrays of event names for that date
// You can use eventsByDate to display events on the calendar UI



  const grabAllEvents = async () => {
    //get request to backend http://localhost:3001/api/scheduleEvent/grabAllEvents
    try{
    //send along username in params
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scheduleEvent/grabAllEvents/${username}`, {
      
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      //handle response 
      const data = await response.json()
      setEventsObject(data.allData)
      console.log('Events data: ', data.allData)
      setEventsByDate(attachEventsToDates(data.allData));
      console.log('events by date is ' , eventsByDate)

      }
      catch(error){
        console.error({message: error})
      }
    
    

  }
  
  
  

  const handleSaveEvent = async () => {
    try {
      // Convert date to a Date object
      const eventDate = new Date(selectedYear, selectedMonth - 1, selectedDate);
  
      // Split the selected time into components (hour, minute, period)
      const [time, period] = selectedTime.split(' ');
      const [hourStr, minuteStr] = time.split(':');
      let hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);
  
      // Convert the hour to 24-hour format if it's PM and not 12 PM
      if (period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        // Convert 12 AM to 0 hour (midnight)
        hour = 0;
      }
  
      // Create the eventTime Date object with the adjusted hour and minute
      const eventDateTime = new Date(eventDate);
      eventDateTime.setHours(hour, minute, 0, 0);
  
      // Prepare the data to send in the request body
      const eventData = {
        username: username,
        eventName: eventName,
        dateTime: eventDateTime, // Use the combined DateTime object
      };
  
      console.log('eventDatetime is ', eventDateTime);
      console.log('username is ', username);
      console.log('eventName is ', eventName);
  
      // Make the POST request to your backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scheduleEvent/saveEvent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
  
      // Parse the JSON response
      const responseData = await response.json();
  
      // Handle the response if needed
      console.log(responseData);
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      },2000)
  
      // Hide the event scheduler after saving the event
      setShowEventScheduler(false);
  
      // Enable the Schedule Event button after saving the event
      setScheduleButtonClicked(false);
      handleBackButtonClick()
      grabAllEvents()

    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error saving event:', error);
    }
  };
  

  const handleCancelEvent = () => {
    setShowEventScheduler(false);
    setScheduleButtonClicked(false); // Enable the Schedule Event button after canceling the event
  }

  const renderCalendarDays = () => {
  console.log('rendering renderCalendarDays')
  const calendar = generateCalendar();
  const rows = [];

  while (calendar.length > 0) {
    rows.push(calendar.splice(0, 7));
  }

  // Get the current day
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  // Check if the current month and year match the selected month and year
  const isCurrentMonthAndYear =
    currentDate.getMonth() + 1 === selectedMonth &&
    currentDate.getFullYear() === selectedYear;

  let animationDelay = 0; // Initial animation delay

  return (
    <>
      <div style={{ backgroundColor: 'darkGray', paddingTop: '2px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>S</div>
        <div style={{ flex: 1 }}>M</div>
        <div style={{ flex: 1 }}>T</div>
        <div style={{ flex: 1 }}>W</div>
        <div style={{ flex: 1 }}>T</div>
        <div style={{ flex: 1 }}>F</div>
        <div style={{ flex: 1 }}>S</div>
      </div>
      {rows.map((row, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {row.map((day, idx) => {
            // Check if the day has events associated with it
            const eventDateKey = `${selectedMonth}/${day}/${selectedYear}`;
            const hasEvents = eventsByDate.hasOwnProperty(eventDateKey);

            return (
              <div
                className={`animate__animated ${animate ? 'animate__fadeIn' : ''}`}
                key={idx}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '5px',
                  margin: '0px',
                  backgroundColor:
                    isCurrentMonthAndYear && day === currentDay
                      ? 'blue'
                      : selectedDate === day && day !== null
                        ? 'pink'
                        : hasEvents // Check if the day has events
                          ? 'red' // Apply red background if there are events
                          : 'transparent',
                  outline:
                    isCurrentMonthAndYear && day === currentDay && selectedDate === day
                      ? '2px solid pink'
                      : isCurrentMonthAndYear && day === currentDay && hasEvents
                        ? '2px solid red'
                        : '', // Use outline instead of border
                  // fontSize: '12px', // Adjust font size
                  width: '20px', // Adjust width for a square
                  height: '20px', // Adjust height for a square
                  lineHeight: '20px', // Align text vertically
                  cursor: 'pointer', // Add cursor pointer for selection
                  animationDelay: `${animationDelay += 0.1}s`, // Apply animation delay
                }}
                onClick={() => handleDateSelect(day)}
              >
                {day !== null ? day : ''}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

  

  const monthOptions = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 }
  ];

  return (
    <Draggable onMouseDown={handleMouseDown} handle=".window-header">
      <div style={{ zIndex: localZIndex, padding: '0', top: '0', right: '0' }}>
        <Window style={{ width: '200px', height: windowHeight, minWidth: '300px' }}>
          <WindowHeader className='window-header'>
            <span className="Timedate_16x16_4"></span>
            {' '}Calendar.exe
          </WindowHeader>
          <WindowContent>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
              <Select
                disabled={scheduleButtonClicked}
                value={selectedMonth}
                options={monthOptions}
                onChange={(selectedOption) => handleMonthSelect(selectedOption.value)}
                menuMaxHeight={160}
                width={260}
                style={{ marginRight: '10px' }}
              />

              <NumberInput
                disabled={scheduleButtonClicked}
                defaultValue={selectedYear}
                min={1900}
                max={2100}
                onChange={handleYearChange} // Pass the function directly
              />
            </div>
            <div style={{ marginTop: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Confetti active={showConfetti} config={config} style={{ zIndex: 2000 }} />
              </div>
              <ScrollView style={{ overflow: 'hidden', height: '220px' }}>
              {showEventScheduler ? eventScheduler() : renderEventComponent ? <EventComponent setShowScheduleButton={setShowScheduleButton} eventsByDate={eventsByDate} grabAllEvents={grabAllEvents} eventsObject={eventsObject} handleBackButtonClick={handleBackButtonClick} events={events} /> : renderCalendarDays()}

              </ScrollView>
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <Button onClick={handleScheduleEvent} disabled={!selectedDate || selectedTime === null || !isFutureDate || scheduleButtonClicked }>Schedule Event</Button>
              </div>
            </div>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}

