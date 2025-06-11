import { useEffect } from 'react';

import { useVibration } from '@/hooks/useVibration';

/**
 * Custom hook that provides global vibration feedback for interactive elements.
 * Automatically triggers vibration on click events for buttons and links.
 *
 * Features:
 * - Global click event listener
 * - Automatic vibration for buttons and links
 * - Support for both direct and nested interactive elements
 * - Cleanup on unmount
 * - Integration with device vibration API
 *
 * @hook
 * @returns {void}
 *
 * @example
 * // Use in a component to enable global vibration
 * function App() {
 *   useGlobalVibration();
 *   return <div>...</div>;
 * }
 */
export const useGlobalVibration = () => {
    // Get vibration handler from base vibration hook
    const { handleVibrate } = useVibration();

    useEffect(() => {
        // Click event handler for vibration feedback
        const clickHandler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            // Check if clicked element is or contains a button or link
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                handleVibrate();
            }
        };

        // Add global click listener with capture phase
        document.addEventListener('click', clickHandler, true);

        // Cleanup listener on unmount
        return () => {
            document.removeEventListener('click', clickHandler, true);
        };
    }, [handleVibrate]);
};
