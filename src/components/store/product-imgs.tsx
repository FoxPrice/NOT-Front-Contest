import { FC } from 'react';

import ImageWithPlaceholder from '@/components/app/image-with-placeholder';
import ProductImgsDots from '@/components/store/imgs-slider-dots';

import productImagePlaceholder from '@/assets/img/placeholder/product.jpg';

import useImageSlider from '@/hooks/useImageSlider';

const ProductImgs: FC<{ imgs: string[] }> = ({ imgs }) => {
    const imgsLength = imgs.length;

    const {
        activeImageIndex,
        handleTouchStart,
        handleTouchEnd,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    } = useImageSlider(imgsLength);

    return (
        <div
            className="relative flex w-full h-full select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {imgs.map((img, index) => (
                <ImageWithPlaceholder
                    key={`${img}-${index}`}
                    src={img}
                    alt=""
                    placeholderImg={productImagePlaceholder}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ease-in-out ${
                        index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}
            <ProductImgsDots
                className="absolute bottom-[8px] left-1/2 -translate-x-1/2"
                length={imgsLength}
                activeDotIndex={activeImageIndex}
            />
        </div>
    );
};

export default ProductImgs;
