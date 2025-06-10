import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CartEmptyState from '@/components/emptyState/cart-empty';

import CloseCartIcon from '@/assets/svg/store/close-cart.svg?react';

import { CartItem } from '@/types/cart-item';

import { selectBaseSlice, setIsCartOpen } from '@/slice/base-slide';
import { selectCartSlice } from '@/slice/cart-slice';

const Cart: FC = () => {
    const cartProducts: CartItem[] = useSelector(selectCartSlice).cart;
    const isCartOpen: boolean = useSelector(selectBaseSlice).isCartOpen;
    const [isVisible, setIsVisible] = useState(false);

    const dispatch = useDispatch();

    const handleCloseCart = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(setIsCartOpen(false));
        }, 300);
    };

    useEffect(() => {
        if (isCartOpen) {
            setIsVisible(true);
        }
    }, [isCartOpen]);

    if (!isCartOpen) {
        return null;
    }

    return (
        <section className={`fixed bottom-0 left-0 right-0 h-screen w-screen`}>
            <div
                className={`overlay transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleCloseCart}
            ></div>
            <div
                className={`absolute bottom-0 left-0 right-0 grid grid-rows-[1fr_50px] min-h-[320px] max-h-[calc(100dvh-200px)] z-[1000] rounded-t-[20px] bg-theme-color px-[16px] pt-[12px] pb-[34px] transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <button onClick={handleCloseCart} className="absolute top-[16px] right-[14px]">
                    <CloseCartIcon />
                </button>
                {cartProducts.length === 0 ? (
                    <CartEmptyState />
                ) : (
                    <div className="flex flex-col gap-[8px]">
                        <h2 className="title">xbox</h2>
                    </div>
                )}
                <button className="h-[50px] w-full mt-auto bg-main-text-color text-main-text-color button-text">
                    OK
                </button>
            </div>
        </section>
    );
};

export default Cart;
