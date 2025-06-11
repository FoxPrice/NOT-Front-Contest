import { FC } from 'react';

import { Link } from 'react-router-dom';

import ProductImgs from '@/components/store/product-imgs';

import CheckIcon from '@/assets/svg/store/check.svg?react';

import { CatalogItem } from '@/types/catalog-item';

/**
 * Product card component that displays product information and handles navigation.
 * Shows out of stock state and cart status.
 *
 * Features:
 * - Product image slider
 * - Cart status indicator
 * - Out of stock overlay
 * - Price and currency display
 * - View transition animation
 *
 * @component
 * @param {Object} props - Component props
 * @param {CatalogItem} props.product - Product data
 * @param {boolean} props.isInCart - Whether product is in cart
 * @returns {JSX.Element} Product card with navigation and status indicators
 */
const ProductCard: FC<{ product: CatalogItem; isInCart: boolean }> = ({ product, isInCart }) => {
    const handleSliderClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const productPath: string = product.id.toString() ?? 'error';
    const isOutOfStock: boolean = product.left === 0;

    // Card content that can be wrapped in Link or div based on stock status
    const cardContent = (
        <div className="flex flex-col gap-[8px] no-hover">
            <div
                className="relative flex rounded-[16px] w-full aspect-square overflow-hidden"
                onMouseDown={handleSliderClick}
            >
                <ProductImgs imgs={product.images} />
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white">Out of stock</span>
                    </div>
                )}
                {isInCart ? (
                    <div
                        className="absolute top-[8px] right-[8px] w-[22px] h-[22px]
                     flex items-center justify-center bg-main-text-color rounded-full"
                    >
                        <div className="text-theme-color w-[12px] h-[12px]">
                            <CheckIcon className="[&>path]:fill-current" />
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="flex flex-col gap-[2px] pl-[8px]">
                <span className="text-start">{product.name}</span>
                <span className="inline-flex gap-[4px]">
                    <span className="small-text">{product.price}</span>
                    <span className="small-text text-secondary-text-color">{product.currency}</span>
                </span>
            </div>
        </div>
    );

    // Return either Link or div based on stock status
    return isOutOfStock ? (
        <div className="cursor-not-allowed">{cardContent}</div>
    ) : (
        <Link to={`/product/${productPath}`} viewTransition>
            {cardContent}
        </Link>
    );
};

export default ProductCard;
