import { useEffect, useState } from 'react';

/**
 * Return type for useTransitionState hook
 * @template T - Type of the transitioning value
 * @interface UseTransitionStateReturn
 * @property {T} currentValue - Current value after transition
 * @property {number} opacity - Current opacity value (0-1) for transition effect
 */
type UseTransitionStateReturn<T> = {
    currentValue: T;
    opacity: number;
};

/**
 * Custom hook for managing smooth transitions between state values.
 * Provides opacity-based transition effect for value changes.
 * Useful for fade animations during state updates.
 *
 * Features:
 * - Generic type support for any value type
 * - Configurable transition duration
 * - Automatic cleanup of timeouts
 * - Smooth opacity transitions
 * - Value synchronization
 *
 * @template T - Type of the value to transition
 * @param {T} value - Target value to transition to
 * @param {number} [duration=300] - Transition duration in milliseconds
 * @returns {UseTransitionStateReturn<T>} Current value and opacity state
 *
 * @example
 * // Use in a component for smooth text transitions
 * function TransitioningText({ text }) {
 *   const { currentValue, opacity } = useTransitionState(text);
 *   return (
 *     <div style={{ opacity, transition: 'opacity 300ms' }}>
 *       {currentValue}
 *     </div>
 *   );
 * }
 */
const useTransitionState = <T>(value: T, duration: number = 300): UseTransitionStateReturn<T> => {
    // State for current value and opacity
    const [currentValue, setCurrentValue] = useState<T>(value);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        // Skip if value hasn't changed
        if (value === currentValue) return;

        // Start transition by fading out
        setOpacity(0);

        // Schedule value update and fade in
        const timeout = setTimeout(() => {
            setCurrentValue(value);
            setOpacity(1);
        }, duration);

        // Cleanup timeout on unmount or value change
        return () => clearTimeout(timeout);
    }, [currentValue, value, duration]);

    return { currentValue, opacity };
};

export default useTransitionState;
