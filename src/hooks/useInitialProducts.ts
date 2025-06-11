import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ApiResponse } from '@/types/api-response';
import { CatalogItem } from '@/types/catalog-item';

import CatalogService from '@/api/services/catalogy-service';
import { setIsProductLoading, setProducts } from '@/slice/products-slice';

export const useInitialProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleGetInitialProductsData = async () => {
            try {
                const res: ApiResponse<CatalogItem[]> = await CatalogService.getCatalog();
                dispatch(setProducts(res.data));
            } catch {
                dispatch(setProducts([]));
            } finally {
                dispatch(setIsProductLoading(false));
            }
        };

        handleGetInitialProductsData();
    }, [dispatch]);
}; 