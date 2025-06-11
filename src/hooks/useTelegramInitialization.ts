import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { TelegramWebAppUser } from '@/types/telegram-data';

import { useTelegramWebAppContext } from '@/context/telegram-web-app-context';
import useTheme from '@/hooks/useTheme';
import { setIsMobileDevice } from '@/slice/base-slide';
import { setUserData } from '@/slice/user-slice';

/**
 * Custom hook for initializing and configuring Telegram WebApp.
 * Handles various aspects of Telegram WebApp setup including:
 * - Telegram context initialization
 * - Fullscreen mode configuration
 * - Device type detection
 * - Theme synchronization
 * - User data management
 *
 * Features:
 * - Automatic Telegram WebApp detection
 * - Platform-specific optimizations
 * - Theme synchronization with Telegram
 * - User data integration
 * - Fullscreen and orientation management
 *
 * @hook
 * @returns {Object} Telegram WebApp context
 * @returns {WebApp} returns.tg - Telegram WebApp instance
 *
 * @example
 * // Use in app root to initialize Telegram WebApp
 * function App() {
 *   const { tg } = useTelegramInitialization();
 *   return <div>...</div>;
 * }
 */
export const useTelegramInitialization = () => {
    // Get required contexts and dispatchers
    const dispatch = useDispatch();
    const { setIsDark } = useTheme();
    const { tg, setTg } = useTelegramWebAppContext();

    /**
     * Initializes Telegram WebApp context
     * Checks for Telegram WebApp availability and sets context
     */
    const handleGetTgWebApp = useCallback(() => {
        if (typeof window === 'undefined' || !window.Telegram?.WebApp) return;
        const telegram = window.Telegram?.WebApp;
        if (!telegram) return;
        setTg(telegram);
        return telegram;
    }, [setTg]);

    // Initialize Telegram WebApp on mount
    useEffect(() => {
        handleGetTgWebApp();
    }, [handleGetTgWebApp]);

    /**
     * Configures fullscreen mode and orientation
     * Applies platform-specific optimizations
     */
    const handleOpenFullScreen = useCallback(() => {
        if (!tg) return;
        tg.ready();
        tg.expand();
        // Request fullscreen on mobile platforms
        if (tg.platform === 'ios' || tg.platform === 'android') tg.requestFullscreen();
        tg.lockOrientation();
        // Disable vertical swipes for better UX
        tg.isVerticalSwipesEnabled = false;
    }, [tg]);

    // Detect and set mobile device status
    useEffect(() => {
        if (!tg) return;
        const isMobileDevice = (tg.platform === 'ios' || tg.platform === 'android') as boolean;
        dispatch(setIsMobileDevice(isMobileDevice));
    }, [dispatch, tg]);

    // Configure fullscreen mode when Telegram context is available
    useEffect(() => {
        if (!tg) return;
        handleOpenFullScreen();
    }, [handleOpenFullScreen, tg]);

    // Synchronize theme with Telegram
    useEffect(() => {
        if (!tg) return;
        const isDark: boolean = tg?.colorScheme === 'dark';
        setIsDark(isDark);

        // Set header color based on theme
        const headerColor: string = isDark ? '#000000' : '#ffffff';
        tg?.setHeaderColor?.(headerColor);
    }, [setIsDark, tg]);

    // Initialize user data from Telegram
    useEffect(() => {
        if (!tg?.initDataUnsafe?.user) return;
        const userData: TelegramWebAppUser = tg.initDataUnsafe.user;
        dispatch(setUserData(userData));
    }, [dispatch, tg]);

    return { tg };
};
