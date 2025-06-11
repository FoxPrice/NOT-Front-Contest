import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing image loading with placeholder support.
 * Handles image loading states, errors, and visibility-based loading.
 *
 * Features:
 * - Placeholder image support
 * - Loading state management
 * - Error handling with fallback
 * - Visibility-based loading
 * - Clean image loading lifecycle
 *
 * @hook
 * @param {string | null | undefined} src - Source URL of the image to load
 * @param {string} placeholderImg - URL of the placeholder image
 * @param {boolean} isVisible - Whether the image should be loaded based on visibility
 * @returns {Object} Image loading state and source
 * @returns {string | null} returns.imgSrc - Current image source (main or placeholder)
 * @returns {boolean} returns.isLoading - Whether the image is currently loading
 *
 * @example
 * const { imgSrc, isLoading } = useImageLoader(
 *   'https://example.com/image.jpg',
 *   '/placeholder.jpg',
 *   true
 * );
 */
export const useImageLoader = (
    src: string | null | undefined,
    placeholderImg: string,
    isVisible: boolean,
) => {
    // State for current image source and loading status
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /**
     * Loads an image and handles its loading lifecycle
     * @param {string} imgSrc - Source URL to load
     * @param {() => void} handleError - Error handler callback
     */
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

    /**
     * Loads the placeholder image as fallback
     */
    const loadPlaceholder = useCallback(() => {
        const placeholder = placeholderImg;

        handleLoadImg(placeholder, () => {
            setIsLoading(false);
        });
    }, [placeholderImg]);

    // Effect to handle image loading based on visibility and source
    useEffect(() => {
        // Skip loading if component is not visible
        if (!isVisible) return;

        setIsLoading(true);

        // Handle different source scenarios
        if (src === null) loadPlaceholder();
        else if (!src) return;

        if (src) handleLoadImg(src, loadPlaceholder);
    }, [src, loadPlaceholder, isVisible]);

    return {
        imgSrc,
        isLoading,
    };
};
