import { useEffect } from 'react';

/**
 * Custom hook that prevents zoom gestures on mobile devices.
 * Specifically targets iOS Safari's gesture events to maintain
 * a consistent zoom level in the application.
 *
 * Features:
 * - Prevents pinch-to-zoom gestures
 * - Targets iOS Safari gesture events
 * - Automatic cleanup on unmount
 * - Non-intrusive (only prevents actual zoom attempts)
 * - Cross-browser compatibility
 *
 * @hook
 * @returns {void}
 *
 * @example
 * // Use in a component to prevent zooming
 * function App() {
 *   usePreventZoom();
 *   return <div>...</div>;
 * }
 */
export const usePreventZoom = () => {
    useEffect(() => {
        /**
         * Event handler that prevents zoom gestures
         * Only prevents events when actual zoom is attempted (scale !== 1)
         * @param {Event} event - The gesture event
         */
        const preventZoom = (event: Event) => {
            // Cast event to access scale property (iOS Safari specific)
            const gestureEvent = event as unknown as { scale: number };
            if (gestureEvent.scale !== 1) {
                event.preventDefault();
            }
        };

        // Add gesture event listeners for iOS Safari
        document.addEventListener('gesturestart', preventZoom, false);
        document.addEventListener('gesturechange', preventZoom, false);

        // Cleanup event listeners on unmount
        return () => {
            document.removeEventListener('gesturestart', preventZoom, false);
            document.removeEventListener('gesturechange', preventZoom, false);
        };
    }, []);
};
