import React, { useState } from 'react';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header = ({ onMenuToggle, isMenuOpen }) => {
    return (
        <header className={styles.header}>
            <div className={styles.logoArea}>
                <button
                    className={styles.menuBtn}
                    onClick={onMenuToggle}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <WalletMultiButton className={styles['wallet-btn']} />
        </header>
    );
};

export default Header;
