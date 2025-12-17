import React, { useState } from 'react';
import { useWalletData } from '../../context/WalletDataContext';
import styles from './PnlGraph.module.css';

const PnlGraph = () => {
    const { totalValue } = useWalletData();
    const [timeRange, setTimeRange] = useState('7d');

    // Mock data for different time ranges
    const data = {
        '1d': { change: '+1.2%', color: '#10b981', path: 'M0,80 Q50,70 100,60 T200,50 T300,40 T400,30' },
        '3d': { change: '+3.5%', color: '#10b981', path: 'M0,80 Q50,60 100,70 T200,40 T300,50 T400,20' },
        '5d': { change: '+5.8%', color: '#10b981', path: 'M0,90 Q50,80 100,60 T200,50 T300,30 T400,10' },
        '7d': { change: '+15.2%', color: '#10b981', path: 'M0,100 Q50,90 100,70 T200,60 T300,40 T400,20' },
        '14d': { change: '+22.4%', color: '#10b981', path: 'M0,110 Q50,100 100,80 T200,70 T300,50 T400,30' },
        '30d': { change: '+45.1%', color: '#10b981', path: 'M0,120 Q50,110 100,90 T200,80 T300,60 T400,40' },
    };

    const currentData = {
        ...data[timeRange],
        amount: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    };

    return (
        <section className={styles.pnlGraph}>
            <div className={styles.header}>
                <h2 className={styles.title}>PnL</h2>
                <div className={styles.periodButtons}>
                    {['1d', '3d', '5d', '7d', '14d', '30d'].map((range) => (
                        <button
                            key={range}
                            className={timeRange === range ? styles.activePeriod : ''}
                            onClick={() => setTimeRange(range)}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.chartContainer}>
                <svg className={styles.chartSvg} viewBox="0 0 400 150" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="pnlGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: currentData.color, stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: currentData.color, stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>
                    <path d={currentData.path} stroke={currentData.color} strokeWidth="2" fill="none" />
                    <path d={`${currentData.path} L 400 150 L 0 150 Z`} fill="url(#pnlGradient)" />
                </svg>
            </div>

            <div className={styles.amount} style={{ color: currentData.color }}>{currentData.amount}</div>
            <div className={styles.change} style={{ color: currentData.color }}>{currentData.change}</div>
        </section>
    );
};

export default PnlGraph;
