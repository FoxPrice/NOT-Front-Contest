import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import DefaultButton from '@/components/app/default-button';
import EmptyState from '@/components/app/empty-state';
import ItemInCart from '@/components/cart/item-in-cart';

import CloseCartIcon from '@/assets/svg/store/close-cart.svg?react';

import { CartItem } from '@/types/cart-item';
import { CartSlice } from '@/types/stores';

import { selectBaseSlice, setIsCartOpen } from '@/slice/base-slide';
import { selectCartPrice, selectCartSlice } from '@/slice/cart-slice';

const Cart: FC = () => {
    const cartData: CartSlice = useSelector(selectCartSlice);
    const isCartOpen: boolean = useSelector(selectBaseSlice).isCartOpen;
    const totalPrice: number = useSelector(selectCartPrice);

    const cartProducts: CartItem[] = cartData.cart;

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
                className={`absolute bottom-0 left-0 right-0 grid grid-rows-[1fr_50px] min-h-[320px] max-h-[calc(100dvh-200px)] 
                    z-[1000] rounded-t-[20px] bg-theme-color pl-[16px] pr-[12px] pt-[12px] pb-[25px] 
                    transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <button onClick={handleCloseCart} className="absolute top-[16px] right-[18px]">
                    <CloseCartIcon />
                </button>
                {cartProducts.length === 0 ? (
                    <EmptyState title="Cart’s cold" descr="No items yet" />
                ) : (
                    <div className="flex flex-col gap-[16px] overflow-hidden pb-[91px]">
                        <h1 className="cart-title text-center pr-[4px]">Cart</h1>
                        <div className="flex flex-col gap-[8px] overflow-y-auto pb-[16px] pr-[4px]">
                            {cartProducts.map((product) => (
                                <ItemInCart key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
                {!totalPrice ? (
                    <div className="mt-auto pr-[4px]">
                        <DefaultButton className="mt-auto" text="OK" onClick={handleCloseCart} />
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default Cart;
