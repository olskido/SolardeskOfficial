import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { toast } from 'react-toastify';
import styles from './Send.module.css';

const Send = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, connected } = useWallet();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);

    // Fetch balance on mount and when publicKey changes
    React.useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey && connection) {
                try {
                    const bal = await connection.getBalance(publicKey);
                    setBalance(bal / LAMPORTS_PER_SOL);
                } catch (err) {
                    console.error('Failed to fetch balance:', err);
                }
            } else {
                setBalance(0);
            }
        };
        fetchBalance();
    }, [publicKey, connection]);

    const handleMax = () => {
        const maxAmount = Math.max(0, balance - 0.001);
        setAmount(maxAmount.toFixed(6));
    };

    const validateAddress = (address) => {
        try {
            new PublicKey(address);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSend = async () => {
        if (!connected || !publicKey) {
            toast.error('Please connect your wallet first');
            return;
        }

        if (!recipient || !validateAddress(recipient)) {
            toast.error('Invalid recipient address');
            return;
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            toast.error('Invalid amount');
            return;
        }

        if (amountNum > balance - 0.001) {
            toast.error('Insufficient balance');
            return;
        }

        setLoading(true);
        try {
            const recipientPubkey = new PublicKey(recipient);
            const lamports = Math.floor(amountNum * LAMPORTS_PER_SOL);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPubkey,
                    lamports,
                })
            );

            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');

            toast.success(
                <div>
                    Transaction successful!{' '}
                    <a
                        href={`https://solscan.io/tx/${signature}?cluster=mainnet-beta`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#10b981', textDecoration: 'underline' }}
                    >
                        View on Solscan ↗
                    </a>
                </div>
            );

            setRecipient('');
            setAmount('');

            // Refresh balance
            const newBal = await connection.getBalance(publicKey);
            setBalance(newBal / LAMPORTS_PER_SOL);
        } catch (err) {
            console.error('Send failed:', err);
            toast.error(`Transaction failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Send SOL</h2>

                <div className={styles.balanceSection}>
                    <span className={styles.balanceLabel}>Available Balance</span>
                    <span className={styles.balanceValue}>
                        {connected ? `${balance.toFixed(4)} SOL` : 'Connect Wallet'}
                    </span>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Recipient Address</label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter Solana address..."
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Amount (SOL)</label>
                    <div className={styles.amountWrapper}>
                        <input
                            type="number"
                            className={styles.input}
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            disabled={loading}
                            step="0.001"
                            min="0"
                        />
                        <button
                            className={styles.maxBtn}
                            onClick={handleMax}
                            disabled={loading || !connected}
                        >
                            MAX
                        </button>
                    </div>
                </div>

                <button
                    className={styles.sendBtn}
                    onClick={handleSend}
                    disabled={!connected || loading}
                >
                    {loading ? 'Sending...' : 'Send SOL'}
                </button>

                {!connected && (
                    <p className={styles.hint}>Please connect your wallet to send SOL</p>
                )}
            </div>
        </div>
    );
};

export default Send;
