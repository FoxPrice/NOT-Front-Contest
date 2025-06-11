import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { disableScroll, enableScroll } from '@/utils/scroll-handler';

import { RootState } from './index';

import { BaseSlice } from '@/types/stores';

const initialBaseState: BaseSlice = {
    searchInputValue: '',
    isSearchInputOpen: false,
    isSearchInputFocused: false,
    isCartOpen: false,
    isMobileDevice: false,
    isSuccessTransOpen: false,
    isFailedTransOpen: false,
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
        setIsMobileDevice: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isMobileDevice: action.payload,
            };
        },
        setIsSearchInputFocused: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isSearchInputFocused: action.payload,
            };
        },
        setIsSearchInputOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isSearchInputOpen: action.payload,
            };
        },
        setIsCartOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            if (action.payload) disableScroll();
            else enableScroll();
            return {
                ...state,
                isCartOpen: action.payload,
            };
        },
        setIsSuccessTransInputOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isSuccessTransOpen: action.payload,
            };
        },
        setIsFailedTransInputOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isFailedTransOpen: action.payload,
            };
        },
    },
});

export const {
    setSearchInputValue,
    setIsSearchInputFocused,
    setIsCartOpen,
    setIsSearchInputOpen,
    setIsMobileDevice,
    setIsSuccessTransInputOpen,
    setIsFailedTransInputOpen,
} = baseSlice.actions;

export const selectBaseSlice = (state: RootState): BaseSlice => state.base;
export const selectIsMobileDevice = (state: RootState): boolean => state.base.isMobileDevice;

export default baseSlice.reducer;
