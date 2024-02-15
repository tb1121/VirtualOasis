// import React, { useState, useContext, createContext } from 'react';
// import original from 'react95/dist/themes/original';
// import vaporTeal from  'react95/dist/themes/vaporTeal';

// const NewThemeContext = createContext();

// export const NewThemePro = ({ children }) => {
//   const [currtheme, setNewTheme] = useState();

//   const newTheme = (theme) => {
//     setNewTheme(theme);
//   };

//   const value = {
//     currtheme,
//     newTheme,
//   };

//   return <NewThemeContext.Provider value={value}>{children}</NewThemeContext.Provider>;
// };

// export const useTheme = () => {
//   const context = useContext(NewThemeContext);
//   // console.log('Theme Context:', context);
//   // if (!context) {
//   //   throw new Error('useTheme must be used within a ThemeProvider');
//   // }
//   return context;
// };
