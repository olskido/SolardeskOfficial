import React, { useEffect } from 'react';
import styles from './SwapOverlay.module.css';

const SwapOverlay = ({ isOpen, onClose }) => {
    useEffect(() => {
        // Only initialize if the overlay is open and script is loaded
        if (isOpen && window.Jupiter) {
            window.Jupiter.init({
                displayMode: "integrated",
                integratedTargetId: "jupiter-terminal-container",
                endpoint: "https://api.mainnet-beta.solana.com", // Replace with your own RPC for speed
                theme: 'dark',
                // Optional: Custom styling to match your neon green/dark theme
                customTheme: {
                    palette: {
                        primary: "#10b981",
                        base: "#0d1117",
                        surface: "#161b22",
                    }
                }
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlayWrapper}>
            <div className={styles.swapCard}>
                <div className={styles.header}>
                    <span className={styles.title}>Jupiter Swap</span>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>

                {/* This is where Jupiter will inject the real swap UI */}
                <div id="jupiter-terminal-container" className={styles.terminalBody}></div>
            </div>

            {/* Background blur/dimmer */}
            <div className={styles.backdrop} onClick={onClose} />
        </div>
    );
};

export default SwapOverlay;
