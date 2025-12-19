import React from 'react';
import styles from './Footer.module.css';
import { Twitter, Github, Send, MessageSquare } from 'lucide-react';

const Footer = () => {
    const writeups = [
        "The ultimate terminal for Solana traders — rebuilt for speed and clarity.",
        "Real-time analytics, lightning-fast execution, zero clutter.",
        "Track $SOL gems, smart wallets, and market moves in one desk.",
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>

                {/* Top Row */}
                <div className={styles.topSection}>

                    {/* Logo + Text */}
                    <div className={styles.leftBlock}>
                        <img
                            src="/logo.png"
                            alt="SolarDesk Logo"
                            className={styles.logo}
                        />

                        <div className={styles.writeup}>
                            {writeups.map((text, i) => (
                                <p key={i}>{text}</p>
                            ))}
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className={styles.socialLinks}>
                        <a href="https://www.x.com/olskiddo" title="X (Twitter)"><Twitter size={22} /></a>
                        <a href="https://www.t.me/olskido" title="Telegram"><Send size={22} /></a>
                        <a href="https://www.discord.com/olskido" title="Discord"><MessageSquare size={22} /></a>
                        <a href="https://github.com/olskido" title="GitHub"><Github size={22} /></a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p>© 2025 Powered by Solana.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
