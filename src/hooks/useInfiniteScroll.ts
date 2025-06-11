import { useEffect, useCallback, useState, RefObject } from 'react';

/**
 * Callback type for Intersection Observer entries
 * @typedef {Function} IntersectionCallback
 * @param {IntersectionObserverEntry[]} entries - Array of intersection entries
 */
type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

/**
 * Props interface for useInfiniteScroll hook
 * @interface UseInfiniteScrollProps
 * @property {number} totalItems - Total number of items available to load
 * @property {number} itemsPerLoad - Number of items to load per intersection
 * @property {RefObject<HTMLDivElement | null>} targetRef - Ref to the element that triggers loading
 */
interface UseInfiniteScrollProps {
    totalItems: number;
    itemsPerLoad: number;
    targetRef: RefObject<HTMLDivElement | null>;
}

/**
 * Custom hook for implementing infinite scroll functionality.
 * Uses Intersection Observer to detect when user scrolls near the bottom
 * and loads more items automatically.
 *
 * Features:
 * - Automatic loading on scroll
 * - Configurable items per load
 * - Intersection Observer based detection
 * - Cleanup on unmount
 * - Progress tracking
 *
 * @hook
 * @param {UseInfiniteScrollProps} props - Hook configuration options
 * @returns {Object} Infinite scroll state
 * @returns {number} returns.visibleItems - Number of items currently visible
 *
 * @example
 * const { visibleItems } = useInfiniteScroll({
 *   totalItems: 100,
 *   itemsPerLoad: 20,
 *   targetRef: loadMoreRef
 * });
 */
export const useInfiniteScroll = ({
    totalItems,
    itemsPerLoad,
    targetRef,
}: UseInfiniteScrollProps) => {
    // State to track number of visible items
    const [visibleItems, setVisibleItems] = useState<number>(itemsPerLoad);

    /**
     * Loads more items when triggered
     * Respects total items limit
     */
    const loadMore = useCallback((): void => {
        setVisibleItems((prev) => Math.min(prev + itemsPerLoad, totalItems));
    }, [totalItems, itemsPerLoad]);

    // Setup intersection observer for scroll detection
    useEffect(() => {
        /**
         * Handles intersection observer entries
         * Triggers loading when target is visible and more items are available
         */
        const observerCallback: IntersectionCallback = (entries) => {
            const target = entries[0];
            if (target.isIntersecting && visibleItems < totalItems) {
                loadMore();
            }
        };

        // Create observer with 10% visibility threshold
        const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });

        const currentElement = targetRef.current;

        // Start observing if element exists
        if (currentElement) {
            observer.observe(currentElement);
        }

        // Cleanup observer on unmount
        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [totalItems, visibleItems, loadMore, targetRef]);

    return { visibleItems };
};
