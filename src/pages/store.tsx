import { FC } from 'react';

import Cart from '@/components/cart/cart';
import Header from '@/components/store/header';
import ProductList from '@/components/store/product-list';

/**
 * Store page component that displays the main product catalog.
 * Provides a grid layout for product browsing with cart functionality.
 *
 * Features:
 * - Product catalog header with search and filters
 * - Infinite scroll product list
 * - Shopping cart overlay
 * - Responsive grid layout
 * - Bottom padding for navigation menu
 *
 * @component
 * @returns {JSX.Element} Store page layout
 *
 * @example
 * // Use in router configuration
 * <Route path="/store" element={<Store />} />
 */
const Store: FC = () => {
    return (
        <div className="grid grid-rows-[60px_1fr] gap-[8px] w-full pb-[90px]">
            <Header />
            <ProductList />
            <Cart />
        </div>
    );
};

export default Store;
