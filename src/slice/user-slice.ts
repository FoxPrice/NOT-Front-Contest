import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { UserStore } from '@/types/stores';
import { TelegramWebAppUser } from '@/types/telegram-data';

const initialUserState: UserStore = {
    user: null,
    isLoading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state: UserStore, action: PayloadAction<TelegramWebAppUser>) => {
            return {
                ...state,
                user: action.payload,
            };
        },
        setIsLoading: (state: UserStore, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

export const { setUser, setIsLoading } = userSlice.actions;

export const selectUser = (state: RootState): UserStore => state.user;

export default userSlice.reducer;
