import { FC } from 'react';

import { Link } from 'react-router-dom';

import ProductImgs from '@/components/store/product-imgs';

import { CatalogItem } from '@/types/catalog-item';

const ProductCard: FC<{ product: CatalogItem }> = ({ product }) => {
    const handleSliderClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const productPath: string = product.id.toString() ?? 'error';

    return (
        <Link to={`/product/${productPath}`} className="flex flex-col gap-[8px]">
            <div
                className="relative flex rounded-[16px] w-full aspect-square overflow-hidden"
                onClick={handleSliderClick}
                onMouseDown={handleSliderClick}
            >
                <ProductImgs imgs={product.images} />
            </div>
            <div className="flex flex-col gap-[2px] pl-[8px]">
                <span className="text-start">{product.name}</span>
                <span className="inline-flex gap-[4px]">
                    <span className="small-text">{product.price}</span>
                    <span className="small-text text-secondary-text-color">{product.currency}</span>
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;
