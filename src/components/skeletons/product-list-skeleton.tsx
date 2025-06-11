import { FC } from 'react';

/**
 * Skeleton component for a single product card.
 * Displays loading state animation for product image and details.
 *
 * Features:
 * - Square aspect ratio image placeholder
 * - Product name and metadata placeholders
 * - Responsive design
 * - Consistent spacing with actual product card
 *
 * @component
 * @returns {JSX.Element} Product card skeleton with loading animation
 */
const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-[8px]">
            <div className="skeleton relative flex rounded-[16px] w-full aspect-square overflow-hidden"></div>
            <div className="flex flex-col gap-[8px]">
                <div className="skeleton text-start rounded-[16px] h-[20px] w-full"></div>
                <div className="skeleton inline-flex gap-[4px] rounded-[16px] h-[18px] w-full"></div>
            </div>
        </div>
    );
};

/**
 * Skeleton component for the product grid.
 * Shows loading state for multiple product cards while data is being fetched.
 *
 * Features:
 * - Two-column grid layout
 * - Multiple product card skeletons
 * - Responsive grid spacing
 * - Matches actual product list structure
 *
 * @component
 * @returns {JSX.Element} Product grid skeleton with multiple card placeholders
 */
const ProductListSkeleton: FC = () => {
    return (
        <section className="grid grid-cols-2 inner-container gap-y-[28px] gap-x-[12px]">
            {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={`product-card-skeleton-${index}`} />
            ))}
        </section>
    );
};

export default ProductListSkeleton;
