import { FC, useEffect, useState, useCallback, useRef } from 'react';

type ImageWithPlaceholderProps = {
    className?: string | undefined;
    src?: string;
    alt?: string;
    placeholderImg: string;
};

const ImageWithPlaceholder: FC<ImageWithPlaceholderProps> = ({
    className,
    src,
    alt,
    placeholderImg,
}) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleLoadImg = (src: string, handleError: () => void): void => {
        const img = new Image();
        img.src = src;

        img.onload = (): void => {
            setImgSrc(src);
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px',
            },
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (isLoading) {
        return <div ref={imgRef} className={`skeleton ${className}`} />;
    }

    return <img className={className} src={imgSrc || ''} alt={alt} />;
};

export default ImageWithPlaceholder;
