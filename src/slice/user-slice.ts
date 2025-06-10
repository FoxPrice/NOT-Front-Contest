import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { UserSlice } from '@/types/stores';
import { TelegramWebAppUser } from '@/types/telegram-data';

const initialUserState: UserSlice = {
    userData: null,
    isLoading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserData: (state: UserSlice, action: PayloadAction<TelegramWebAppUser>) => {
            return {
                ...state,
                userData: action.payload,
            };
        },
        setIsUserLoading: (state: UserSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

export const { setUserData, setIsUserLoading } = userSlice.actions;

export const selectUser = (state: RootState): UserSlice => state.user;

export default userSlice.reducer;
