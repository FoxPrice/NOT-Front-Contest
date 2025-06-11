import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './index';

import { UserSlice } from '@/types/stores';
import { TelegramWebAppUser } from '@/types/telegram-data';

/** Initial state for the user slice of the Redux store.
 * Manages user data and authentication state.
 * @property {TelegramWebAppUser | null} userData - Telegram WebApp user data
 * @property {boolean} isLoading - Loading state for user operations
 */
const initialUserState: UserSlice = {
    userData: null,
    isLoading: true,
};

/** Redux slice for managing user state.
 * Handles Telegram WebApp user data and authentication status.
 * @property {string} name - Slice name
 * @property {UserSlice} initialState - Initial state
 * @property {Object} reducers - Slice reducers
 */
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        /** Updates the user data in the store
         * @param {UserSlice} state - Current state
         * @param {PayloadAction<TelegramWebAppUser>} action - New user data
         */
        setUserData: (state: UserSlice, action: PayloadAction<TelegramWebAppUser>) => {
            return {
                ...state,
                userData: action.payload,
            };
        },

        /** Updates the loading state of user operations
         * @param {UserSlice} state - Current state
         * @param {PayloadAction<boolean>} action - New loading state
         */
        setIsUserLoading: (state: UserSlice, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload,
            };
        },
    },
});

// Export actions
export const { setUserData, setIsUserLoading } = userSlice.actions;

// Export selector
export const selectUserSlice = (state: RootState): UserSlice => state.user;

export default userSlice.reducer;
