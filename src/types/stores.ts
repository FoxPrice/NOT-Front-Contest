import { CartItem } from './cart-item';
import { CatalogItem } from './catalog-item';
import { HistoryItem } from './history-item';
import { TelegramWebAppUser } from './telegram-data';

export type CatalogStore = {
    products: CatalogItem[] | [];
    isLoading: boolean;
};

export type HistoryStore = {
    history: HistoryItem[] | [];
    isLoading: boolean;
};

export type UserStore = {
    user: TelegramWebAppUser | null;
    isLoading: boolean;
};

export type CartStore = {
    cart: CartItem[] | [];
    count: number;
    isLoading: boolean;
};
