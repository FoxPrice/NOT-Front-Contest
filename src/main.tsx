import { StrictMode } from 'react';

import { RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// Import styles and router configuration
import '@/styles/index.scss';
import { router } from '@/utils/router';

// Import context providers
import { TelegramWebAppProvider } from '@/context/telegram-web-app-context';
import { store } from '@/slice';

/**
 * Application entry point.
 * Initializes React application with required providers:
 * - Redux store for state management
 * - Telegram WebApp context for Telegram integration
 * - React Router for navigation
 */

// Get root element for mounting the application
const rootElement = document.getElementById('root');

// Ensure root element exists
if (!rootElement) {
    throw new Error('Root element not found');
}

// Initialize and render the application
createRoot(rootElement).render(
    <StrictMode>
        {/* Redux store provider */}
        <Provider store={store}>
            {/* Telegram WebApp context provider */}
            <TelegramWebAppProvider>
                {/* Router provider for navigation */}
                <RouterProvider router={router} />
            </TelegramWebAppProvider>
        </Provider>
    </StrictMode>,
);
