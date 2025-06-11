import { createBrowserRouter } from 'react-router-dom';

import Product from '@/pages/product';
import Profile from '@/pages/profile';
import Store from '@/pages/store';

import MainLayout from '@/layouts/main-layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Store /> },
            { path: 'product/:id', element: <Product /> },
            { path: 'profile', element: <Profile /> },
        ],
        errorElement: <div>Error</div>,
    },
]);
