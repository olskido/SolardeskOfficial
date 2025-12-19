import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { WalletContextProvider } from './contexts/WalletContextProvider';
import { WalletDataProvider } from './context/WalletDataContext';
import { TokenProvider } from './context/TokenContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletContextProvider>
      <WalletDataProvider>
        <TokenProvider>
          <App />
        </TokenProvider>
      </WalletDataProvider>
    </WalletContextProvider>
  </React.StrictMode>
);