import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletData } from '../../context/WalletDataContext';
import Card from '../Card/Card';
import styles from './RecentActivity.module.css';

const RecentActivity = () => {
    const { transactions, isLoading } = useWalletData();
    const { connected } = useWallet();
    const [showAll, setShowAll] = useState(false);

    const displayedTransactions = showAll ? transactions : transactions.slice(0, 5);
    const hasMore = transactions.length > 5;

    const viewMoreButton = hasMore ? (
        <button
            className={styles.viewMoreBtn}
            onClick={() => setShowAll(!showAll)}
        >
            {showAll ? 'Show Less' : 'View More'}
        </button>
    ) : null;

    return (
        <div id="recent-activity">
            <Card title="Recent Activity" rightElement={viewMoreButton}>
                <div className={styles.activityList}>
                    {!connected ? (
                        <div className={styles.emptyState}>
                            Connect wallet to view recent activity
                        </div>
                    ) : isLoading ? (
                        <div className={styles.loadingState}>Loading transactions...</div>
                    ) : transactions.length === 0 ? (
                        <div className={styles.emptyState}>No recent transactions found</div>
                    ) : (
                        displayedTransactions.map((activity) => (
                            <div key={activity.id} className={styles.activityItem}>
                                <div className={styles.activityIcon}>
                                    {activity.type === 'Transaction' && '⇄'}
                                </div>
                                <div className={styles.activityDetails}>
                                    <div className={styles.activityType}>{activity.type}</div>
                                    <div className={styles.activitySubtext}>
                                        <a
                                            href={`https://solscan.io/tx/${activity.signature}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.txLink}
                                        >
                                            {activity.details} ↗
                                        </a>
                                    </div>
                                </div>
                                <div className={styles.activityAmount}>
                                    <div>{activity.amount}</div>
                                    <div className={styles.activityTime}>{activity.time}</div>
                                </div>
                                <div className={`${styles.activityStatus} ${activity.status === 'Success' ? styles.success : styles.failed}`}>
                                    {activity.status}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
        </div>
    );
};

export default RecentActivity;
