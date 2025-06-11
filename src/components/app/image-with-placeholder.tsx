import { FC, useRef, CSSProperties } from 'react';

import { useImageLoader } from '@/hooks/useImageLoader';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/**
 * Props for the ImageWithPlaceholder component
 *
 * @interface ImageWithPlaceholderProps
 * @property {string} [className] - Optional CSS classes for the image
 * @property {string | null} [src] - Source URL of the main image
 * @property {string} [alt] - Alt text for accessibility
 * @property {string} placeholderImg - URL of the placeholder image to show while loading
 * @property {CSSProperties} [style] - Optional inline styles
 */
type ImageWithPlaceholderProps = {
    className?: string | undefined;
    src?: string | null;
    alt?: string;
    placeholderImg: string;
    style?: CSSProperties;
};

/**
 * Image component that implements lazy loading and placeholder functionality.
 * Uses intersection observer to load images only when they become visible
 * and shows a placeholder/skeleton while loading.
 *
 * @component
 * @example
 * // Basic usage
 * <ImageWithPlaceholder
 *   src="/path/to/image.png"
 *   alt="Description"
 *   placeholderImg="/path/to/placeholder.png"
 *   className="w-full h-auto"
 * />
 *
 * @param {ImageWithPlaceholderProps} props - Component props
 * @returns {JSX.Element} An img element with lazy loading and placeholder support
 */
const ImageWithPlaceholder: FC<ImageWithPlaceholderProps> = ({
    className,
    src,
    alt,
    placeholderImg,
    style,
}) => {
    // Reference for intersection observer
    const imgRef = useRef<HTMLImageElement | null>(null);
    // Check if image is visible in viewport
    const isVisible = useIntersectionObserver(imgRef);
    // Handle image loading state and source
    const { imgSrc, isLoading } = useImageLoader(src, placeholderImg, isVisible);

    // Show skeleton loader while image is loading
    if (isLoading) {
        return <div ref={imgRef} className={`skeleton ${className}`} style={style} />;
    }

    // Render actual image when loaded
    return <img className={className} src={imgSrc || ''} alt={alt} style={style} />;
};

export default ImageWithPlaceholder;
