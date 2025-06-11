export type TelegramWebAppUser = {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
};

export type TelegramWebApp = {
    ready: () => void;
    expand: () => void;
    close: () => void;
    enableClosingConfirmation: () => void;
    disableClosingConfirmation: () => void;
    requestFullscreen: () => void;
    lockOrientation: () => void;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    colorScheme: 'light' | 'dark';
    platform: string;
    isVerticalSwipesEnabled: boolean;
    initData: string;
    initDataUnsafe: {
        user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
        };
        chat_type?: string;
        auth_date?: number;
        hash?: string;
    };
    BackButton: {
        isVisible: boolean;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
        show: () => void;
        hide: () => void;
    };
    HapticFeedback: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
        notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
        selectionChanged: () => void;
    };
    onEvent: (eventType: string, eventHandler: (data?: unknown) => void) => void;
    offEvent: (eventType: string, eventHandler: (data?: unknown) => void) => void;
    sendData: (data: string) => void;
    openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
    openTelegramLink: (url: string) => void;
    showPopup: (
        params: {
            title?: string;
            message: string;
            buttons?: Array<{
                id?: string;
                type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
                text?: string;
            }>;
        },
        callback?: (buttonId: string) => void,
    ) => void;
    showAlert: (message: string, callback?: () => void) => void;
    showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
    showScanQrPopup: (
        params: {
            text?: string;
        },
        callback?: (text: string) => boolean,
    ) => void;
    closeScanQrPopup: () => void;
    requestTheme?: () => void;
    setHeaderColor?: (color: string) => void;
    setBackgroundColor?: (color: string) => void;
    shareMessage?: (msgId: string, callback?: (success: boolean) => void) => void;
};
