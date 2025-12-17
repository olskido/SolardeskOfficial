import React from 'react';
import { useToken } from '../context/TokenContext';
import styles from './DexScreenerChart.module.css';

export default function DexScreenerChart({ defaultToken }) {
    const { activeToken } = useToken();
    const token = activeToken?.pairAddress ? activeToken : defaultToken;

    if (!token?.pairAddress) {
        return (
            <div className={styles.fallback}>
                No token selected
            </div>
        );
    }

    const embedUrl = `https://dexscreener.com/${token.chain}/${token.pairAddress}?embed=1&theme=dark&trades=0&info=0`;

    return (
        <div className={styles.card}>
            <div className={styles.chartBody}>
                <iframe
                    src={embedUrl}
                    title="DexScreener Chart"
                    allowFullScreen
                />
            </div>
        </div>
    );
}
