import { createBrowserRouter } from 'react-router-dom';

import Home from '@/pages/home';
import Item from '@/pages/item';

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            { index: true, element: <Home /> },
            { path: 'item', element: <Item /> },
        ],
        errorElement: <div>Error</div>,
    },
]);
