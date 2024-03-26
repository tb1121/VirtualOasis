import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ScrollView, Select, NumberInput, Window, WindowContent, WindowHeader, Button, GroupBox, TextInput } from 'react95';
import { useZIndex } from './ZIndexContext';
import 'animate.css';

export default function Calendar() {
  const [localZIndex, setLocalZIndex] = useState(3);
  const { globalZIndex, incrementZIndex } = useZIndex();
  const [showScheduleButton, setShowScheduleButton] = useState(false);
  const [windowHeight, setWindowHeight] = useState('395px');
  const [animate, setAnimate] = useState(false);
  const [isFutureDate, setIsFutureDate] = useState(false);
  const [showEventScheduler, setShowEventScheduler] = useState(false); // State to control whether to show the event scheduler
  const [scheduleButtonClicked, setScheduleButtonClicked] = useState(false); // State to track whether the Schedule Event button has been clicked

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
  }, []);

  const handleMouseDown = () => {
    incrementZIndex();
    setLocalZIndex(globalZIndex + 1);
  };

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleYearChange = (value) => {
    setSelectedYear(parseInt(value));
    setSelectedDate(null); // Reset selectedDate when year changes
  };

  const handleDateSelect = (day) => {
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

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

    // Update window height based on the presence of a selected date
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
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        // Format hour and minute with leading zero if needed for minute
        const formattedHour = hour <= 9 ? `${hour}` : `${hour}`;
        const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        
        // Determine AM or PM based on hour
        const period = hour <
        12 ? 'AM' : 'PM';
        
        // Add the time option to the array
        timeOptions.push({ label: `${formattedHour}:${formattedMinute} ${period}`, value: `${formattedHour}:${formattedMinute} ${period}` });
      }
    }
  
    return (
      <div>
        <p>You are scheduling an event on {selectedMonth}/{selectedDate}/{selectedYear}</p>
        <GroupBox label="Event">
          <Select variant='flat' menuMaxHeight={160} width={140} style={{ marginBottom: '10px' }} options={timeOptions} />
          <TextInput variant='flat' style={{marginBottom: '10px'}} placeholder='Event name' />
          <Button variant='flat' onClick={handleSaveEvent}>Save Event</Button>
          <Button variant='flat' onClick={handleCancelEvent}>Cancel</Button>
        </GroupBox>
      </div>
    );
  };
  

  const handleSaveEvent = () => {
    // Handle save event logic here
    console.log('Event saved');
    setShowEventScheduler(false); // Hide the event scheduler after saving the event
    setScheduleButtonClicked(false); // Enable the Schedule Event button after saving the event
  };

  const handleCancelEvent = () => {
    setShowEventScheduler(false);
    setScheduleButtonClicked(false); // Enable the Schedule Event button after canceling the event
  }

  const renderCalendarDays = () => {
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
            {row.map((day, idx) => (
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
                        : 'transparent',
                  outline:
                    isCurrentMonthAndYear && day === currentDay && selectedDate === day
                      ? '2px solid pink'
                      : 'none', // Use outline instead of border
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
            ))}
          </div>
        ))}
      </>
    );
  };

  const monthOptions = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
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
              <ScrollView style={{ overflow: 'hidden', height: '220px' }}>
                {showEventScheduler ? eventScheduler() : renderCalendarDays()}
              </ScrollView>
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <Button onClick={handleScheduleEvent} disabled={!selectedDate || !isFutureDate || scheduleButtonClicked}>Schedule Event</Button>
              </div>
            </div>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}

