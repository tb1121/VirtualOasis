import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, Button, Window, WindowHeader } from 'react95';
import Draggable from 'react-draggable';
import 'animate.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [signedUp, setSignedup] = useState(false)
  const [shaking, setShaking] = useState(false)
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
      setShaking(false)
      setSignedup(false)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
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
        setSignedup(true)
        setMessageColor(color);
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setShaking(true)
        setMessage('User already exists');
        setMessageColor('red'); // Set the color explicitly
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <Draggable handle=".draggable-handle">
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Window
          className={`animate__animated ${
          shaking ? 'animate__shakeX' : ''
          } ${signedUp ? 'animate__flip' : ''}`}
          style={{ width: 300, zIndex: 2 }}
          >
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
              <div style={{
                display: 'flex',
                flexDirection: 'row', // or 'column' for a vertical layout
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
                Signup
              </Button>
              </div>
            </form>
          </div>
        </Window>
      </div>
    </Draggable>
  );
}
