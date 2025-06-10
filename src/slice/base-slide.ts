import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { BaseSlice } from '@/types/stores';

const initialBaseState: BaseSlice = {
    searchInputValue: '',
    isSearchInputFocused: false,
    isCartOpen: false,
};

const baseSlice = createSlice({
    name: 'base',
    initialState: initialBaseState,
    reducers: {
        setSearchInputValue: (state: BaseSlice, action: PayloadAction<string>) => {
            return {
                ...state,
                searchInputValue: action.payload,
            };
        },
        setIsSearchInputFocused: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isSearchInputFocused: action.payload,
            };
        },
        setIsCartOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isCartOpen: action.payload,
            };
        },
    },
});

export const { setSearchInputValue, setIsSearchInputFocused, setIsCartOpen } = baseSlice.actions;

export const selectBaseSlice = (state: RootState): BaseSlice => state.base;

export default baseSlice.reducer;
