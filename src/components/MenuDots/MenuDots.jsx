import React from 'react';
import styles from './MenuDots.module.css';

const MenuDots = () => {
    return (
        <div className={styles['menu-dots']}>
            <div className={styles['menu-dot']}></div>
            <div className={styles['menu-dot']}></div>
            <div className={styles['menu-dot']}></div>
        </div>
    );
};

export default MenuDots;
