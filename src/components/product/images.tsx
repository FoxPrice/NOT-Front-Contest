import { FC } from 'react';

import ImageWithPlaceholder from '../app/image-with-placeholder';

import productImagePlaceholder from '@/assets/img/placeholder/product.jpg';

import useImageSlider from '@/hooks/useImageSlider';

const ProductImages: FC<{ imgs: string[]; productName: string }> = ({ imgs, productName }) => {
    const imgsLength = imgs.length;

    const {
        activeImageIndex,
        handleTouchStart,
        handleTouchEnd,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        setActiveImageIndex,
    } = useImageSlider(imgsLength);

    if (!imgs || imgsLength === 0) return null;

    return (
        <section className="flex flex-col gap-[8px] flex-1 min-h-0">
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative w-full flex-1 min-h-0"
            >
                <ImageWithPlaceholder
                    className={`inner-container rounded-[20px] w-full h-full object-cover transition-opacity duration-300 ease-in-out`}
                    src={imgs[activeImageIndex]}
                    alt={productName}
                    placeholderImg={productImagePlaceholder}
                />
            </div>
            <div className="w-full overflow-x-auto flex gap-[8px] items-center px-[16px] pb-[8px] scrollbar-none">
                {imgs.map((image, index) => (
                    <button
                        className={`rounded-[16px] w-[100px] aspect-square overflow-hidden flex-shrink-0 ${
                            index === activeImageIndex
                                ? 'border border-solid border-main-text-color'
                                : 'border border-solid border-transparent'
                        }`}
                        key={image}
                        onClick={() => setActiveImageIndex(index)}
                    >
                        <ImageWithPlaceholder
                            src={image}
                            alt={productName}
                            placeholderImg={productImagePlaceholder}
                            className="w-full h-full"
                        />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default ProductImages;
