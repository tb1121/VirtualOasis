import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ScrollView, Select, NumberInput, Window, WindowContent, WindowHeader, Button, GroupBox, TextInput } from 'react95';
import { useZIndex } from './ZIndexContext';
import 'animate.css';
import { useAuth } from '../components/AuthContext';


export default function Calculator() {

  const [localZIndex, setLocalZIndex] = useState(3);
  const { globalZIndex, incrementZIndex } = useZIndex();
  const [numbersButtons, setNumbersButtons] = useState([])
  const [operation, setOperation] = useState('')

  const populateButtons = () => {
    const buttons = []
  for(let i = 0; i < 10; i ++){
    buttons.push(<Button onClick={() => addToOperation(i.toString())}  style={{height:'50px', width:'50px'}}>{i}</Button>)
  }
  setNumbersButtons(buttons)
}

const rows = [
  numbersButtons.slice(7, 10),
  numbersButtons.slice(4, 7),
  numbersButtons.slice(1, 4),
  numbersButtons.slice(0, 1),
];

useEffect(() => {
  populateButtons();
}, []);

  const handleMouseDown = () => {
    incrementZIndex();
    setLocalZIndex(globalZIndex + 1);
  };

  const addToOperation = (value) => {
    setOperation(prev => prev + value)
  }
    
  return (
    
    <Draggable onMouseDown={handleMouseDown} handle=".window-header">
    <div style={{ zIndex: localZIndex, padding: '0', top: '0', right: '0' }}>
    <Window style={{ width: '190px', minWidth: '130px' }}>
    <WindowHeader className="window-header">
            <span className="Calculator_16x16_4"></span>
            {' '}
            Calculator.exe
    </WindowHeader>
    <TextInput value={operation} readOnly>
      
    </TextInput>
    <div style={{ padding: '10px' }}>
            {rows.map((row, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
                {row}
              </div>
            ))}
          </div>

    </Window>
    </div>
    </Draggable>
   
  )
}