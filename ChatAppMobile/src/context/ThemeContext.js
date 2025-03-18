import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    colors: isDarkMode ? {
      background: '#121212',
      text: '#ffffff',
      primary: '#2196F3',
      input: '#333333',
      border: '#444444'
    } : {
      background: '#ffffff',
      text: '#000000',
      primary: '#2196F3',
      input: '#ffffff',
      border: '#dddddd'
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);