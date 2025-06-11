import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ApiResponse } from '@/types/api-response';
import { CatalogItem } from '@/types/catalog-item';

import CatalogService from '@/api/services/catalogy-service';
import { selectProductsSlice, setIsProductLoading, setProducts } from '@/slice/products-slice';

/**
 * Custom hook for initializing catalog products data.
 * Fetches products data on component mount if not already loaded.
 * Uses loading state from Redux to determine if data needs to be fetched.
 *
 * Features:
 * - One-time initial data fetch based on loading state
 * - Redux state management
 * - Error handling with empty state fallback
 * - Loading state management
 * - Automatic cleanup
 *
 * @hook
 * @returns {void}
 *
 * @example
 * // Use in a component to initialize products catalog
 * function CatalogComponent() {
 *   useInitialProducts();
 *   return <div>...</div>;
 * }
 */
export const useInitialProducts = () => {
    // Get loading state and dispatch from Redux store
    const isProductsLoaded = !useSelector(selectProductsSlice).isLoading;
    const dispatch = useDispatch();

    useEffect(() => {
        // Skip if products are already loaded (based on loading state)
        if (isProductsLoaded) return;

        /**
         * Fetches initial catalog products data
         * Updates Redux store with results or empty array on error
         * Manages loading state through Redux
         */
        const handleGetInitialProductsData = async () => {
            try {
                // Fetch catalog data from API
                const res: ApiResponse<CatalogItem[]> = await CatalogService.getCatalog();
                dispatch(setProducts(res.data));
            } catch {
                // Set empty array on error
                dispatch(setProducts([]));
            } finally {
                // Always update loading state to indicate completion
                dispatch(setIsProductLoading(false));
            }
        };

        // Trigger initial data fetch
        handleGetInitialProductsData();
    }, [dispatch, isProductsLoaded]);
};
