import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import EmptyState from '@/components/app/empty-state';
import ProductButtons from '@/components/product/buttons';
import ProductHeader from '@/components/product/header';
import ProductImages from '@/components/product/images';
import ProductInfo from '@/components/product/info';

import { CatalogItem } from '@/types/catalog-item';

import { useTelegramBackButton } from '@/hooks/useTelegramBackButton';
import { selectIsMobileDevice } from '@/slice/base-slide';
import { selectProductsSlice } from '@/slice/products-slice';

/**
 * Product page component that displays detailed information about a specific product.
 * Handles product data fetching, error states, and responsive layout.
 *
 * Features:
 * - Dynamic product data loading
 * - Telegram back button integration
 * - Responsive layout for mobile/desktop
 * - Error state handling
 * - Product not found handling
 * - Product details display (header, info, images, buttons)
 *
 * @component
 * @returns {JSX.Element} Product page layout
 *
 * @example
 * // Use in router configuration
 * <Route path="/product/:id" element={<Product />} />
 */
const Product: FC = () => {
    // Get product ID from URL parameters
    const { id } = useParams();

    // Get device type and product data from Redux store
    const isMobileDevice = useSelector(selectIsMobileDevice);
    const product: CatalogItem | undefined = useSelector(selectProductsSlice).products.find(
        (product) => product.id === Number(id),
    );

    // Initialize Telegram back button
    useTelegramBackButton();

    // Handle error state (when id is 'error')
    if (id === 'error') {
        return (
            <div
                className={`flex flex-col w-full ${isMobileDevice ? 'h-[calc(100vh-80px)]' : 'h-[100vh]'}`}
            >
                <EmptyState
                    title="Not available at the moment"
                    descr="Try choosing a different product"
                />
            </div>
        );
    }

    // Handle product not found state
    if (!product) {
        return (
            <div
                className={`flex flex-col w-full ${isMobileDevice ? 'h-[calc(100vh-80px)]' : 'h-[100vh]'}`}
            >
                <EmptyState
                    title="Not available at the moment"
                    descr="Try choosing a different product"
                />
            </div>
        );
    }

    // Render product details
    return (
        <div
            className={`flex flex-col w-full ${isMobileDevice ? 'h-[calc(100vh-80px)]' : 'h-[100vh]'}`}
        >
            <ProductHeader productName={product.name} />
            <ProductInfo product={product} />
            <ProductImages imgs={product.images} productName={product.name} />
            <ProductButtons product={product} />
        </div>
    );
};

export default Product;
