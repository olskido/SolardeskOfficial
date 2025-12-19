import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletData } from '../../context/WalletDataContext';
import Card from '../Card/Card';
import styles from './RecentActivity.module.css';

const RecentActivity = () => {
    const { transactions, isLoading } = useWalletData();
    const { connected } = useWallet();
    const [showAll, setShowAll] = useState(false);

    const displayed = showAll
        ? transactions
        : transactions.slice(0, 5);

    return (
        <Card
            title="Recent Activity"
            rightElement={
                transactions.length > 5 && (
                    <button
                        className={styles.viewMoreBtn}
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'Show Less' : 'View More'}
                    </button>
                )
            }
        >
            <div className={styles.activityList}>
                {!connected ? (
                    <div className={styles.emptyState}>
                        Connect wallet to view activity
                    </div>
                ) : isLoading ? (
                    <div className={styles.loadingState}>
                        Loading transactions...
                    </div>
                ) : transactions.length === 0 ? (
                    <div className={styles.emptyState}>
                        No transactions found
                    </div>
                ) : (
                    displayed.map((tx) => (
                        <div
                            key={tx.signature}
                            className={styles.activityItem}
                        >
                            <div className={styles.activityIcon}>⇄</div>

                            <div className={styles.activityDetails}>
                                <div className={styles.activityType}>
                                    {tx.type}
                                </div>
                                <a
                                    href={`https://solscan.io/tx/${tx.signature}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.txLink}
                                >
                                    {tx.details} ↗
                                </a>
                            </div>

                            <div className={styles.activityAmount}>
                                <div>{tx.amount}</div>
                                <div className={styles.activityTime}>
                                    {tx.time}
                                </div>
                            </div>

                            <div
                                className={`${styles.activityStatus} ${tx.status === 'Success'
                                    ? styles.success
                                    : styles.failed
                                    }`}
                            >
                                {tx.status}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    );
};

export default RecentActivity;
