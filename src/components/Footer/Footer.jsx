import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-content']}>
                <div className={styles['footer-section']}>
                    <h3>SolarDesk</h3>
                    <p>Your premier destination for cryptocurrency trading and portfolio management. Trade with confidence on the decentralized future.</p>
                </div>
                <div className={styles['footer-section']}>
                    <h3>Product</h3>
                    <ul className={styles['footer-links']}>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Trading</a></li>
                        <li><a href="#">Analytics</a></li>
                        <li><a href="#">Pricing</a></li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h3>Resources</h3>
                    <ul className={styles['footer-links']}>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">API</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h3>Company</h3>
                    <ul className={styles['footer-links']}>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>
                <div className={styles['footer-section']}>
                    <h3>Legal</h3>
                    <ul className={styles['footer-links']}>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles['footer-bottom']}>
                <p>&copy; 2024 SolarDesk. All rights reserved.</p>
                <div className={styles['social-links']}>
                    <a href="#">Twitter</a>
                    <a href="#">Discord</a>
                    <a href="#">Telegram</a>
                    <a href="#">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
