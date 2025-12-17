import React from 'react';
import Card from '../Card/Card';
import styles from './TokenSwapCard.module.css';

const TokenSwapCard = () => {
    const menu = (
        <>
            <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '8px', height: '8px', background: '#4b5563', borderRadius: '2px' }}></div>
                <div style={{ width: '18px', height: '8px', background: '#6366f1', borderRadius: '2px' }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ width: '4px', height: '4px', background: '#ffffff', borderRadius: '50%' }}></div>
                <div style={{ width: '4px', height: '4px', background: '#ffffff', borderRadius: '50%' }}></div>
                <div style={{ width: '4px', height: '4px', background: '#ffffff', borderRadius: '50%' }}></div>
            </div>
        </>
    );

    return (
        <Card title="Token Swap" rightElement={menu}>
            <form className={styles['swap-form']}>
                <div className={styles['form-group']}>
                    <select className={styles['select-coin']} defaultValue="Select a Coin">
                        <option>Select a Coin</option>
                        <option>Bitcoin</option>
                        <option>Ethereum</option>
                        <option>Solana</option>
                    </select>
                    <input type="text" className={styles['amount-input']} defaultValue="$00.00" />
                </div>
                <button type="button" className={styles['swap-btn']}>Swap</button>
            </form>
            <div className={styles['trade-text']}>trade</div>
        </Card>
    );
};

export default TokenSwapCard;
