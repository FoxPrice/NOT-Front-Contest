import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTelegramWebAppContext } from '@/context/telegram-web-app-context';
import { useVibration } from '@/hooks/useVibration';

/**
 * Custom hook for managing Telegram WebApp back button functionality.
 * Integrates with Telegram's native back button, providing navigation
 * and haptic feedback for a native-like experience.
 *
 * Features:
 * - Telegram WebApp back button integration
 * - Automatic navigation history management
 * - Haptic feedback on button press
 * - Cleanup on unmount
 * - Conditional initialization based on Telegram context
 *
 * @hook
 * @returns {void}
 *
 * @example
 * // Use in a component to enable Telegram back button
 * function ProductPage() {
 *   useTelegramBackButton();
 *   return <div>...</div>;
 * }
 */
export const useTelegramBackButton = () => {
    // Get navigation and Telegram context
    const navigate = useNavigate();
    const { tg } = useTelegramWebAppContext();
    const { handleVibrate } = useVibration();

    useEffect(() => {
        // Skip if Telegram context is not available
        if (!tg) return;

        // Show and configure back button
        tg.BackButton.show();

        /**
         * Handles back button click
         * Provides haptic feedback and navigates back
         */
        const handleBack = () => {
            handleVibrate();
            navigate(-1);
        };

        // Register click handler
        tg.BackButton.onClick(handleBack);

        // Cleanup: hide button and remove handler
        return () => {
            tg.BackButton.hide();
            tg.BackButton.offClick(handleBack);
        };
    }, [tg, navigate, handleVibrate]);
};
