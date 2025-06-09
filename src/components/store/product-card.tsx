import { FC } from 'react';

import productImagePlaceholder from '@/assets/img/placeholder/product.jpg';

import { CatalogItem } from '@/types/catalog-item';

const ProductCard: FC<{ product: CatalogItem }> = ({ product }) => {
    if (!product) return <></>;

    return (
        <button className="flex flex-col gap-[8px]">
            <div className="relative flex rounded-[16px] w-full aspect-square overflow-hidden">
                <img className="w-full h-full" src={productImagePlaceholder} alt="" />
            </div>
            <div className="flex flex-col gap-[2px] pl-[8px]">
                <span className="text-start">{product.name}</span>
                <span className="inline-flex gap-[4px]">
                    <span className="small-text">{product.price}</span>
                    <span className="small-text text-secondary-text-color">{product.currency}</span>
                </span>
            </div>
        </button>
    );
};

export default ProductCard;
