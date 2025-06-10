import { useEffect, useState } from 'react';

export const useIntersectionObserver = (
    elementRef: React.RefObject<HTMLImageElement | HTMLDivElement | null>,
    options: IntersectionObserverInit = { rootMargin: '100px' },
) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, options);

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [elementRef, options]);

    return isVisible;
};
