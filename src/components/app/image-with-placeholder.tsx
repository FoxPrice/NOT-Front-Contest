import { FC, useEffect, useState, useCallback } from 'react';

type ImageWithPlaceholderProps = {
    className?: string;
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
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const loadPlaceholder = useCallback(() => {
        const placeholder = placeholderImg;
        setImgSrc(placeholder);
    }, [placeholderImg]);

    useEffect(() => {
        const loadImage = async () => {
            if (!src) {
                loadPlaceholder();
                return;
            }

            try {
                const imgModule = await import(src);
                setImgSrc(imgModule.default);
            } catch {
                loadPlaceholder();
            }
        };

        loadImage();
    }, [src, loadPlaceholder]);

    return <img className={className} src={imgSrc || src} alt={alt} onError={loadPlaceholder} />;
};

export default ImageWithPlaceholder;
