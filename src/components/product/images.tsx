import { FC } from 'react';

import ImageWithPlaceholder from '../app/image-with-placeholder';

import productImagePlaceholder from '@/assets/img/placeholder/product.jpg';

import useImageSlider from '@/hooks/useImageSlider';
import useTransitionState from '@/hooks/useTransitionState';

/**
 * Product image gallery component with slider functionality.
 * Features touch and mouse interactions for image navigation.
 *
 * Features:
 * - Main image display with smooth transitions
 * - Thumbnail navigation strip
 * - Touch and mouse drag support
 * - Image placeholder during loading
 * - Responsive layout with aspect ratio preservation
 *
 * @component
 * @param {Object} props - Component props
 * @param {string[]} props.imgs - Array of image URLs to display
 * @param {string} props.productName - Product name for image alt text
 * @returns {JSX.Element | null} Image gallery with slider or null if no images
 */
const ProductImages: FC<{ imgs: string[]; productName: string }> = ({ imgs, productName }) => {
    const imgsLength = imgs.length;

    // Image slider hook for touch and mouse interactions
    const {
        activeImageIndex,
        handleTouchStart,
        handleTouchEnd,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        setActiveImageIndex,
    } = useImageSlider(imgsLength);

    // Current image source with transition state
    const src = imgs[activeImageIndex];
    const { currentValue: currentSrc, opacity } = useTransitionState<string>(src);

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
                className="relative w-[calc(100%-32px)] flex-1 min-h-0 mx-[16px]"
            >
                <ImageWithPlaceholder
                    className={`inner-container rounded-[20px] w-full h-full object-cover 
                        transition-opacity duration-300 ease-in-out ${opacity ? 'opacity-100' : 'opacity-0'}`}
                    src={currentSrc}
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
                            className="w-full h-full object-cover object-center"
                        />
                    </button>
                ))}
            </div>
        </section>
    );
};

export default ProductImages;
