import React from 'react';
import styles from './Header.module.css';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = () => {
    return (
        <header className={styles.header}>
            <WalletMultiButton className={styles['wallet-btn']} />
        </header>
    );
};

export default Header;
