import { FC } from 'react';

import { useSelector } from 'react-redux';

import EmptyState from '@/components/app/empty-state';
import ProductListSkeleton from '@/components/skeletons/product-list-skeleton';
import ProductCard from '@/components/store/product-card';

import { searchInProduct } from '@/utils/search-in-product';

import NotFoundIcon from '~/store/not-found.svg?react';

import { CartItem } from '@/types/cart-item';
import { CatalogSlice } from '@/types/stores';

import { selectBaseSlice } from '@/slice/base-slide';
import { selectCartSlice } from '@/slice/cart-slice';
import { selectProductsSlice } from '@/slice/products-slice';

/**
 * Product list component that displays a grid of products with search and filtering.
 * Handles loading states, empty states, and cart integration.
 *
 * Features:
 * - Responsive two-column grid layout
 * - Product search functionality
 * - Loading skeleton state
 * - Empty state handling
 * - Cart status integration
 * - Dynamic product filtering
 *
 * @component
 * @returns {JSX.Element} Grid of product cards with search and filtering
 */
const ProductList: FC = () => {
    // Get data from Redux store
    const productsInfo: CatalogSlice = useSelector(selectProductsSlice);
    const productSearchValue: string = useSelector(selectBaseSlice).searchInputValue;
    const cartItems: CartItem[] = useSelector(selectCartSlice).cart;

    // Show loading skeleton while products are being fetched
    if (productsInfo.isLoading) {
        return <ProductListSkeleton />;
    }

    // Show empty state if no products available
    if (productsInfo.products.length === 0) {
        return (
            <EmptyState
                icon={<NotFoundIcon />}
                title="No products yet"
                descr="The store will be restocked with merchandise soon"
            />
        );
    }

    // Filter products based on search input
    const filteredProducts = productsInfo.products.filter((product) =>
        searchInProduct(product, productSearchValue),
    );

    // Show not found state if search yields no results
    if (filteredProducts.length === 0) {
        return (
            <EmptyState
                icon={<NotFoundIcon />}
                title="Not Found"
                descr="This style doesn’t exist"
            />
        );
    }

    return (
        <section className="grid grid-cols-2 inner-container gap-y-[28px] gap-x-[12px]">
            {filteredProducts.map((product) => (
                <ProductCard
                    key={`product-card-${product.id}`}
                    product={product}
                    isInCart={!!cartItems.find((item) => item.id === product.id)}
                />
            ))}
        </section>
    );
};

export default ProductList;
