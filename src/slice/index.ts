import { configureStore } from '@reduxjs/toolkit';

import baseReducer from './base-slide';
import cartReducer from './cart-slice';
import historyReducer from './history-slice';
import productsReducer from './products-slice';
import userReducer from './user-slice';

/**
 * Redux store configuration.
 * Combines all application slices into a single store.
 *
 * Slices:
 * - base: Global UI state and device information
 * - products: Product catalog and search functionality
 * - user: User profile and authentication data
 * - cart: Shopping cart and purchase operations
 * - history: Transaction history and loading states
 *
 * @constant
 * @type {Store}
 */
export const store = configureStore({
    reducer: {
        base: baseReducer,
        products: productsReducer,
        user: userReducer,
        cart: cartReducer,
        history: historyReducer,
    },
});

/**
 * Type definition for the root state of the Redux store.
 * Represents the complete state tree of the application.
 *
 * @typedef {ReturnType<typeof store.getState>} RootState
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type definition for the Redux store dispatch function.
 * Used for type-safe dispatching of actions.
 *
 * @typedef {typeof store.dispatch} AppDispatch
 */
export type AppDispatch = typeof store.dispatch;
