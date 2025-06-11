/// <reference types="vite/client" />

import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';

import MinusIcon from '@/assets/svg/product/minus.svg?react';
import PlusIcon from '@/assets/svg/product/plus.svg?react';

import { CatalogItem } from '@/types/catalog-item';

import { useTonPurchase } from '@/hooks/useTonPurchase';
import { setIsFailedTransInputOpen, setIsSuccessTransInputOpen } from '@/slice/base-slide';
import { addToCart, clearCart, removeFromCart, selectCartSlice } from '@/slice/cart-slice';

/**
 * TON wallet address for payments.
 * Retrieved from environment variables for security
 */
const TON_ADDRESS = import.meta.env.VITE_TON_ADDRESS as string;

/**
 * Product action buttons component that handles cart operations and purchases.
 * Provides quantity controls for items in cart and direct purchase option.
 *
 * Features:
 * - Add/remove from cart with quantity controls
 * - Direct purchase with TON payment integration
 * - Stock limit validation
 * - Success/failure transaction handling
 * - Responsive button layout
 *
 * @component
 * @param {Object} props - Component props
 * @param {CatalogItem} props.product - Product data for cart operations and purchase
 * @returns {JSX.Element} Product action buttons with cart controls and purchase option
 */
const ProductButtons: FC<{ product: CatalogItem }> = ({ product }) => {
    const dispatch = useDispatch();
    // Check if product is already in cart
    const productInCart = useSelector(selectCartSlice).cart.find((item) => item.id === product.id);

    /**
     * Adds product to cart with quantity validation.
     * Prevents adding more items than available in stock
     */
    const handleAddToCart = () => {
        if (productInCart?.count && productInCart?.count + 1 > product.left) return;
        dispatch(
            addToCart({
                ...product,
                count: 1,
            }),
        );
    };

    /**
     * Removes product from cart with quantity validation.
     * Prevents negative quantity values
     */
    const handleRemoveFromCart = () => {
        if (productInCart?.count && productInCart?.count - 1 < 0) return;
        dispatch(removeFromCart({ ...product, count: 1 }));
    };

    // TON payment integration hook
    const { sendPayment, reset } = useTonPurchase();

    /**
     * Handles TON payment process with transaction status handling.
     * Shows success or failure popup based on transaction result
     *
     * @param {number} amountTon - Amount in TON to send (default: 0.01)
     * @param {string} recipient - Recipient TON address (default: TON_ADDRESS)
     */
    const handleSendPayment = async (amountTon: number = 0.01, recipient: string = TON_ADDRESS) => {
        const status = await sendPayment(amountTon, recipient);

        if (status === 'success') {
            dispatch(setIsSuccessTransInputOpen(true));
            dispatch(clearCart());
        } else if (status === 'error') {
            dispatch(setIsFailedTransInputOpen(true));
        }

        reset();
    };

    return (
        <div className="inner-container grid grid-cols-2 items-center gap-[12px] pt-[8px] pb-[34px]">
            {productInCart && productInCart?.count !== 0 ? (
                <div className="flex items-center gap-[12px] justify-center w-full h-[50px] bg-bg-additional-color rounded-[12px]">
                    <button
                        className="text-main-text-color w-[24px] h-[24px] flex items-center justify-center"
                        onClick={handleRemoveFromCart}
                    >
                        <MinusIcon className="[&>path]:fill-current" />
                    </button>
                    <span className="subtitle min-w-[22px] text-center">
                        {productInCart?.count}
                    </span>
                    <button
                        className="text-main-text-color w-[24px] h-[24px] flex items-center justify-center"
                        onClick={handleAddToCart}
                    >
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
            <DefaultButton className="" text="Buy now" onClick={() => handleSendPayment()} />
        </div>
    );
};

export default ProductButtons;
