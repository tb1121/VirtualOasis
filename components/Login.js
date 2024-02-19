import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';
import { TextInput, Button, Window, WindowHeader, Hourglass } from 'react95';
import Draggable from 'react-draggable';
import Confetti from 'react-dom-confetti';
import 'animate.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [shaking, setShaking] = useState(false);
  const { Login, isLoggedIn } = useAuth();
  const router = useRouter();

  // Function to handle the submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call your data handling function here
    await handleData();
  };

  const handleData = async () => {
    setShaking(false);
    // Set response to make a request to the backend, sending username and password in req.body
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Handle the response from the backend
    const data = await response.json();

    // Determine the color based on the message content
    const color = data.message === 'Login successful' ? 'green' : 'red';

    if (data.message === 'Login successful') {
      setMessage('Login Successful!');
      Login(username);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      setMessage(data.message);
      setShaking(true)
    }

    // Set the message color
    setMessageColor(color);
  };

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

  return (
    <Draggable handle=".draggable-handle">
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Window className={`animate__animated ${shaking ? 'animate__shakeX' : ''}`} style={{ width: 300, zIndex: 2 }}>
          <WindowHeader className="draggable-handle">Please Login!</WindowHeader>
          <div className="border p-6 flex flex-col items-center rounded" style={{ position: 'relative' }}>
            {message && <p style={{ color: messageColor }}>{message}</p>}
            {isLoggedIn && <Hourglass size={32} style={{ margin: 20 }} />}
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
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Confetti active={isLoggedIn} config={config} style={{ zIndex: 2000 }} />
              </div>
              <Button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
                Login
              </Button>
            </form>
          </div>
        </Window>
      </div>
    </Draggable>
  );
}
