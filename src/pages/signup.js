import React from 'react';
import Signup from '../../components/Signup'
import Navbar from '../../components/Navbar';

const SignupPage = ({handleThemeChange, theme}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', background:theme.desktopBackground }}>
      <Navbar handleThemeChange={handleThemeChange} style={{}} />
      <div style={{ flex: 1, padding: '20px', width: '100%', maxWidth: '400px', zIndex: 0, margin: '5vw'}}>
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
