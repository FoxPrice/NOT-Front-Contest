import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { TelegramWebAppUser } from '@/types/telegram-data';

import { useTelegramWebAppContext } from '@/context/telegram-web-app-context';
import useTheme from '@/hooks/useTheme';
import { setIsMobileDevice } from '@/slice/base-slide';
import { setUserData } from '@/slice/user-slice';

export const useTelegramInitialization = () => {
    const dispatch = useDispatch();
    const { setIsDark } = useTheme();
    const { tg, setTg } = useTelegramWebAppContext();

    const handleGetTgWebApp = useCallback(() => {
        if (typeof window === 'undefined' || !window.Telegram?.WebApp) return;
        const telegram = window.Telegram?.WebApp;
        if (!telegram) return;
        setTg(telegram);
        return telegram;
    }, [setTg]);

    const handleOpenFullScreen = useCallback(() => {
        if (!tg) return;
        tg.ready();
        tg.expand();
        if (tg.platform === 'ios' || tg.platform === 'android') tg.requestFullscreen();
        tg.lockOrientation();
        tg.isVerticalSwipesEnabled = false;
    }, [tg]);

    useEffect(() => {
        const telegram = handleGetTgWebApp();
        if (!telegram) return;
        const isMobileDevice = telegram.platform === 'ios' || telegram.platform === 'android';
        dispatch(setIsMobileDevice(isMobileDevice));
    }, [dispatch, handleGetTgWebApp]);

    useEffect(() => {
        if (!tg) return;
        handleOpenFullScreen();
    }, [handleOpenFullScreen, tg]);

    useEffect(() => {
        if (!tg) return;
        const isDark: boolean = tg?.colorScheme === 'dark';
        setIsDark(isDark);

        const headerColor: string = isDark ? '#000000' : '#ffffff';
        tg?.setHeaderColor?.(headerColor);
    }, [setIsDark, tg]);

    useEffect(() => {
        if (!tg?.initDataUnsafe?.user) return;
        const userData: TelegramWebAppUser = tg.initDataUnsafe.user;
        dispatch(setUserData(userData));
    }, [dispatch, tg]);

    return { tg };
};
