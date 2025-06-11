/// <reference types="vite/client" />

import { useState, useCallback } from 'react';

import { tonConnectUI } from '@/components/app/ton-connect-ui';

type PurchaseStatus = 'idle' | 'loading' | 'success' | 'error';

const TON_ADDRESS = import.meta.env.VITE_TON_ADDRESS as string;

export function useTonPurchase() {
    const [status, setStatus] = useState<PurchaseStatus>('idle');
    const [error, setError] = useState<Error | null>(null);

    const reset = useCallback(() => {
        setStatus('idle');
        setError(null);
    }, []);

    const sendPayment = useCallback(
        async (
            amountTon: number = 0.01,
            recipient: string = TON_ADDRESS,
        ): Promise<'success' | 'error' | 'cancelled'> => {
            setStatus('loading');
            setError(null);

            try {
                let wallet = tonConnectUI.account;

                if (!wallet) {
                    await tonConnectUI.openModal();

                    wallet = tonConnectUI.account;

                    if (!wallet) {
                        setStatus('idle');
                        return 'cancelled';
                    }
                }

                const tx = {
                    validUntil: Math.floor(Date.now() / 1000) + 300,
                    messages: [
                        {
                            address: recipient,
                            amount: String(amountTon * 1e9),
                        },
                    ],
                };

                await tonConnectUI.sendTransaction(tx);
                setStatus('success');
                return 'success';
            } catch (err) {
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
