import { createBrowserRouter } from 'react-router-dom';

import Product from '@/pages/product';
import Profile from '@/pages/profile';
import Store from '@/pages/store';

import MainLayout from '@/layouts/main-layout';

/* Router configuration for the application
 * Routes:
 * - / - Main store page
 * - /product/:id - Product details
 * - /profile - User profile
 * All routes use MainLayout as wrapper
 */
export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />, // Root layout
        children: [
            { index: true, element: <Store /> }, // Store page
            { path: 'product/:id', element: <Product /> }, // Product page
            { path: 'profile', element: <Profile /> }, // Profile page
        ],
        errorElement: <div>Error</div>, // Error fallback
    },
]);
