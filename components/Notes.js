import React from 'react';
import Draggable from 'react-draggable';
import { Window, ScrollView, WindowContent, WindowHeader, TextInput } from 'react95';

export default function Notes() {
  return (
    <Draggable>
      <Window>
        <WindowHeader>Notes.exe</WindowHeader>
        <WindowContent>
          <ScrollView style={{ width: '100%', height: '200px' }}>
            <div>
              <TextInput style={{ width: '100%', height: '300px' }} multiline>
                {/* Additional props like "multiline" enable multiple lines */}
              </TextInput>
            </div>
          </ScrollView>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
