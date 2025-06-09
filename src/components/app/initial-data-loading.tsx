import { FC, useEffect } from 'react';

import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';

import { ApiResponse } from '@/types/api-response';
import { CatalogItem } from '@/types/catalog-item';

import CatalogService from '@/api/services/catalogy-service';
import useTheme from '@/hooks/useTheme';
import { setIsLoading, setProducts } from '@/slice/products-slice';

const InitialDataLoading: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleGetInitialData = async () => {
            try {
                const res: AxiosResponse<ApiResponse<CatalogItem[]>> =
                    await CatalogService.getCatalog();

                dispatch(setProducts(res.data.data));
            } catch {
                dispatch(setProducts([]));
            } finally {
                dispatch(setIsLoading(false));
            }
        };

        handleGetInitialData();
    }, [dispatch]);

    const { setIsDark } = useTheme();

    useEffect(() => {
        setIsDark(true);
    }, [setIsDark]);

    return <></>;
};

export default InitialDataLoading;
