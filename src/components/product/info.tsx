import { FC } from 'react';

import { CatalogItem } from '@/types/catalog-item';

/**
 * Product information component that displays product details.
 * Renders product description and a horizontal scrollable list of product attributes.
 *
 * Features:
 * - Product description display
 * - Price and currency information
 * - Stock availability indicator
 * - Product tags and attributes
 * - Horizontal scrollable metadata list
 * - Responsive layout with text truncation
 *
 * @component
 * @param {Object} props - Component props
 * @param {CatalogItem} props.product - Product data including description, price, and tags
 * @returns {JSX.Element} Product information section with description.
 */
const ProductInfo: FC<{ product: CatalogItem }> = ({ product }) => {
    return (
        <section className="flex flex-col gap-[16px] pb-[10px] w-full min-h-fit">
            <p className="px-[16px] max-w-[80%]">{product.description}</p>
            <div className="flex items-center gap-[8px] px-[16px] overflow-x-auto no-select flex-nowrap min-w-0 scrollbar-none pb-[10px]">
                <span className="inline-flex items-center gap-[2px] py-[2px] px-[8px] bg-bg-additional-color rounded-[10px] flex-shrink-0 whitespace-nowrap">
                    <span className="product-info uppercase">{product.price}&nbsp;</span>
                    <span className="product-info text-secondary-text-color uppercase">
                        {product.currency}
                    </span>
                </span>
                <span className="inline-flex items-center gap-[2px] py-[2px] px-[8px] bg-bg-additional-color rounded-[10px] flex-shrink-0 whitespace-nowrap">
                    <span className="product-info uppercase">{product.left}&nbsp;</span>
                    <span className="product-info text-secondary-text-color uppercase">left</span>
                </span>
                {Object.entries(product.tags).map(([key, value]) => (
                    <span
                        key={`${key}-${value}`}
                        className="inline-flex items-center gap-[2px] py-[2px] px-[8px] bg-bg-additional-color rounded-[10px] flex-shrink-0 whitespace-nowrap"
                    >
                        <span className="product-info uppercase">{key}&nbsp;</span>
                        <span className="product-info text-secondary-text-color uppercase">
                            {value}
                        </span>
                    </span>
                ))}
            </div>
        </section>
    );
};

export default ProductInfo;
