import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { CatalogItem } from '@/types/catalog-item';
import { CatalogSlice } from '@/types/stores';

const initialProductsState: CatalogSlice = {
    products: [],
    isLoading: true,
};

const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        setProducts: (state: CatalogSlice, action: PayloadAction<CatalogItem[]>) => {
            return {
                ...state,
                products: action.payload,
            };
        },
        setIsProductLoading: (state: CatalogSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

export const { setProducts, setIsProductLoading } = productsSlice.actions;

export const selectProducts = (state: RootState): CatalogSlice => state.products;

export default productsSlice.reducer;
