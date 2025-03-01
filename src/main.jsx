import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext.jsx'; // Importa el GlobalProvider
import './index.css';
import './variables.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider> {/* Envuelve la app con el contexto */}
        <App />
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
);
