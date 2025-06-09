import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { CartItem } from '@/types/cart-item';
import { CartStore } from '@/types/stores';

const initialCartState: CartStore = {
    cart: [],
    count: 0,
    isLoading: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart: (state: CartStore, action: PayloadAction<CartItem>) => {
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
        removeFromCart: (state: CartStore, action: PayloadAction<CartItem>) => {
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
        setIsLoading: (state: CartStore, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

export const { addToCart, removeFromCart, setIsLoading } = cartSlice.actions;

export const selectCart = (state: RootState): CartStore => state.cart;

export default cartSlice.reducer;
