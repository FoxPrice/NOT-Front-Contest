import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { disableScroll, enableScroll } from '@/utils/scroll-handler';

import { RootState } from './index';

import { BaseSlice } from '@/types/stores';

/**
 * Initial state for the base slice of the Redux store.
 * Manages global UI state and device information.
 *
 * @property {string} searchInputValue - Current value of the search input
 * @property {boolean} isSearchInputOpen - Whether search input is visible
 * @property {boolean} isSearchInputFocused - Whether search input has focus
 * @property {boolean} isCartOpen - Whether shopping cart is open
 * @property {boolean} isMobileDevice - Whether the app is running on a mobile device
 * @property {boolean} isSuccessTransOpen - Whether success transaction popup is open
 * @property {boolean} isFailedTransOpen - Whether failed transaction popup is open
 */
const initialBaseState: BaseSlice = {
    searchInputValue: '',
    isSearchInputOpen: false,
    isSearchInputFocused: false,
    isCartOpen: false,
    isMobileDevice: false,
    isSuccessTransOpen: false,
    isFailedTransOpen: false,
};

/**
 * Redux slice for managing base application state.
 * Handles UI state, device detection, and global interactions.
 *
 * Features:
 * - Search input state management
 * - Cart visibility control with scroll locking
 * - Mobile device detection
 * - Transaction status popups
 * - Global UI state management
 */
const baseSlice = createSlice({
    name: 'base',
    initialState: initialBaseState,
    reducers: {
        /**
         * Updates the search input value
         * @param {BaseSlice} state - Current state
         * @param {PayloadAction<string>} action - New search value
         */
        setSearchInputValue: (state: BaseSlice, action: PayloadAction<string>) => {
            return {
                ...state,
                searchInputValue: action.payload,
            };
        },

        /**
         * Updates the mobile device detection state
         * @param {BaseSlice} state - Current state
         * @param {PayloadAction<boolean>} action - Whether device is mobile
         */
        setIsMobileDevice: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isMobileDevice: action.payload,
            };
        },

        /**
         * Updates the search input focus state
         * @param {BaseSlice} state - Current state
         * @param {PayloadAction<boolean>} action - Whether input is focused
         */
        setIsSearchInputFocused: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isSearchInputFocused: action.payload,
            };
        },

        /**
         * Updates the search input visibility state
         * @param {BaseSlice} state - Current state
         * @param {PayloadAction<boolean>} action - Whether input is visible
         */
        setIsSearchInputOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isSearchInputOpen: action.payload,
            };
        },

        /**
         * Updates the cart visibility state and manages scroll locking
         * @param {BaseSlice} state - Current state
         * @param {PayloadAction<boolean>} action - Whether cart is open
         */
        setIsCartOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            // Disable/enable scroll when cart opens/closes
            if (action.payload) disableScroll();
            else enableScroll();
            return {
                ...state,
                isCartOpen: action.payload,
            };
        },

        /**
         * Updates the success transaction popup visibility
         * @param {BaseSlice} state - Current state
         * @param {PayloadAction<boolean>} action - Whether popup is open
         */
        setIsSuccessTransInputOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isSuccessTransOpen: action.payload,
            };
        },

        /**
         * Updates the failed transaction popup visibility
         * @param {BaseSlice} state - Current state
         * @param {PayloadAction<boolean>} action - Whether popup is open
         */
        setIsFailedTransInputOpen: (state: BaseSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isFailedTransOpen: action.payload,
            };
        },
    },
});

// Export actions
export const {
    setSearchInputValue,
    setIsSearchInputFocused,
    setIsCartOpen,
    setIsSearchInputOpen,
    setIsMobileDevice,
    setIsSuccessTransInputOpen,
    setIsFailedTransInputOpen,
} = baseSlice.actions;

// Export selectors
export const selectBaseSlice = (state: RootState): BaseSlice => state.base;
export const selectIsMobileDevice = (state: RootState): boolean => state.base.isMobileDevice;

export default baseSlice.reducer;
