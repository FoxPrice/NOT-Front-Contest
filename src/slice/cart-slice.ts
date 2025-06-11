import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { CartItem } from '@/types/cart-item';
import { CartSlice } from '@/types/stores';

/**
 * Initial state for the cart slice of the Redux store.
 * Manages shopping cart state and operations.
 *
 * @property {CartItem[]} cart - Array of items in the cart
 * @property {number} count - Total number of items in the cart
 * @property {boolean} isLoading - Loading state for cart operations
 */
const initialCartState: CartSlice = {
    cart: [],
    count: 0,
    isLoading: false,
};

/**
 * Redux slice for managing shopping cart state.
 * Handles cart operations, item management, and price calculations.
 *
 * Features:
 * - Add/remove/delete items from cart
 * - Item quantity management
 * - Cart total price calculation
 * - Loading state management
 * - Cart clearing functionality
 */
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        /**
         * Adds an item to the cart or increases its quantity
         * @param {CartSlice} state - Current state
         * @param {PayloadAction<CartItem>} action - Item to add
         */
        addToCart: (state: CartSlice, action: PayloadAction<CartItem>) => {
            const item = state.cart.find((item) => item.id === action.payload.id);

            if (item) {
                // Increment quantity if item exists
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id ? { ...item, count: item.count + 1 } : item,
                    ),
                    count: state.count + 1,
                };
            } else {
                // Add new item if it doesn't exist
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                    count: state.count + 1,
                };
            }
        },

        /**
         * Removes one unit of an item from the cart
         * Removes the item completely if quantity becomes 0
         * @param {CartSlice} state - Current state
         * @param {PayloadAction<CartItem>} action - Item to remove
         */
        removeFromCart: (state: CartSlice, action: PayloadAction<CartItem>) => {
            const item = state.cart.find((item) => item.id === action.payload.id);

            if (item && item.count === 1) {
                // Remove item completely if quantity is 1
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.id !== action.payload.id),
                    count: state.count - 1,
                };
            } else {
                // Decrement quantity if more than 1
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload.id ? { ...item, count: item.count - 1 } : item,
                    ),
                    count: state.count - 1,
                };
            }
        },

        /**
         * Removes an item completely from the cart regardless of quantity
         * @param {CartSlice} state - Current state
         * @param {PayloadAction<CartItem>} action - Item to delete
         */
        deleteFromCart: (state: CartSlice, action: PayloadAction<CartItem>) => {
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload.id),
                count: state.count - action.payload.count,
            };
        },

        /**
         * Updates the loading state of cart operations
         * @param {CartSlice} state - Current state
         * @param {PayloadAction<boolean>} action - New loading state
         */
        setIsLoading: (state: CartSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },

        /**
         * Resets the cart to its initial state
         * @returns {CartSlice} Initial cart state
         */
        clearCart: () => {
            return initialCartState;
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, setIsLoading, deleteFromCart, clearCart } =
    cartSlice.actions;

// Export selectors
export const selectCartSlice = (state: RootState): CartSlice => state.cart;
export const selectCartPrice = (state: RootState): number =>
    state.cart.cart.reduce((acc, product) => acc + product.price * product.count, 0);

export default cartSlice.reducer;
