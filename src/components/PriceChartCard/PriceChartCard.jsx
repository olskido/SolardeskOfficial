import React, { useState } from 'react';
import DexScreenerChart from '../DexScreenerChart';
import TradePanel from '../TradePanel';
import styles from './PriceChartCard.module.css';

const PriceChartCard = () => {
    const [tab, setTab] = useState('chart');

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${tab === 'chart' ? styles.active : ''}`}
                        onClick={() => setTab('chart')}
                    >
                        Chart
                    </button>
                    <button
                        className={`${styles.tab} ${tab === 'trade' ? styles.active : ''}`}
                        onClick={() => setTab('trade')}
                    >
                        Trade
                    </button>
                </div>
            </div>
            <div className={styles.content}>
                {tab === 'chart' && <DexScreenerChart />}
                {tab === 'trade' && <TradePanel />}
            </div>
        </div>
    );
};

export default PriceChartCard;
