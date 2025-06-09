import { createBrowserRouter } from 'react-router-dom';

import Item from '@/pages/product';
import Profile from '@/pages/profile';
import Store from '@/pages/store';

import MainLayout from '@/layouts/main-layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Store /> },
            { path: 'item', element: <Item /> },
            { path: 'profile', element: <Profile /> },
        ],
        errorElement: <div>Error</div>,
    },
]);
