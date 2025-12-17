import React, { createContext, useContext, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

const WalletDataContext = createContext();

export const WalletDataProvider = ({ children }) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [holdings, setHoldings] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchHoldings = async () => {
        if (!publicKey) {
            setHoldings([
                { symbol: 'SOL', name: 'Solana', balance: 0, usdValue: 0, icon: '◎', iconClass: 'sol-icon' },
                { symbol: 'USDC', name: 'USD Coin', balance: 0, usdValue: 0, icon: '$', iconClass: 'usdc-icon' },
            ]);
            setTotalValue(0);
            return;
        }

        setIsLoading(true);
        try {
            // Fetch SOL balance
            const solBalance = await connection.getBalance(publicKey);
            const solAmount = solBalance / LAMPORTS_PER_SOL;
            const solPrice = 145.50; // Mock price
            const solUsd = solAmount * solPrice;

            // Fetch SPL Token Accounts
            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
                programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
            });

            let usdcAmount = 0;
            let otherTokens = [];

            tokenAccounts.value.forEach((account) => {
                const info = account.account.data.parsed.info;
                const mint = info.mint;
                const amount = info.tokenAmount.uiAmount;

                if (amount > 0) {
                    if (mint === 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') { // USDC Mainnet
                        usdcAmount = amount;
                    } else {
                        otherTokens.push({
                            symbol: 'UNK', // Unknown without metadata
                            name: `Token ${mint.slice(0, 4)}...`,
                            balance: amount,
                            usdValue: 0, // No price feed
                            icon: '?',
                            iconClass: ''
                        });
                    }
                }
            });

            const usdcUsd = usdcAmount * 1.0; // USDC = $1

            const newHoldings = [
                {
                    symbol: 'SOL',
                    name: 'Solana',
                    balance: solAmount,
                    usdValue: solUsd,
                    icon: '◎',
                    iconClass: 'sol-icon'
                },
                {
                    symbol: 'USDC',
                    name: 'USD Coin',
                    balance: usdcAmount,
                    usdValue: usdcUsd,
                    icon: '$',
                    iconClass: 'usdc-icon'
                },
                ...otherTokens
            ];

            setHoldings(newHoldings);
            setTotalValue(solUsd + usdcUsd);

        } catch (error) {
            console.error("Error fetching holdings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHoldings();
    }, [publicKey, connection]);

    return (
        <WalletDataContext.Provider value={{ holdings, totalValue, isLoading, refresh: fetchHoldings }}>
            {children}
        </WalletDataContext.Provider>
    );
};

export const useWalletData = () => {
    const context = useContext(WalletDataContext);
    if (!context) {
        throw new Error('useWalletData must be used within a WalletDataProvider');
    }
    return context;
};
