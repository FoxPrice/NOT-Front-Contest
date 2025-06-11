import { useEffect } from 'react';

import { useVibration } from '@/hooks/useVibration';

export const useGlobalVibration = () => {
    const { handleVibrate } = useVibration();

    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                handleVibrate();
            }
        };

        document.addEventListener('click', clickHandler, true);

        return () => {
            document.removeEventListener('click', clickHandler, true);
        };
    }, [handleVibrate]);
};
