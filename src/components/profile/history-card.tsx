import { FC } from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '@/utils/format-date';

import ImageWithPlaceholder from '../app/image-with-placeholder';

import productImagePlaceholder from '@/assets/img/placeholder/product.jpg';

import { CatalogItem } from '@/types/catalog-item';
import { HistoryItem } from '@/types/history-item';

const HistoryCard: FC<HistoryItem & { product: CatalogItem | null }> = ({
    total,
    currency,
    timestamp,
    product,
}) => {
    const formattedDate = formatDate(timestamp);

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
