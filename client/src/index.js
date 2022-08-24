import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { UserProvider } from './context/user';
import theme from './context/theme';

// document.body.style = 'background: #fff;';

// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
