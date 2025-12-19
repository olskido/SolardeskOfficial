import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import SwapOverlay from '../SwapOverlay/SwapOverlay';
import SendOverlay from '../SendOverlay/SendOverlay';

const Sidebar = ({ isOpen, onClose }) => {
    const [isSwapOpen, setIsSwapOpen] = useState(false);
    const [isSendOpen, setIsSendOpen] = useState(false);

    return (
        <>
            {/* Backdrop overlay for click-outside-to-close */}
            {isOpen && <div className={styles.backdrop} onClick={onClose} />}

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.logo}>
                    <img src="/logo.png" alt="SolarDesk Logo" className={styles.logoImg} />
                    SolarDesk
                </div>
                <ul className={styles['nav-menu']}>
                    <li className={`${styles['nav-item']} ${styles.active}`} onClick={onClose}>Dashboard</li>
                    <li className={styles['nav-item']} onClick={() => { setIsSwapOpen(true); onClose?.(); }} style={{ cursor: 'pointer' }}>Swap</li>
                    <li className={styles['nav-item']} onClick={() => { setIsSendOpen(true); onClose?.(); }} style={{ cursor: 'pointer' }}>Send</li>
                    <li
                        className={styles['nav-item']}
                        onClick={() => { document.getElementById('recent-activity')?.scrollIntoView({ behavior: 'smooth' }); onClose?.(); }}
                        style={{ cursor: 'pointer' }}
                    >
                        Transactions
                    </li>
                </ul>
                <SwapOverlay isOpen={isSwapOpen} onClose={() => setIsSwapOpen(false)} />
                <SendOverlay isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} />
            </aside>
        </>
    );
};

export default Sidebar;

