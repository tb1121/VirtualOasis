// authContext.js
import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [username, setUsername] = useState(''); // Add username state
  const [stopMusic, setStopMusic] = useState(false);

  const Login = (user) => {
    setLogin(true);
    setUsername(user); // Set the username when logging in
  };

  const Logout = () => {
    setStopMusic(true);
    setTimeout(() => {
      setLogin(false);
    },1000)
    setUsername(''); // Reset the username when logging out
  };

  const value = {
    isLoggedIn,
    username, // Include username in the context value
    Login,
    Logout,
    stopMusic,
    setStopMusic,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
