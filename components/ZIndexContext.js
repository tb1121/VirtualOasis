// ZIndexContext.js
import React, { createContext, useContext, useState } from 'react';

const ZIndexContext = createContext();

export const ZIndexProvider = ({ children }) => {
  const [globalZIndex, setGlobalZIndex] = useState(3);

  const incrementZIndex = () => {
    setGlobalZIndex(prevZIndex => prevZIndex + 5);
  };

  return (
    <ZIndexContext.Provider value={{ globalZIndex, incrementZIndex }}>
      {children}
    </ZIndexContext.Provider>
  );
};

export const useZIndex = () => useContext(ZIndexContext);
