import { TonConnectUI, THEME } from '@tonconnect/ui';

export const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://not-front-contest.aztex.digital/tonconnect-manifest.json',
    uiPreferences: {
        theme: THEME.LIGHT,
    },
});
