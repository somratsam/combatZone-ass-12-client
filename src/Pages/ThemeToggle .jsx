import React, { useState } from 'react';

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div>
      <button onClick={toggleTheme}>
        {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button>
    </div>
  );
};

export default ThemeToggle;
