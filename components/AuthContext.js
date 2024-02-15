// authContext.js
import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [username, setUsername] = useState(''); // Add username state

  const Login = (user) => {
    setLogin(true);
    setUsername(user); // Set the username when logging in
  };

  const Logout = () => {
    setLogin(false);
    setUsername(''); // Reset the username when logging out
  };

  const value = {
    isLoggedIn,
    username, // Include username in the context value
    Login,
    Logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
