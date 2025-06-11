import { TonConnectUI, THEME } from '@tonconnect/ui';

/**
 * TonConnect UI instance configuration for TON wallet integration.
 * This instance is used throughout the application to handle wallet connections
 * and transactions.
 *
 * Configuration details:
 * - manifestUrl: Points to the app's manifest file that contains wallet connection metadata
 * - uiPreferences: Sets the wallet connection UI theme to light mode
 */
export const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://not-front-contest.aztex.digital/tonconnect-manifest.json',
    uiPreferences: {
        theme: THEME.LIGHT,
    },
});
