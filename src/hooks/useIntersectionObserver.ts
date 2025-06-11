import { useEffect, useState } from 'react';

/**
 * Custom hook for tracking element visibility using Intersection Observer.
 * Detects when an element becomes visible in the viewport and disconnects
 * the observer after first intersection.
 *
 * Features:
 * - One-time visibility detection
 * - Configurable observer options
 * - Automatic cleanup
 * - Support for images and div elements
 * - Memory efficient (disconnects after first intersection)
 *
 * @hook
 * @param {React.RefObject<HTMLImageElement | HTMLDivElement | null>} elementRef - Ref to the element to observe
 * @param {IntersectionObserverInit} [options={ rootMargin: '100px' }] - Observer options
 * @param {string} [options.rootMargin='100px'] - Margin around the root element
 * @returns {boolean} Whether the element is visible
 *
 * @example
 * // Use in a component to detect element visibility
 * function LazyComponent() {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *   const isVisible = useIntersectionObserver(elementRef);
 *
 *   return (
 *     <div ref={elementRef}>
 *       {isVisible ? <ExpensiveContent /> : <Placeholder />}
 *     </div>
 *   );
 * }
 */
export const useIntersectionObserver = (
    elementRef: React.RefObject<HTMLImageElement | HTMLDivElement | null>,
    options: IntersectionObserverInit = { rootMargin: '100px' },
) => {
    // State to track element visibility
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        /**
         * Creates and manages Intersection Observer
         * Sets visibility state and disconnects on first intersection
         */
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                // Disconnect after first intersection to save resources
                observer.disconnect();
            }
        }, options);

        // Start observing if element exists
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        // Cleanup observer on unmount
        return () => observer.disconnect();
    }, [elementRef, options]);

    return isVisible;
};
