import { useEffect, useCallback, useState, RefObject } from 'react';

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

interface UseInfiniteScrollProps {
    totalItems: number;
    itemsPerLoad: number;
    targetRef: RefObject<HTMLDivElement | null>;
}

export const useInfiniteScroll = ({
    totalItems,
    itemsPerLoad,
    targetRef,
}: UseInfiniteScrollProps) => {
    const [visibleItems, setVisibleItems] = useState<number>(itemsPerLoad);

    const loadMore = useCallback((): void => {
        setVisibleItems((prev) => Math.min(prev + itemsPerLoad, totalItems));
    }, [totalItems, itemsPerLoad]);

    useEffect(() => {
        const observerCallback: IntersectionCallback = (entries) => {
            const target = entries[0];
            if (target.isIntersecting && visibleItems < totalItems) {
                loadMore();
            }
        };

        const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });

        const currentElement = targetRef.current;

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [totalItems, visibleItems, loadMore, targetRef]);

    return { visibleItems };
};
