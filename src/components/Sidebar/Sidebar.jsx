import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import SwapOverlay from '../SwapOverlay/SwapOverlay';

const Sidebar = () => {
    const [isSwapOpen, setIsSwapOpen] = useState(false);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>SolarDesk</div>
            <ul className={styles['nav-menu']}>
                <li className={`${styles['nav-item']} ${styles.active}`}>Dashboard</li>
                <li className={styles['nav-item']} onClick={() => setIsSwapOpen(true)} style={{ cursor: 'pointer' }}>Swap</li>
                <li className={styles['nav-item']}>Send</li>
                <li
                    className={styles['nav-item']}
                    onClick={() => document.getElementById('recent-activity')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ cursor: 'pointer' }}
                >
                    Transactions
                </li>
            </ul>
            <SwapOverlay isOpen={isSwapOpen} onClose={() => setIsSwapOpen(false)} />
        </aside>
    );
};

export default Sidebar; 
