import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Button, ScrollView, TextInput, Window, WindowContent, WindowHeader, NumberInput } from 'react95';
import { useZIndex } from './ZIndexContext';
import 'animate.css'

export default function Calendar() {
  const [localZIndex, setLocalZIndex] = useState(3);
  const { globalZIndex, incrementZIndex } = useZIndex();

  return (
    <Window>
      <WindowHeader>
      <span className="FilePen_16x16_4"></span>
            {' '}Calendar.exe
        <ScrollView>
          <div>
            this div needs to have S,M,T,W,T,F,S, and a light gray background along with all of the calendar numbers
          </div>
        </ScrollView>
      </WindowHeader>
    </Window>
  )
  
}



