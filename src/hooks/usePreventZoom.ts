import { useEffect } from 'react';

export const usePreventZoom = () => {
    useEffect(() => {
        const preventZoom = (event: Event) => {
            const gestureEvent = event as unknown as { scale: number };
            if (gestureEvent.scale !== 1) {
                event.preventDefault();
            }
        };

        document.addEventListener('gesturestart', preventZoom, false);
        document.addEventListener('gesturechange', preventZoom, false);

        return () => {
            document.removeEventListener('gesturestart', preventZoom, false);
            document.removeEventListener('gesturechange', preventZoom, false);
        };
    }, []);
};
