import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletData } from '../../context/WalletDataContext';
import Card from '../Card/Card';
import styles from './Holdings.module.css';

const Holdings = () => {
    const { publicKey } = useWallet();
    const { holdings, totalValue } = useWalletData();

    return (
        <Card title="Holdings">
            {publicKey && <div className={styles['total-value']}>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>}
            <div className={styles['holdings-list']}>
                {holdings.map((token) => (
                    <div key={token.symbol} className={styles['token-item']}>
                        <div className={styles['token-info']}>
                            <div className={`${styles['token-icon']} ${styles[token.iconClass] || ''}`}>
                                {token.icon}
                            </div>
                            <div className={styles['token-details']}>
                                <span className={styles['token-symbol']}>{token.symbol}</span>
                                <span className={styles['token-name']}>{token.name}</span>
                            </div>
                        </div>
                        <div className={styles['token-balance']}>
                            <span className={styles['balance-amount']}>
                                {token.balance.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                            </span>
                            <span className={styles['balance-usd']}>
                                ${token.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Holdings;
