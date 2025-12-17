import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, rightElement, children, className = '' }) => {
    return (
        <div className={`${styles.card} ${className}`}>
            {(title || rightElement) && (
                <div className={styles['card-header']}>
                    {title && <h3 className={styles['card-title']}>{title}</h3>}
                    {rightElement && <div className={styles['card-menu']}>{rightElement}</div>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
