import { FC } from 'react';

/**
 * Dots navigation component for product image slider.
 * Displays interactive dots indicating current slide position.
 *
 * Features:
 * - Dynamic dot generation based on slides count
 * - Active dot highlighting with animation
 * - Responsive dot sizing
 * - Smooth transitions
 * - Customizable styling through className prop
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.length - Total number of slides/dots
 * @param {number} props.activeDotIndex - Index of currently active slide
 * @param {string} [props.className] - Optional additional CSS classes
 * @returns {JSX.Element} Navigation dots for image slider
 */
const ProductImgs: FC<{ length: number; activeDotIndex: number; className?: string }> = ({
    length,
    activeDotIndex,
    className,
}) => {
    return (
        <div className={`${className} flex gap-[3px]`}>
            {Array.from({ length }).map((_, index) => (
                <div
                    key={index}
                    className={`h-[4px] transition-all duration-300 ${index === activeDotIndex ? 'w-[20px] bg-white rounded-[4px]' : 'w-[4px] rounded-full bg-white/5 '}`}
                />
            ))}
        </div>
    );
};

export default ProductImgs;
