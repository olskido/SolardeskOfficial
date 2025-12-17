import React from 'react';
import { useWalletData } from '../../context/WalletDataContext';
import styles from './BalanceChart.module.css';

const BalanceChart = () => {
    const { totalValue } = useWalletData();

    return (
        <section className={styles['balance-chart']}>
            <div className={styles['balance-header']}>
                <h2 className={styles['balance-title']}>Balance Chart</h2>
                <div className={styles['up-to-date']}>
                </div>
            </div>
            <div className={styles['balance-amount']}>
                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={styles['balance-change']}>+0.00</div>
        </section>
    );
};

export default BalanceChart;
