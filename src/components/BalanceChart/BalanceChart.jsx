import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletData } from '../../context/WalletDataContext';
import styles from './BalanceChart.module.css';

const BalanceChart = () => {
    const { totalValue, pnlData } = useWalletData();
    const { publicKey } = useWallet();

    const copyAddress = () => {
        if (publicKey) {
            navigator.clipboard.writeText(publicKey.toString());
        }
    };

    const changeValue = pnlData?.change1d || 0;
    const changeDisplay = `${changeValue >= 0 ? '+' : ''}${changeValue.toFixed(2)}%`;
    const changeColor = changeValue >= 0 ? '#10b981' : '#ef4444';

    return (
        <section className={styles['balance-chart']}>
            <div className={styles['balance-content']}>
                <h2 className={styles['balance-title']}>Balance</h2>
                <div className={styles['balance-amount']}>
                    ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={styles['balance-change']} style={{ color: changeColor }}>{changeDisplay}</div>

                {publicKey && (
                    <div className={styles['wallet-address']}>
                        <span>{publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}</span>
                        <button className={styles['copy-btn']} onClick={copyAddress} title="Copy Address">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BalanceChart;
