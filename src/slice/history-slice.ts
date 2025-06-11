import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { HistoryItem } from '@/types/history-item';
import { HistorySlice } from '@/types/stores';

/**
 * Initial state for the history slice of the Redux store.
 * Manages purchase history state and loading status.
 *
 * @property {HistoryItem[]} history - Array of completed transactions
 * @property {boolean} isLoading - Loading state for history operations
 */
const initialHistoryState: HistorySlice = {
    history: [],
    isLoading: true,
};

/**
 * Redux slice for managing purchase history state.
 * Handles transaction history data and loading states.
 *
 * Features:
 * - Transaction history management
 * - Loading state control
 * - History data updates
 * - Initial loading state
 */
const historySlice = createSlice({
    name: 'history',
    initialState: initialHistoryState,
    reducers: {
        /**
         * Updates the entire transaction history
         * @param {HistorySlice} state - Current state
         * @param {PayloadAction<HistoryItem[]>} action - New history data
         */
        setHistory: (state: HistorySlice, action: PayloadAction<HistoryItem[]>) => {
            return {
                ...state,
                history: action.payload,
            };
        },

        /**
         * Updates the loading state of history operations
         * @param {HistorySlice} state - Current state
         * @param {PayloadAction<boolean>} action - New loading state
         */
        setIsHistoryLoading: (state: HistorySlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

// Export actions
export const { setHistory, setIsHistoryLoading } = historySlice.actions;

// Export selector
export const selectHistorySlice = (state: RootState): HistorySlice => state.history;

export default historySlice.reducer;
