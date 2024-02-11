import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, Button, Window, WindowHeader, GroupBox } from 'react95';
import Draggable from 'react-draggable';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input here before making the API call
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    await handleData();

    // Reset form fields after submission
    setUsername('');
    setPassword('');
  };

  const handleData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log(response);
        const data = await response.json();
        const color = data.message === 'Signup successful!' ? 'green' : 'red';
        setMessage(data.message === 'Signup successful!' ? data.message : 'Error signing up');
        setMessageColor(color);
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setMessage('Error signing up');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <Draggable handle=".draggable-handle">
      <GroupBox style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Window style={{ width: 300, zIndex: 2 }}>
          <WindowHeader className="draggable-handle">Please Signup!</WindowHeader>
          <div className="border p-6 flex flex-col items-center rounded">
            {message && <p style={{ color: messageColor }}>{message}</p>}
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Username:
                <TextInput
                  className="border p-2 w-full rounded"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <label className="block mb-2">
                Password:
                <TextInput
                  className="border p-2 w-full rounded"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <Button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
                Signup
              </Button>
            </form>
          </div>
        </Window>
      </GroupBox>
    </Draggable>
  );
}
