import React, { useState, useEffect, useCallback } from 'react';
import Card from '../Card/Card';
import { useToken } from '../../context/TokenContext';
import styles from './TrendingTable.module.css';

// DexScreener API endpoints
const TOKEN_PROFILES_API = 'https://api.dexscreener.com/token-profiles/latest/v1';
const PAIRS_API = 'https://api.dexscreener.com/latest/dex/tokens/';
const REFRESH_INTERVAL = 15000; // 15 seconds

const TrendingTable = () => {
    const { setActiveToken } = useToken();
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Format price with appropriate decimals
    const formatPrice = (value) => {
        if (!value || isNaN(value)) return '$0.00';
        const num = parseFloat(value);
        if (num < 0.0001) return `$${num.toExponential(2)}`;
        if (num < 1) return `$${num.toFixed(6)}`;
        if (num < 100) return `$${num.toFixed(4)}`;
        return `$${num.toFixed(2)}`;
    };

    // Format percentage change
    const formatChange = (value) => {
        if (value === undefined || value === null || isNaN(value)) return '0.00%';
        const num = parseFloat(value);
        const sign = num >= 0 ? '+' : '';
        return `${sign}${num.toFixed(2)}%`;
    };

    const fetchTrendingTokens = useCallback(async () => {
        try {
            // Step 1: Get trending token profiles (Solana only)
            const profilesResponse = await fetch(TOKEN_PROFILES_API);
            if (!profilesResponse.ok) {
                throw new Error(`Profiles API error: ${profilesResponse.status}`);
            }

            const profiles = await profilesResponse.json();

            // Filter for Solana tokens and take first 5 to fit the table
            const solanaProfiles = profiles
                .filter(token => token.chainId === 'solana')
                .slice(0, 5);

            if (solanaProfiles.length === 0) {
                setTokens([]);
                setError(null);
                setLoading(false);
                return;
            }

            // Step 2: Fetch pair data for each token to get price, volume, liquidity
            const tokenAddresses = solanaProfiles.map(p => p.tokenAddress);

            // Batch fetch - DexScreener allows comma-separated addresses
            const pairsResponse = await fetch(`${PAIRS_API}${tokenAddresses.join(',')}`);

            if (!pairsResponse.ok) {
                throw new Error(`Pairs API error: ${pairsResponse.status}`);
            }

            const pairsData = await pairsResponse.json();
            const pairs = pairsData.pairs || [];

            // Create a map of token address to best pair (highest liquidity)
            const tokenPairMap = new Map();

            pairs.forEach(pair => {
                if (pair.chainId !== 'solana') return;

                const tokenAddress = pair.baseToken?.address;
                if (!tokenAddress) return;

                const existing = tokenPairMap.get(tokenAddress);
                const currentLiquidity = pair.liquidity?.usd || 0;
                const existingLiquidity = existing?.liquidity?.usd || 0;

                // Keep the pair with highest liquidity
                if (!existing || currentLiquidity > existingLiquidity) {
                    tokenPairMap.set(tokenAddress, pair);
                }
            });

            // Combine profile data with pair data
            const combinedTokens = solanaProfiles.map(profile => {
                const pair = tokenPairMap.get(profile.tokenAddress);

                return {
                    tokenAddress: profile.tokenAddress,
                    pairAddress: pair?.pairAddress,
                    url: profile.url || `https://dexscreener.com/solana/${profile.tokenAddress}`,
                    icon: profile.icon,
                    name: pair?.baseToken?.name || profile.description?.slice(0, 20) || 'Unknown',
                    symbol: pair?.baseToken?.symbol || profile.tokenAddress.slice(0, 6),
                    priceUsd: pair?.priceUsd,
                    priceChange: {
                        h1: pair?.priceChange?.h1,
                        h24: pair?.priceChange?.h24,
                    },
                    volume: {
                        h24: pair?.volume?.h24,
                    },
                    liquidity: {
                        usd: pair?.liquidity?.usd,
                    },
                    fdv: pair?.fdv,
                };
            });

            setTokens(combinedTokens);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch trending tokens:', err);
            setError(err.message || 'Failed to load trending tokens');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Initial fetch
        fetchTrendingTokens();

        // Set up auto-refresh
        const interval = setInterval(fetchTrendingTokens, REFRESH_INTERVAL);

        // Cleanup
        return () => clearInterval(interval);
    }, [fetchTrendingTokens]);

    const handleTokenClick = (token) => {
        if (token.pairAddress) {
            setActiveToken({
                symbol: token.symbol,
                chain: 'solana',
                pairAddress: token.pairAddress
            });
            // Scroll to chart
            document.querySelector('.balance-grid')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Card>
            <div className={styles['trending-header']}>
                <h3 className="card-title">Trending on DexScreener</h3>
                <span className={styles['change-badge']}>
                    {loading ? 'Refreshing...' : 'Live Updates'}
                </span>
            </div>

            {error ? (
                <div style={{ padding: '20px', color: '#ef4444', textAlign: 'center' }}>
                    {error}
                </div>
            ) : (
                <>
                    <div className={styles['table-header']}>
                        <div>Token</div>
                        <div>Price</div>
                        <div>1h %</div>
                        <div>24h %</div>
                    </div>

                    {loading && tokens.length === 0 ? (
                        <div style={{ padding: '20px', color: '#6b7280', textAlign: 'center' }}>
                            Loading trending tokens...
                        </div>
                    ) : (
                        tokens.map((token, index) => {
                            const priceChange1h = token.priceChange?.h1 || 0;
                            const priceChange24h = token.priceChange?.h24 || 0;

                            return (
                                <div
                                    key={token.tokenAddress || index}
                                    className={styles['table-row']}
                                    onClick={() => handleTokenClick(token)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={styles['platform-cell']}>
                                        {token.icon ? (
                                            <img
                                                src={token.icon}
                                                alt={token.symbol}
                                                className={styles['platform-icon']}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <div className={`${styles['platform-icon']} ${styles['uni-icon']}`}>
                                                {token.symbol?.charAt(0)}
                                            </div>
                                        )}
                                        <span>{token.symbol}</span>
                                    </div>
                                    <div>{formatPrice(token.priceUsd)}</div>
                                    <div className={priceChange1h >= 0 ? styles.positive : styles.negative}>
                                        {formatChange(priceChange1h)}
                                    </div>
                                    <div className={priceChange24h >= 0 ? styles.positive : styles.negative}>
                                        {formatChange(priceChange24h)}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </>
            )}
        </Card>
    );
};

export default TrendingTable;
