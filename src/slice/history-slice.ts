import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { HistoryItem } from '@/types/history-item';
import { HistorySlice } from '@/types/stores';

const initialHistoryState: HistorySlice = {
    history: [],
    isLoading: true,
};

const historySlice = createSlice({
    name: 'history',
    initialState: initialHistoryState,
    reducers: {
        setHistory: (state: HistorySlice, action: PayloadAction<HistoryItem[]>) => {
            return {
                ...state,
                history: action.payload,
            };
        },
        setIsHistoryLoading: (state: HistorySlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

export const { setHistory, setIsHistoryLoading } = historySlice.actions;

export const selectHistory = (state: RootState): HistorySlice => state.history;

export default historySlice.reducer;
