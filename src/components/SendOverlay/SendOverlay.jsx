import React from 'react';
import Send from '../Send/Send';
import styles from './SendOverlay.module.css';

const SendOverlay = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlayWrapper}>
            <div className={styles.sendCard}>
                <div className={styles.header}>
                    <span className={styles.title}>Send SOL</span>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.body}>
                    <Send />
                </div>
            </div>
            <div className={styles.backdrop} onClick={onClose} />
        </div>
    );
};

export default SendOverlay;
