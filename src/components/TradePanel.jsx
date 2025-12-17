import { useState } from 'react';
import { useToken } from '../context/TokenContext';
import styles from './TradePanel.module.css';

const TradePanel = () => {
    const { activeToken } = useToken();
    const [side, setSide] = useState('buy');
    const [amount, setAmount] = useState('');

    // Placeholder copy function
    const copyToClipboard = () => {
        navigator.clipboard.writeText(activeToken.address);
        alert('Contract address copied!');
    };

    return (
        <div className={styles.container}>
            {/* LEFT: Trade Form (50%) */}
            <div className={styles.tradeSection}>
                <div className={styles.toggle}>
                    <button
                        className={side === 'buy' ? styles.buyActive : ''}
                        onClick={() => setSide('buy')}
                    >
                        Buy
                    </button>
                    <button
                        className={side === 'sell' ? styles.sellActive : ''}
                        onClick={() => setSide('sell')}
                    >
                        Sell
                    </button>
                </div>

                <div className={styles.form}>
                    <label className={styles.label}>Amount ({activeToken.symbol})</label>
                    <input
                        type="number"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={styles.input}
                    />

                    <div className={styles.presets}>
                        <button onClick={() => setAmount('0.01')}>0.01</button>
                        <button onClick={() => setAmount('0.1')}>0.1</button>
                        <button onClick={() => setAmount('1')}>1</button>
                        <button onClick={() => setAmount('10')}>10</button>
                    </div>

                    <button
                        className={side === 'buy' ? styles.buyBtn : styles.sellBtn}
                    >
                        {side === 'buy' ? `Buy ${activeToken.symbol}` : `Sell ${activeToken.symbol}`}
                    </button>
                </div>
            </div>

            {/* RIGHT: Token Info Panel (50%) */}
            <div className={styles.infoSection}>
                <h3 className={styles.infoTitle}>Token Info</h3>

                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span>Market Cap</span>
                        <strong>${activeToken.marketCap || 'N/A'}</strong>
                    </div>
                    <div className={styles.infoItem}>
                        <span>Liquidity</span>
                        <strong>${activeToken.liquidity || 'N/A'}</strong>
                    </div>
                    <div className={styles.infoItem}>
                        <span>24h Volume</span>
                        <strong>${activeToken.volume24h || 'N/A'}</strong>
                    </div>
                    <div className={styles.infoItem}>
                        <span>24h Buys / Sells</span>
                        <strong>
                            {activeToken.buys24h || 0} / {activeToken.sells24h || 0}
                        </strong>
                    </div>
                </div>

                <div className={styles.contractRow}>
                    <span>Contract Address</span>
                    <div className={styles.contractActions}>
                        <a
                            href={`https://solscan.io/token/${activeToken.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contractLink}
                        >
                            {activeToken.address?.slice(0, 8)}...{activeToken.address?.slice(-6)}
                        </a>
                        <button onClick={copyToClipboard} className={styles.copyBtn}>
                            📋 Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradePanel;