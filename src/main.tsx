import { StrictMode } from 'react';

import { RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '@/styles/index.scss';
import { router } from '@/utils/router';

import { TelegramWebAppProvider } from '@/context/telegram-web-app-context';
import { store } from '@/slice';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <TelegramWebAppProvider>
                <RouterProvider router={router} />
            </TelegramWebAppProvider>
        </Provider>
    </StrictMode>,
);
