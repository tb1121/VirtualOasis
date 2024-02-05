import React, { useState } from 'react';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')

  // Function to handle the submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call your data handling function here
    await handleData();
  };

  const handleData = async () => {
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
    setMessage(data.message === 'Login successful' ? data.message : 'Invalid Username or Password');
  };

  return (
    <div className='border p-6 max-w-md mx-auto my-8 flex flex-col items-center rounded'>
      <h2 className='text-xl mb-4'>Please Login here:</h2>
      {message && <p className='text-red-500'>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className='block mb-2'>
          Username:
          <input className='border p-2 w-full rounded' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className='block mb-2'>
          Password:
          <input className='border p-2 w-full rounded' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className='bg-blue-500 text-white p-2 rounded w-full' type="submit">
          Login
        </button>
      </form>
    </div>
  );
}