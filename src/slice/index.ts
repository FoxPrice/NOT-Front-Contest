import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart-slice';
import historyReducer from './history-slice';
import productsReducer from './products-slice';
import userReducer from './user-slice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer,
        cart: cartReducer,
        history: historyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
