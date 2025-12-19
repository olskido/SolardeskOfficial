import React, { useMemo } from 'react';
import {
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import { WalletDataProvider } from '../context/WalletDataContext';
import { RPC_ENDPOINT } from '../config/rpc';

import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletContextProvider = ({ children }) => {
    const endpoint = useMemo(() => RPC_ENDPOINT, []);

    // Wallet Standard auto-detects Phantom, Solflare, etc.
    const wallets = useMemo(() => [], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <WalletDataProvider>
                        {children}
                    </WalletDataProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
