import { useTelegramWebAppContext } from '@/context/telegram-web-app-context';

/**
 * Available haptic feedback impact styles in Telegram WebApp
 * @typedef {('light' | 'medium' | 'heavy' | 'rigid' | 'soft')} ImpactOccurred
 * @description Different vibration intensities for various user interactions
 * - light: Subtle feedback for light interactions
 * - medium: Standard feedback for regular interactions
 * - heavy: Strong feedback for important actions
 * - rigid: Sharp feedback for rigid interactions
 * - soft: Gentle feedback for soft interactions
 */
type ImpactOccurred = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';

/**
 * Custom hook for managing haptic feedback in Telegram WebApp.
 * Provides vibration feedback for user interactions using Telegram's HapticFeedback API.
 *
 * Features:
 * - Integration with Telegram WebApp HapticFeedback
 * - Multiple vibration intensity levels
 * - Graceful fallback when Telegram context is unavailable
 * - Type-safe impact style selection
 *
 * @hook
 * @returns {Object} Vibration utilities
 * @returns {Function} returns.handleVibrate - Function to trigger haptic feedback
 *
 * @example
 * // Use in a component to add haptic feedback
 * function Button() {
 *   const { handleVibrate } = useVibration();
 *   return (
 *     <button onClick={() => handleVibrate('medium')}>
 *       Click me
 *     </button>
 *   );
 * }
 */
export const useVibration = () => {
    // Get Telegram WebApp context for haptic feedback
    const { tg } = useTelegramWebAppContext();

    /**
     * Triggers haptic feedback with specified intensity
     * @param {ImpactOccurred} [impactOccurred='light'] - Intensity of the vibration
     */
    const handleVibrate = (impactOccurred: ImpactOccurred = 'light') => {
        // Skip if Telegram context is not available
        if (!tg) return;
        tg?.HapticFeedback.impactOccurred(impactOccurred);
    };

    return { handleVibrate };
};
