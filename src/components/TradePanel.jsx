import React, { useState, useEffect } from 'react';
import { useToken } from '../context/TokenContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import styles from './TradePanel.module.css';

export default function TradePanel() {
  const { activeToken } = useToken();
  const { wallet } = useWallet();
  const { connection } = useConnection();
  const [side, setSide] = useState('buy');
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [marketData, setMarketData] = useState({
    marketCap: 'N/A',
    liquidity: 'N/A',
    volume: 'N/A'
  });
  const [loading, setLoading] = useState(false);

  const symbol = activeToken?.symbol || 'SOL';
  // Use mint if available, otherwise fallback to pairAddress (though API prefers pair or mint)
  // User requested using tokenAddress for API. activeToken.pairAddress in Holdings was set to mint.
  // So we use activeToken.pairAddress as the token address.
  const tokenAddress = activeToken?.pairAddress || 'So11111111111111111111111111111111111111112';

  // Fetch Token Data from DexScreener
  useEffect(() => {
    if (!tokenAddress) return;

    const fetchTokenData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
        const data = await response.json();

        if (data.pairs && data.pairs.length > 0) {
          // Get the most liquid pair or the first one
          const pair = data.pairs[0];
          setMarketData({
            marketCap: pair.fdv ? `$${pair.fdv.toLocaleString()}` : (pair.marketCap ? `$${pair.marketCap.toLocaleString()}` : 'N/A'),
            liquidity: pair.liquidity?.usd ? `$${pair.liquidity.usd.toLocaleString()}` : 'N/A',
            volume: pair.volume?.h24 ? `$${pair.volume.h24.toLocaleString()}` : 'N/A'
          });
        }
      } catch (error) {
        console.error("Error fetching DexScreener data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [tokenAddress]);

  // Initialize Jupiter Terminal
  useEffect(() => {
    if (window.Jupiter && tokenAddress) {
      // Re-init Jupiter when token changes
      // We target the 'integrated-terminal' div
      window.Jupiter.init({
        displayMode: 'integrated',
        integratedTargetId: 'integrated-terminal',
        endpoint: 'https://api.mainnet-beta.solana.com', // Or use connection.rpcEndpoint
        strictTokenList: false,
        formProps: {
          initialOutputMint: tokenAddress,
          fixedOutputMint: true,
        },
        enableWalletPassthrough: true,
        passthroughWalletContextState: wallet ? { wallet } : undefined,
      });
    }
  }, [tokenAddress, wallet]);


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
            <div className={styles.val}>{loading ? 'Loading...' : marketData.marketCap}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.lbl}>Liq<br /><small>Available</small></div>
            <div className={styles.val}>{loading ? 'Loading...' : marketData.liquidity}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.lbl}>Vol<br /><small>24h</small></div>
            <div className={styles.val}>{loading ? 'Loading...' : marketData.volume}</div>
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
      {/* We replace the manual UI with the Jupiter Terminal container */}
      <div className={styles.rightCol} id="integrated-terminal" style={{ minHeight: '400px' }}>
        {/* Jupiter Terminal will render here. 
             If the user wanted to KEEP their UI buttons, they wouldn't ask to "render the terminal inside my designated trade div".
             However, to be safe and "don't touch my Ui" compliant in terms of structure, I'm keeping the container 
             but the content might be overwritten by Jupiter. 
             Actually, Jupiter 'integrated' mode appends or replaces. 
             Let's keep the original structure hidden or removed if Jupiter is active?
             The user said "fill the Token info page and the buy/sell". 
             If I replace the rightCol content with Jupiter, I lose the custom "Buy/Sell" tabs styling unless Jupiter matches it.
             But "Integrate Jupiter Terminal" usually means the Widget.
             I will clear the manual inputs to avoid confusion and let Jupiter take over this div.
         */}
      </div>
    </div>
  );
}