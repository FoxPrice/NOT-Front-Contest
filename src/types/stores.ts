import { CartItem } from './cart-item';
import { CatalogItem } from './catalog-item';
import { HistoryItem } from './history-item';
import { TelegramWebAppUser } from './telegram-data';

/** Catalog slice state type */
export type CatalogSlice = {
    products: CatalogItem[] | [];
    isLoading: boolean;
};

/** History slice state type */
export type HistorySlice = {
    history: HistoryItem[] | [];
    isLoading: boolean;
};

/** User slice state type */
export type UserSlice = {
    userData: TelegramWebAppUser | null;
    isLoading: boolean;
};

/** Cart slice state type */
export type CartSlice = {
    cart: CartItem[] | [];
    count: number;
    isLoading: boolean;
};

/** Base slice state type for global UI state */
export type BaseSlice = {
    searchInputValue: string;
    isSearchInputOpen: boolean;
    isSearchInputFocused: boolean;
    isCartOpen: boolean;
    isMobileDevice: boolean;
    isSuccessTransOpen: boolean;
    isFailedTransOpen: boolean;
};
