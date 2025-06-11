import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTelegramWebAppContext } from '@/context/telegram-web-app-context';
import { useVibration } from '@/hooks/useVibration';

export const useTelegramBackButton = () => {
    const navigate = useNavigate();
    const { tg } = useTelegramWebAppContext();
    const { handleVibrate } = useVibration();

    useEffect(() => {
        if (!tg) return;
        tg.BackButton.show();
        const handleBack = () => {
            handleVibrate();
            navigate(-1);
        };
        tg.BackButton.onClick(handleBack);

        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick(handleBack);
        };
    }, [tg, navigate, handleVibrate]);
};
