import React, { useState } from 'react';
import Card from '../Card/Card';
import MenuDots from '../MenuDots/MenuDots';
import DexScreenerChart from '../DexScreenerChart';
import TradePanel from '../TradePanel';
import styles from './PriceChartCard.module.css';

const PriceChartCard = () => {
    const [tab, setTab] = useState('chart');

    return (
        <Card
            title={
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
            }
            rightElement={<MenuDots />}
        >
            <div className={styles.content}>
                {tab === 'chart' && <DexScreenerChart />}
                {tab === 'trade' && <TradePanel />}
            </div>
        </Card>
    );
};

export default PriceChartCard;
