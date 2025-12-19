import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletData } from '../../context/WalletDataContext';
import styles from './SwapOverlay.module.css';

const SwapOverlay = ({ isOpen, onClose }) => {
    const wallet = useWallet();
    const { refresh } = useWalletData();

    useEffect(() => {
        if (!isOpen || !window.Jupiter) return;

        // Use multiple RPC endpoints for fallback
        const RPC_ENDPOINTS = [
            'https://api.mainnet-beta.solana.com',
            'https://solana-api.projectserum.com',
            'https://rpc.ankr.com/solana',
        ];

        window.Jupiter.init({
            displayMode: 'integrated',
            integratedTargetId: 'jupiter-terminal-container',
            endpoint: RPC_ENDPOINTS[0],

            // Enable RPC fallback for reliability
            enableRpcFallback: true,

            // Allow all tokens
            strictTokenList: false,

            theme: 'dark',

            // Wallet passthrough
            enableWalletPassthrough: true,
            passthroughWalletContextState: wallet,

            // Callback after successful swap
            onSuccess: ({ txid }) => {
                console.log('Swap successful:', txid);
                setTimeout(refresh, 2000);
            },

            // Error handling
            onError: (error) => {
                console.error('Jupiter error:', error);
            },
        });

        return () => {
            const el = document.getElementById('jupiter-terminal-container');
            if (el) el.innerHTML = '';
        };
    }, [isOpen, wallet, refresh]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlayWrapper}>
            <div className={styles.swapCard}>
                <div className={styles.header}>
                    <span>Jupiter Swap</span>
                    <button onClick={onClose} className={styles.closeBtn}>×</button>
                </div>
                <div
                    id="jupiter-terminal-container"
                    className={styles.terminalBody}
                />
            </div>
            <div className={styles.backdrop} onClick={onClose} />
        </div>
    );
};

export default SwapOverlay;