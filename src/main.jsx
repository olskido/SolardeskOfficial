import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { WalletContextProvider } from './contexts/WalletContextProvider';
import { TokenProvider } from './context/TokenContext';

import { WalletDataProvider } from './context/WalletDataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletContextProvider>
      <TokenProvider>
        <WalletDataProvider>
          <App />
        </WalletDataProvider>
      </TokenProvider>
    </WalletContextProvider>
  </React.StrictMode>,
)
