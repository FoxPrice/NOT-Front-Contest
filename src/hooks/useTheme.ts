import { useEffect, useState } from 'react';

/**
 * Interface defining the return type of useTheme hook
 * @interface UseThemeReturn
 * @property {boolean} isDark - Current theme state (dark/light)
 * @property {(value: boolean) => void} setIsDark - Function to update theme state
 */
interface UseThemeReturn {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
}

/**
 * Custom hook for managing application theme.
 * Provides theme state management and synchronization with DOM.
 * Uses Tailwind CSS dark mode classes for theme implementation.
 *
 * Features:
 * - Theme state persistence
 * - DOM class synchronization
 * - Tailwind CSS integration
 * - Initial state detection
 * - Type-safe theme management
 *
 * @hook
 * @returns {UseThemeReturn} Theme state and setter function
 *
 * @example
 * // Use in a component to manage theme
 * function ThemeToggle() {
 *   const { isDark, setIsDark } = useTheme();
 *   return (
 *     <button onClick={() => setIsDark(!isDark)}>
 *       {isDark ? 'Light Mode' : 'Dark Mode'}
 *     </button>
 *   );
 * }
 */
const useTheme = (): UseThemeReturn => {
    // Initialize theme state from DOM
    const [isDark, setIsDark] = useState<boolean>(() =>
        document.documentElement.classList.contains('dark'),
    );

    // Synchronize theme state with DOM classes
    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            // Apply dark theme
            html.classList.add('dark');
        } else {
            // Apply light theme
            html.classList.remove('dark');
        }
    }, [isDark]);

    return { isDark, setIsDark };
};

export default useTheme;
