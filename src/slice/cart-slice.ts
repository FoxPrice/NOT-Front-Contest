import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { CartItem } from '@/types/cart-item';
import { CartSlice } from '@/types/stores';

const initialCartState: CartSlice = {
    cart: [],
    count: 0,
    isLoading: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart: (state: CartSlice, action: PayloadAction<CartItem>) => {
            const item = state.cart.find((item) => item.id === action.payload.id);

            if (item) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id ? { ...item, count: item.count + 1 } : item,
                    ),
                    count: state.count + 1,
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                    count: state.count + 1,
                };
            }
        },
        removeFromCart: (state: CartSlice, action: PayloadAction<CartItem>) => {
            const item = state.cart.find((item) => item.id === action.payload.id);

            if (item && item.count === 1) {
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.id !== action.payload.id),
                    count: state.count - 1,
                };
            } else {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id ? { ...item, count: item.count - 1 } : item,
                    ),
                    count: state.count - 1,
                };
            }
        },
        deleteFromCart: (state: CartSlice, action: PayloadAction<CartItem>) => {
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.id),
                count: state.count - action.payload.count,
            };
        },
        setIsLoading: (state: CartSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

export const { addToCart, removeFromCart, setIsLoading, deleteFromCart } = cartSlice.actions;

export const selectCartSlice = (state: RootState): CartSlice => state.cart;
export const selectCartPrice = (state: RootState): number =>
    state.cart.cart.reduce((acc, product) => acc + product.price * product.count, 0);

export default cartSlice.reducer;
