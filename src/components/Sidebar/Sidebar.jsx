import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>SolarDesk</div>
            <ul className={styles['nav-menu']}>
                <li className={`${styles['nav-item']} ${styles.active}`}>Dashboard</li>
                <li className={styles['nav-item']}>Swap</li>
                <li className={styles['nav-item']}>Send</li>
                <li
                    className={styles['nav-item']}
                    onClick={() => document.getElementById('recent-activity')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ cursor: 'pointer' }}
                >
                    Transactions
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar; 
