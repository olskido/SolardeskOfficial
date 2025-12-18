import React, { useState, useMemo } from 'react';
import { useWalletData } from '../../context/WalletDataContext';
import styles from './PnlGraph.module.css';

const PnlGraph = () => {
    const { totalValue, pnlData, balanceHistory } = useWalletData();
    const [timeRange, setTimeRange] = useState('7d');

    // Generate SVG path from balance history
    const generatePath = useMemo(() => {
        if (balanceHistory.length < 2) {
            // Default upward line when no history
            return 'M0,100 Q50,90 100,70 T200,60 T300,40 T400,20';
        }

        const points = balanceHistory.slice(-50); // Last 50 data points
        const minVal = Math.min(...points.map(p => p.value));
        const maxVal = Math.max(...points.map(p => p.value));
        const range = maxVal - minVal || 1;

        const pathPoints = points.map((point, i) => {
            const x = (i / (points.length - 1)) * 400;
            const y = 150 - ((point.value - minVal) / range) * 130;
            return `${x},${y}`;
        });

        return `M${pathPoints.join(' L')}`;
    }, [balanceHistory]);

    const changePercent = pnlData.change7d;
    const isPositive = changePercent >= 0;
    const color = isPositive ? '#10b981' : '#ef4444';

    const currentData = {
        change: `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`,
        color: color,
        path: generatePath,
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
