import { FC } from 'react';

import { Link } from 'react-router-dom';

import ProductImgs from '@/components/store/product-imgs';

import CheckIcon from '@/assets/svg/store/check.svg?react';

import { CatalogItem } from '@/types/catalog-item';

const ProductCard: FC<{ product: CatalogItem; isInCart: boolean }> = ({ product, isInCart }) => {
    const handleSliderClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const productPath: string = product.id.toString() ?? 'error';

    return (
        <Link to={`/product/${productPath}`} className="flex flex-col gap-[8px] no-hover">
            <div
                className="relative flex rounded-[16px] w-full aspect-square overflow-hidden"
                onClick={handleSliderClick}
                onMouseDown={handleSliderClick}
            >
                <ProductImgs imgs={product.images} />
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
        </Link>
    );
};

export default ProductCard;
