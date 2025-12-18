import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

const WalletDataContext = createContext();

export const WalletDataProvider = ({ children }) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [holdings, setHoldings] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [balanceHistory, setBalanceHistory] = useState([]);
    const [pnlData, setPnlData] = useState({
        change1d: 0,
        change7d: 0,
        change30d: 0,
        isPositive: true
    });
    const initialBalanceRef = useRef(null);

    const fetchHoldings = async () => {
        if (!publicKey) {
            setHoldings([
                { symbol: 'SOL', name: 'Solana', balance: 0, usdValue: 0, icon: '◎', iconClass: 'sol-icon', mint: 'So11111111111111111111111111111111111111112' },
                { symbol: 'USDC', name: 'USD Coin', balance: 0, usdValue: 0, icon: '$', iconClass: 'usdc-icon', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' },
            ]);
            setTransactions([]);
            setTotalValue(0);
            setBalanceHistory([]);
            setPnlData({ change1d: 0, change7d: 0, change30d: 0, isPositive: true });
            initialBalanceRef.current = null;
            return;
        }

        setIsLoading(true);
        try {
            // Fetch SOL balance
            const solBalance = await connection.getBalance(publicKey);
            const solAmount = solBalance / LAMPORTS_PER_SOL;

            // Fetch SOL price from Jupiter
            let solPrice = 145.50; // Fallback
            try {
                const priceRes = await fetch('https://price.jup.ag/v4/price?ids=SOL');
                const priceData = await priceRes.json();
                if (priceData.data?.SOL?.price) {
                    solPrice = priceData.data.SOL.price;
                }
            } catch (e) {
                console.warn('Failed to fetch SOL price, using fallback');
            }

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
                    if (mint === 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') {
                        usdcAmount = amount;
                    } else {
                        otherTokens.push({
                            symbol: 'UNK',
                            name: `Token ${mint.slice(0, 4)}...`,
                            balance: amount,
                            usdValue: 0,
                            icon: '?',
                            iconClass: '',
                            mint: mint
                        });
                    }
                }
            });

            const usdcUsd = usdcAmount * 1.0;
            const newTotalValue = solUsd + usdcUsd;

            const newHoldings = [
                {
                    symbol: 'SOL',
                    name: 'Solana',
                    balance: solAmount,
                    usdValue: solUsd,
                    icon: '◎',
                    iconClass: 'sol-icon',
                    mint: 'So11111111111111111111111111111111111111112'
                },
                {
                    symbol: 'USDC',
                    name: 'USD Coin',
                    balance: usdcAmount,
                    usdValue: usdcUsd,
                    icon: '$',
                    iconClass: 'usdc-icon',
                    mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
                },
                ...otherTokens
            ];

            setHoldings(newHoldings);
            setTotalValue(newTotalValue);

            // Track balance history for PnL
            const timestamp = Date.now();
            setBalanceHistory(prev => {
                const newHistory = [...prev, { value: newTotalValue, timestamp }];
                // Keep last 30 days of data (max 1000 entries)
                return newHistory.slice(-1000);
            });

            // Calculate PnL
            if (initialBalanceRef.current === null && newTotalValue > 0) {
                initialBalanceRef.current = newTotalValue;
            }

            if (initialBalanceRef.current && initialBalanceRef.current > 0) {
                const changePercent = ((newTotalValue - initialBalanceRef.current) / initialBalanceRef.current) * 100;
                setPnlData({
                    change1d: changePercent,
                    change7d: changePercent,
                    change30d: changePercent,
                    isPositive: changePercent >= 0
                });
            }

            // Fetch Transactions
            const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 20 });
            const formattedTransactions = signatures.map((sig, index) => ({
                id: index,
                type: 'Transaction',
                details: `${sig.signature.slice(0, 4)}...${sig.signature.slice(-4)}`,
                amount: '-',
                time: new Date(sig.blockTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: sig.err ? 'Failed' : 'Success',
                signature: sig.signature
            }));
            setTransactions(formattedTransactions);

        } catch (error) {
            console.error("Error fetching holdings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHoldings();
    }, [publicKey, connection]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        if (!publicKey) return;
        const interval = setInterval(fetchHoldings, 30000);
        return () => clearInterval(interval);
    }, [publicKey, connection]);

    return (
        <WalletDataContext.Provider value={{
            holdings,
            transactions,
            totalValue,
            isLoading,
            balanceHistory,
            pnlData,
            refresh: fetchHoldings
        }}>
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
