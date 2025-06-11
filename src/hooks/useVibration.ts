import { useTelegramWebAppContext } from '@/context/telegram-web-app-context';

type ImpactOccurred = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';

export const useVibration = () => {
    const { tg } = useTelegramWebAppContext();

    const handleVibrate = (impactOccurred: ImpactOccurred = 'light') => {
        if (!tg) return;
        tg?.HapticFeedback.impactOccurred(impactOccurred);
    };

    return { handleVibrate };
};
