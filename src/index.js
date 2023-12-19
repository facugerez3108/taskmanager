import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Chakra UI
import { ChakraProvider, CSSReset, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    setDarkMode(storedDarkMode === 'true');
  }, []);

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
  };

  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App darkMode={darkMode} onDarkModeChange={handleDarkModeChange} />
      </ChakraProvider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);