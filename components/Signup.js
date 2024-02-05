import React, { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
        console.log(response)
        const data = await response.json();
        setMessage(data.message === 'Signup successful!' ? data.message : 'Error signing up');
      } else {
        setMessage('Error signing up');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Internal Server Error');
    }
  };

  return (
    <div className='border p-6 max-w-md mx-auto my-8 flex flex-col items-center rounded'>
      <h2 className='text-xl mb-4'>Signup:</h2>
      {message && <p className={message === 'Signup successful!' ? 'text-green-500' : 'text-red-500'}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className='block mb-2'>
          Username:
          <input
            className='border p-2 w-full rounded'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className='block mb-2'>
          Password:
          <input
            className='border p-2 w-full rounded'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className='bg-blue-500 text-white p-2 rounded w-full' type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
