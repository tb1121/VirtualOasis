import React, { useState, useEffect } from 'react';
import { Window, Button, WindowHeader, WindowContent, ScrollView } from 'react95';
import { useZIndex } from './ZIndexContext';
import { evaluate } from 'mathjs';
import Draggable from 'react-draggable';
import 'animate.css';

export default function Calculator() {
  const [localZIndex, setLocalZIndex] = useState(3);
  const { globalZIndex, incrementZIndex } = useZIndex();
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [backlightOn, setBacklightOn] = useState(false);
  const [animateButtons, setAnimateButtons] = useState(false);

  // Trigger animations when the component mounts
  useEffect(() => {
    setAnimateButtons(true);
    const timer = setTimeout(() => setAnimateButtons(false), 1000); // Remove animation classes after 1 second
    return () => clearTimeout(timer);
  }, []);

  const clearAll = () => {
    setOperation('');
    setResult('');
    setHasEvaluated(false);
  };

  const addToOp = (value) => {
    if (hasEvaluated) {
      setOperation(result + value);
      setHasEvaluated(false);
    } else {
      setOperation((prev) => prev + value);
    }
  };

  const generateButtonClass = (index) => {
    const animations = ['fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight'];
    return animateButtons ? `animate__animated animate__${animations[index % animations.length]}` : '';
  };

  const numberButtons = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 50px)' }}>
      {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map((val, index) => (
        <Button
          key={index}
          style={{ width: '50px', height: '50px' }}
          onClick={() => addToOp(val)}
          className={generateButtonClass(index)}
        >
          {val}
        </Button>
      ))}
      <Button
        style={{ width: '50px', height: '50px' }}
        onClick={clearAll}
        className={generateButtonClass(11)}
      >
        AC
      </Button>
      <Button
        style={{ width: '150px', height: '50px' }}
        onClick={() => setBacklightOn((prev) => !prev)}
        className={generateButtonClass(12)}
      >
        Backlight
      </Button>
    </div>
  );

  const operatorButtons = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {['+', '-', '*', '/'].map((op, index) => (
        <Button
          key={index}
          style={{ width: '50px', height: '50px' }}
          onClick={() => addToOp(op)}
          className={generateButtonClass(index)}
        >
          {op}
        </Button>
      ))}
      <Button
        style={{ width: '50px', height: '50px' }}
        onClick={() => {
          setResult(evaluate(operation));
          setHasEvaluated(true);
        }}
        className={generateButtonClass(8)}
      >
        =
      </Button>
    </div>
  );

  const handleMouseDown = () => {
    incrementZIndex();
    setLocalZIndex(globalZIndex + 1);
  };

  return (
    <Draggable onMouseDown={handleMouseDown} handle=".window-header">
      <div style={{ zIndex: localZIndex, padding: '0', top: '0', right: '0' }}>
        <Window style={{ width: '200px', minWidth: '250px' }}>
          <WindowHeader className="window-header">
            <span className="Calculator_16x16_4"></span>
            {' '}Calculator.exe
          </WindowHeader>
          <WindowContent>
            <ScrollView style={{ textShadow: '3px 3px 3px gray', background: backlightOn ? 'cyan' : 'darkgray', marginBottom: '5px' }}>
              {'Result: ' + result}
              <br />
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
