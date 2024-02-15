// pages/_app.js

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '../../components/AuthContext';
import GlobalStyles from '../styles/GlobalStyles';
import { original } from 'react95/dist/themes';
// import matrix from 'react95/dist/themes/matrix';
import { useState } from 'react';
import Navbar from '../../components/Navbar';

function App({ Component, pageProps }) {

  const [theme, setTheme] = useState(original)

  const handleThemeChange = (theme) => {
    setTheme(theme)
  }
  
  return (
    <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} handleThemeChange={handleThemeChange} />
        </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
