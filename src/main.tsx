import { StrictMode } from 'react';

import { RouterProvider } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '@/styles/index.scss';
import { router } from '@/utils/router';

import { store } from '@/store';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
