import React, {useState, useContext, createContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setLogin] = useState(false);

  const Login = () => {
    setLogin(true);
  };
  const Logout =() => {
    setLogin(false);
  };
  const value = {
    isLoggedIn,
    Login,
    Logout,
  };
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext)
};

