import React, { useState } from 'react';
import { useToken } from '../context/TokenContext';
import styles from './TradePanel.module.css';

export default function TradePanel() {
  const { activeToken } = useToken();
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('market');

  const symbol = activeToken?.symbol || 'smlnem';

  return (
    <div className={styles.tradeCard}>
      {/* LEFT SECTION: TOKEN DATA */}
      <div className={styles.leftCol}>
        <div className={styles.header}>
          <span className={styles.dot}></span> Token Info
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.row}>
            <div className={styles.lbl}>MCap<br /><small>Real-time</small></div>
            <div className={styles.val}>$N/A</div>
          </div>
          <div className={styles.row}>
            <div className={styles.lbl}>Liq<br /><small>Available</small></div>
            <div className={styles.val}>$N/A</div>
          </div>
          <div className={styles.row}>
            <div className={styles.lbl}>Vol<br /><small>24h</small></div>
            <div className={styles.val}>$N/A</div>
          </div>
        </div>

        <button className={styles.contractBtn}>
          Contract <span>Copy</span>
        </button>

        <div className={styles.footerStats}>
          <div><span>Bot</span><b>≡ 0</b></div>
          <div><span>Sold</span><b className={styles.red}>≡ 0</b></div>
        </div>
      </div>

      <div className={styles.divider}></div>

      {/* RIGHT SECTION: TRADE ACTIONS */}
      <div className={styles.rightCol}>
        <div className={styles.toggleRow}>
          <button className={side === 'buy' ? styles.buyActive : ''} onClick={() => setSide('buy')}>Buy</button>
          <button className={side === 'sell' ? styles.sellActive : ''} onClick={() => setSide('sell')}>Sell</button>
        </div>

        <div className={styles.tabs}>
          <span className={orderType === 'market' ? styles.tabOn : ''} onClick={() => setOrderType('market')}>Market</span>
          <span onClick={() => setOrderType('limit')}>Limit</span>
          <span className={styles.price}>$N/A</span>
        </div>

        <input
          className={styles.miniInput}
          type="number"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className={styles.quickBtns}>
          {[0.01, 1, 10].map(v => (
            <button key={v} onClick={() => setAmount(v.toString())}>{v}</button>
          ))}
        </div>

        <div className={styles.microInfo}>
          <span>⚡ 20%</span>
          <span className={styles.warn}>⚠ 0.001</span>
          <span className={styles.off}>⊘ Off</span>
        </div>

        <button className={`${styles.submitBtn} ${side === 'sell' ? styles.bgRed : ''}`}>
          {side === 'buy' ? `Buy ${symbol}` : `Sell ${symbol}`}
        </button>

        <div className={styles.footerStats}>
          <div><span>Hold</span><b>≡ 0</b></div>
          <div><span>PnL</span><b className={styles.green}>+0%</b></div>
        </div>
      </div>
    </div>
  );
}