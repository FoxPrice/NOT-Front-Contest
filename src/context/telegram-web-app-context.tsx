import { createContext, useContext, useState } from 'react';

import { TelegramWebApp } from '@/types/telegram-data';

/**
 * Type definition for Telegram WebApp context.
 * Provides access to Telegram WebApp instance and its setter.
 */
type TelegramWebAppContextType = {
    tg: TelegramWebApp | null;
    setTg: (tg: TelegramWebApp | null) => void;
};

/**
 * Context for Telegram WebApp integration.
 * Provides global access to Telegram WebApp instance throughout the application.
 */
export const TelegramWebAppContext = createContext<TelegramWebAppContextType>({
    tg: null,
    setTg: () => {},
});

/**
 * Custom hook to access Telegram WebApp context.
 * Provides type-safe access to Telegram WebApp instance and its setter.
 *
 * @returns {TelegramWebAppContextType} Telegram WebApp context value
 * @throws {Error} If used outside of TelegramWebAppProvider
 */
export const useTelegramWebAppContext = () => useContext(TelegramWebAppContext);

/**
 * Provider component for Telegram WebApp context.
 * Manages Telegram WebApp instance state and provides it to child components.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped with context
 * @returns {JSX.Element} Context provider with Telegram WebApp instance
 */
export const TelegramWebAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State to store Telegram WebApp instance
    const [tg, setTg] = useState<TelegramWebApp | null>(null);

    return (
        <TelegramWebAppContext.Provider value={{ tg, setTg }}>
            {children}
        </TelegramWebAppContext.Provider>
    );
};
