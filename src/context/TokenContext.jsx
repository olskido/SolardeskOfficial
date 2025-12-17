import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    // Default to SOL/USDC for now
    const [activeToken, setActiveToken] = useState({
        symbol: 'SOL',
        chain: 'solana',
        pairAddress: '8sLbNZoVqJVM6n76tX3r9vafRselz6Rjd79Dk54jFp1' // SOL/USDC pair
    });

    return (
        <TokenContext.Provider value={{ activeToken, setActiveToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};
