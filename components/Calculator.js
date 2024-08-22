import React, { useState } from 'react';
import { Window, Button, WindowHeader, WindowContent, ScrollView } from 'react95';
import { useZIndex } from './ZIndexContext';
import { evaluate } from 'mathjs';
import Draggable from 'react-draggable';
import 'animate.css';

export default function Calculator() {
  // 1. Initialize State Variables
  const [localZIndex, setLocalZIndex] = useState(3);
  const { globalZIndex, incrementZIndex } = useZIndex();
  const [operation, setOperation] = useState(''); // Stores the operation
  const [result, setResult] = useState(''); // Stores the result
  const [hasEvaluated, setHasEvaluated] = useState(false); // Tracks if the result was just calculated
  const [backlightOn, setBacklightOn] = useState(false)

  // 2. Function to Clear Operation and Result (All Clear)
  const clearAll = () => {
    setOperation('');
    setResult('');
    setHasEvaluated(false);
  };

  // 3. Function to Append Values to Operation
  const addToOp = (value) => {
    if (hasEvaluated) {
      // If result was just evaluated, start a new operation with the result as the base
      setOperation(result + value);
      setHasEvaluated(false);
    } else {
      setOperation((prev) => prev + value);
    }
  };

  // 4. Generate Number Buttons
  const numberButtons = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)'}}>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('7')}>7</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('8')}>8</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('9')}>9</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('4')}>4</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('5')}>5</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('6')}>6</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('1')}>1</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('2')}>2</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('3')}>3</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('0')}>0</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('.')}>.</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={clearAll}>AC</Button>
      <Button style={{ width: '150px', height: '50px' }} onClick={() => setBacklightOn(prev => !prev)}>Backlight</Button>
    </div>
  );

  // 5. Add Operator Buttons
  const operatorButtons = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('+')}>+</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('-')}>-</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('*')}>x</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => addToOp('/')}>/</Button>
      <Button style={{ width: '50px', height: '50px' }} onClick={() => {
        setResult(evaluate(operation));
        setHasEvaluated(true);
      }}>=</Button>
    </div>
  );

  const handleMouseDown = () => {
    incrementZIndex();
    setLocalZIndex(globalZIndex + 1);
  };

  // 8. Render the Calculator UI
  return (
    <Draggable onMouseDown={handleMouseDown} handle=".window-header">
      <div style={{ zIndex: localZIndex, padding: '0', top: '0', right: '0' }}>
        <Window style={{ width: '200px', minWidth: '250px' }}>
          <WindowHeader className="window-header">
            <span className="Calculator_16x16_4"></span>
            {' '}Calculator.exe
          </WindowHeader>
          <WindowContent>
            <ScrollView style={{textShadow: '3px 3px 3px gray', background: backlightOn? 'cyan': 'darkgray', marginBottom:'5px'}} >
              {'Result: ' + result}
              <br></br>
              {'Operation: ' + operation}
            </ScrollView>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{numberButtons}</div>
              <div>{operatorButtons}</div>
            </div>
          </WindowContent>
        </Window>
      </div>
    </Draggable>
  );
}
