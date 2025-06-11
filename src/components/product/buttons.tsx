import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';

import MinusIcon from '@/assets/svg/product/minus.svg?react';
import PlusIcon from '@/assets/svg/product/plus.svg?react';

import { CatalogItem } from '@/types/catalog-item';

import { addToCart, removeFromCart, selectCartSlice } from '@/slice/cart-slice';

const ProductButtons: FC<{ product: CatalogItem }> = ({ product }) => {
    const dispatch = useDispatch();
    const productInCart = useSelector(selectCartSlice).cart.find((item) => item.id === product.id);

    const handleAddToCart = () => {
        if (productInCart?.count && productInCart?.count + 1 > product.left) return;
        dispatch(
            addToCart({
                ...product,
                count: 1,
            }),
        );
    };

    const handleRemoveFromCart = () => {
        if (productInCart?.count && productInCart?.count - 1 < 0) return;
        dispatch(removeFromCart({ ...product, count: 1 }));
    };

    return (
        <div className="inner-container grid grid-cols-2 items-center gap-[12px] pt-[8px] pb-[34px]">
            {productInCart && productInCart?.count !== 0 ? (
                <div className="flex items-center gap-[12px] justify-center w-full h-[50px] bg-bg-additional-color rounded-[12px]">
                    <button className="text-main-text-color" onClick={handleRemoveFromCart}>
                        <MinusIcon className="[&>path]:fill-current" />
                    </button>
                    <span className="subtitle min-w-[22px] text-center">
                        {productInCart?.count}
                    </span>
                    <button className="text-main-text-color" onClick={handleAddToCart}>
                        <PlusIcon className="[&>path]:fill-current" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center w-full h-[50px] bg-bg-additional-color rounded-[12px]"
                >
                    <span className="button-text">Add to cart</span>
                </button>
            )}
            <DefaultButton className="" text="Buy now" onClick={() => {}} />
        </div>
    );
};

export default ProductButtons;
