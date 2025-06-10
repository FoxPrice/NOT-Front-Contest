import { useState, useCallback, useEffect } from 'react';

export const useImageLoader = (
    src: string | undefined,
    placeholderImg: string,
    isVisible: boolean,
) => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleLoadImg = (imgSrc: string, handleError: () => void): void => {
        const img = new Image();
        img.src = imgSrc;

        img.onload = (): void => {
            setImgSrc(imgSrc);
            setIsLoading(false);
        };

        img.onerror = (): void => {
            handleError();
        };
    };

    const loadPlaceholder = useCallback(() => {
        const placeholder = placeholderImg;

        handleLoadImg(placeholder, () => {
            setIsLoading(false);
        });
    }, [placeholderImg]);

    useEffect(() => {
        if (!isVisible) return;

        setIsLoading(true);

        if (!src) {
            return;
        }

        handleLoadImg(src, loadPlaceholder);
    }, [src, loadPlaceholder, isVisible]);

    return {
        imgSrc,
        isLoading,
    };
};
