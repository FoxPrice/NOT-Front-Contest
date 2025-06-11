import { createContext, useContext, useState } from 'react';

import { TelegramWebApp } from '@/types/telegram-data';

type TelegramWebAppContextType = {
    tg: TelegramWebApp | null;
    setTg: (tg: TelegramWebApp | null) => void;
};

export const TelegramWebAppContext = createContext<TelegramWebAppContextType>({
    tg: null,
    setTg: () => {},
});

export const useTelegramWebAppContext = () => useContext(TelegramWebAppContext);

export const TelegramWebAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tg, setTg] = useState<TelegramWebApp | null>(null);

    return (
        <TelegramWebAppContext.Provider value={{ tg, setTg }}>
            {children}
        </TelegramWebAppContext.Provider>
    );
};
