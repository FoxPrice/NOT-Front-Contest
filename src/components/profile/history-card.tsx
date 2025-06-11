import { FC } from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '@/utils/format-date';

import ImageWithPlaceholder from '../app/image-with-placeholder';

import productImagePlaceholder from '@/assets/img/placeholder/product.jpg';

import { CatalogItem } from '@/types/catalog-item';
import { HistoryItem } from '@/types/history-item';

/**
 * History card component that displays a past purchase record.
 * Shows product details, purchase date, and transaction amount.
 *
 * Features:
 * - Product image with placeholder
 * - Product name and category
 * - Formatted purchase date
 * - Transaction amount and currency
 * - Clickable link to product page
 *
 * @component
 * @param {Object} props - Component props combining HistoryItem and product data
 * @param {number} props.total - Transaction amount
 * @param {string} props.currency - Transaction currency
 * @param {number} props.timestamp - Purchase timestamp
 * @param {CatalogItem | null} props.product - Product data or null if product no longer exists
 * @returns {JSX.Element} History card with purchase details and product information
 */
const HistoryCard: FC<HistoryItem & { product: CatalogItem | null }> = ({
    total,
    currency,
    timestamp,
    product,
}) => {
    // Format timestamp into readable date
    const formattedDate = formatDate(timestamp);

    // Extract product data with fallback values
    const productName: string = product?.name ?? 'Product name';
    const productCategory: string = product?.category ?? 'Product category';
    const productImage: string | undefined = product?.images[0] ?? '';
    const productPath: string = product?.id.toString() ?? 'error';

    return (
        <Link
            to={`/product/${productPath}`}
            className="grid grid-cols-[60px_1fr] gap-[12px] items-center justify-center w-full py-[4px]"
            viewTransition
        >
            <ImageWithPlaceholder
                className="rounded-[12px] h-[60px] w-[60px]"
                src={productImage}
                alt="Avatar"
                placeholderImg={productImagePlaceholder}
            />
            <div className="flex items-center w-full justify-between">
                <div className="flex flex-col items-start">
                    <span className="product-info text-secondary-text-color">
                        {productCategory}
                    </span>
                    <span>{productName}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="product-info text-secondary-text-color">{formattedDate}</span>
                    <span>{`${total} ${currency}`}</span>
                </div>
            </div>
        </Link>
    );
};

export default HistoryCard;
