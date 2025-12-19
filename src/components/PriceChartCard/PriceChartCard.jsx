import React from 'react';
import DexScreenerChart from '../DexScreenerChart';
import styles from './PriceChartCard.module.css';

const PriceChartCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <DexScreenerChart />
            </div>
        </div>
    );
};

export default PriceChartCard;
