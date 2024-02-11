import React from 'react';
import Login from '../../components/Login';
import Navbar from '../../components/Navbar';

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center' }}>
      <Navbar style={{}} />
      <div style={{ flex: 1, padding: '20px', width: '100%', maxWidth: '400px', zIndex: 0, margin: '5vw'}}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
