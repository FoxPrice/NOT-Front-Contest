import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { CatalogItem } from '@/types/catalog-item';
import { CatalogSlice } from '@/types/stores';

/**
 * Initial state for the products slice of the Redux store.
 * Manages product catalog state and loading status.
 *
 * @property {CatalogItem[]} products - Array of available products
 * @property {boolean} isLoading - Loading state for product operations
 */
const initialProductsState: CatalogSlice = {
    products: [],
    isLoading: true,
};

/**
 * Redux slice for managing product catalog state.
 * Handles product data and loading states for the store.
 *
 * Features:
 * - Product catalog management
 * - Loading state control
 * - Product data updates
 * - Initial loading state
 */
const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        /**
         * Updates the entire product catalog
         * @param {CatalogSlice} state - Current state
         * @param {PayloadAction<CatalogItem[]>} action - New product catalog data
         */
        setProducts: (state: CatalogSlice, action: PayloadAction<CatalogItem[]>) => {
            return {
                ...state,
                products: action.payload,
            };
        },

        /**
         * Updates the loading state of product operations
         * @param {CatalogSlice} state - Current state
         * @param {PayloadAction<boolean>} action - New loading state
         */
        setIsProductLoading: (state: CatalogSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

// Export actions
export const { setProducts, setIsProductLoading } = productsSlice.actions;

// Export selector
export const selectProductsSlice = (state: RootState): CatalogSlice => state.products;

export default productsSlice.reducer;
