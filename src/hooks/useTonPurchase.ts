/// <reference types="vite/client" />

import { useState, useCallback } from 'react';

import { tonConnectUI } from '@/components/app/ton-connect-ui';

/**
 * Possible states of a TON purchase transaction
 * @typedef {('idle' | 'loading' | 'success' | 'error')} PurchaseStatus
 */
type PurchaseStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * TON wallet address for receiving payments
 * Retrieved from environment variables for security
 */
const TON_ADDRESS = import.meta.env.VITE_TON_ADDRESS as string;

/**
 * Custom hook for managing TON cryptocurrency purchases.
 * Handles wallet connection, transaction sending, and payment status.
 * Integrates with TonConnect UI for wallet interactions.
 *
 * Features:
 * - Wallet connection management
 * - Transaction status tracking
 * - Error handling
 * - Automatic wallet modal
 * - Transaction timeout (5 minutes)
 * - Amount conversion (TON to nanoTON)
 *
 * @hook
 * @returns {Object} Purchase management utilities
 * @returns {Function} returns.sendPayment - Function to initiate payment
 * @returns {PurchaseStatus} returns.status - Current transaction status
 * @returns {Error | null} returns.error - Last error if any
 * @returns {boolean} returns.isConnected - Whether wallet is connected
 * @returns {Function} returns.reset - Function to reset purchase state
 *
 * @example
 * // Use in a component to handle TON payments
 * function PurchaseButton() {
 *   const { sendPayment, status, error } = useTonPurchase();
 *
 *   const handlePurchase = async () => {
 *     const result = await sendPayment(0.1); // Send 0.1 TON
 *     if (result === 'success') {
 *       // Handle successful payment
 *     }
 *   };
 *
 *   return <button onClick={handlePurchase}>Buy</button>;
 * }
 */
export function useTonPurchase() {
    // State for tracking transaction status and errors
    const [status, setStatus] = useState<PurchaseStatus>('idle');
    const [error, setError] = useState<Error | null>(null);

    /**
     * Resets purchase state to initial values
     */
    const reset = useCallback(() => {
        setStatus('idle');
        setError(null);
    }, []);

    /**
     * Initiates a TON payment transaction
     * @param {number} [amountTon=0.01] - Amount to send in TON
     * @param {string} [recipient=TON_ADDRESS] - Recipient's TON address
     * @returns {Promise<'success' | 'error' | 'cancelled'>} Transaction result
     */
    const sendPayment = useCallback(
        async (
            amountTon: number = 0.01,
            recipient: string = TON_ADDRESS,
        ): Promise<'success' | 'error' | 'cancelled'> => {
            setStatus('loading');
            setError(null);

            try {
                // Check for existing wallet connection
                let wallet = tonConnectUI.account;

                if (!wallet) {
                    // Open wallet connection modal if not connected
                    await tonConnectUI.openModal();

                    wallet = tonConnectUI.account;

                    if (!wallet) {
                        setStatus('idle');
                        return 'cancelled';
                    }
                }

                // Prepare transaction with 5-minute timeout
                const tx = {
                    validUntil: Math.floor(Date.now() / 1000) + 300,
                    messages: [
                        {
                            address: recipient,
                            // Convert TON to nanoTON (1 TON = 1e9 nanoTON)
                            amount: String(amountTon * 1e9),
                        },
                    ],
                };

                // Send transaction and update status
                await tonConnectUI.sendTransaction(tx);
                setStatus('success');
                return 'success';
            } catch (err) {
                // Handle and store any errors
                setStatus('error');
                setError(err instanceof Error ? err : new Error('Unknown error'));
                return 'error';
            }
        },
        [],
    );

    return {
        sendPayment,
        status,
        error,
        isConnected: !!tonConnectUI.account,
        reset,
    };
}
