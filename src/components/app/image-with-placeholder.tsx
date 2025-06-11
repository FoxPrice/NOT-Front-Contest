import { FC, useRef, CSSProperties } from 'react';

import { useImageLoader } from '@/hooks/useImageLoader';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type ImageWithPlaceholderProps = {
    className?: string | undefined;
    src?: string | null;
    alt?: string;
    placeholderImg: string;
    style?: CSSProperties;
};

const ImageWithPlaceholder: FC<ImageWithPlaceholderProps> = ({
    className,
    src,
    alt,
    placeholderImg,
    style,
}) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const isVisible = useIntersectionObserver(imgRef);
    const { imgSrc, isLoading } = useImageLoader(src, placeholderImg, isVisible);

    if (isLoading) {
        return <div ref={imgRef} className={`skeleton ${className}`} style={style} />;
    }

    return <img className={className} src={imgSrc || ''} alt={alt} style={style} />;
};

export default ImageWithPlaceholder;
