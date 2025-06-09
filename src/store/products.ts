import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { Product } from '@/types/product';

const initialProductsState: Product[] = [];

const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {
        setProducts: (_state: Product[], action: PayloadAction<Product[]>) => {
            return [...action.payload];
        },
    },
});

export const { setProducts } = productsSlice.actions;

export const selectProducts = (state: RootState): Product[] => state.products;

export default productsSlice.reducer;
