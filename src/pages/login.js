import React from 'react';
import Login from '../../components/Login';
import Navbar from '../../components/Navbar';
import Confetti from 'react-dom-confetti';
import { useAuth } from '../../components/AuthContext';



const LoginPage = ({handleThemeChange, theme}) => {
  
  const { isLoggedIn } = useAuth();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', background:theme.desktopBackground }}>
      <Navbar handleThemeChange={handleThemeChange} style={{}} />
    
    {/* <Confetti active={ isLoggedIn } config={config} style={{ zIndex: 2000 }} /> */}

      <div style={{ flex: 1, padding: '20px', width: '100%', maxWidth: '400px', zIndex: 0, margin: '5vw'}}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
