import React from 'react';
import { useToken } from '../context/TokenContext';
import styles from './DexScreenerChart.module.css';

const DexScreenerChart = ({ defaultToken }) => {
    const { activeToken } = useToken();

    const token = activeToken?.pairAddress ? activeToken : defaultToken;

    if (!token || !token.pairAddress) {
        return (
            <div className={styles.fallback}>
                <p>No token selected. Set a default token or use the token context.</p>
            </div>
        );
    }

    const embedUrl = `https://dexscreener.com/${token.chain}/${token.pairAddress}?embed=1&theme=dark&info=0`;

    return (
        <div className={styles.container}>
            <iframe
                src={embedUrl}
                title="DexScreener Chart"
                className={styles.iframe}
                allowFullScreen
                frameBorder="0"
            />
        </div>
    );
};

export default DexScreenerChart;