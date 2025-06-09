import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { CatalogItem } from '@/types/catalog-item';
import { CatalogStore } from '@/types/stores';

const initialProductsState: CatalogStore = {
    products: [],
    isLoading: true,
};

const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        setProducts: (state: CatalogStore, action: PayloadAction<CatalogItem[]>) => {
            return {
                ...state,
                products: action.payload,
            };
        },
        setIsLoading: (state: CatalogStore, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

export const { setProducts, setIsLoading } = productsSlice.actions;

export const selectProducts = (state: RootState): CatalogStore => state.products;

export default productsSlice.reducer;
