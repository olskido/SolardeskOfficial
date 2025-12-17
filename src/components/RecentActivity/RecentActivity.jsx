import React from 'react';
import Card from '../Card/Card';
import styles from './RecentActivity.module.css';

const RecentActivity = () => {
    // Mock data for recent activity
    const activities = [
        { id: 1, type: 'Swap', details: 'SOL to USDC', amount: '1.5 SOL', time: '2 mins ago', status: 'Success' },
        { id: 2, type: 'Send', details: 'To: 8x...3f9', amount: '50 USDC', time: '15 mins ago', status: 'Success' },
        { id: 3, type: 'Receive', details: 'From: 2a...9b1', amount: '0.5 SOL', time: '1 hour ago', status: 'Success' },
        { id: 4, type: 'Swap', details: 'USDC to SOL', amount: '100 USDC', time: '3 hours ago', status: 'Failed' },
        { id: 5, type: 'Stake', details: 'SOL Staking', amount: '10 SOL', time: '1 day ago', status: 'Success' },
    ];

    return (
        <div id="recent-activity">
            <Card title="Recent Activity">
                <div className={styles.activityList}>
                    {activities.map((activity) => (
                        <div key={activity.id} className={styles.activityItem}>
                            <div className={styles.activityIcon}>
                                {activity.type === 'Swap' && '⇄'}
                                {activity.type === 'Send' && '↗'}
                                {activity.type === 'Receive' && '↙'}
                                {activity.type === 'Stake' && '🔒'}
                            </div>
                            <div className={styles.activityDetails}>
                                <div className={styles.activityType}>{activity.type}</div>
                                <div className={styles.activitySubtext}>{activity.details}</div>
                            </div>
                            <div className={styles.activityAmount}>
                                <div>{activity.amount}</div>
                                <div className={styles.activityTime}>{activity.time}</div>
                            </div>
                            <div className={`${styles.activityStatus} ${activity.status === 'Success' ? styles.success : styles.failed}`}>
                                {activity.status}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default RecentActivity;
