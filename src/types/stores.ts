import { CartItem } from './cart-item';
import { CatalogItem } from './catalog-item';
import { HistoryItem } from './history-item';
import { TelegramWebAppUser } from './telegram-data';

export type CatalogSlice = {
    products: CatalogItem[] | [];
    isLoading: boolean;
};

export type HistorySlice = {
    history: HistoryItem[] | [];
    isLoading: boolean;
};

export type UserSlice = {
    userData: TelegramWebAppUser | null;
    isLoading: boolean;
};

export type CartSlice = {
    cart: CartItem[] | [];
    count: number;
    isLoading: boolean;
};

export type BaseSlice = {
    searchInputValue: string;
    isSearchInputOpen: boolean;
    isSearchInputFocused: boolean;
    isCartOpen: boolean;
};
