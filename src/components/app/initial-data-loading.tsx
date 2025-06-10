import { FC, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { ApiResponse } from '@/types/api-response';
import { CatalogItem } from '@/types/catalog-item';
import { HistoryItem } from '@/types/history-item';

import CatalogService from '@/api/services/catalogy-service';
import PurchaseHistoryService from '@/api/services/purchase-history-service';
import useTheme from '@/hooks/useTheme';
import { setHistory, setIsHistoryLoading } from '@/slice/history-slice';
import { setIsProductLoading, setProducts } from '@/slice/products-slice';

const InitialDataLoading: FC = () => {
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

        const handleGetInitialHistoryData = async () => {
            try {
                const res: ApiResponse<HistoryItem[]> =
                    await PurchaseHistoryService.getPurchaseHistory();
                dispatch(setHistory(res.data));
            } catch {
                dispatch(setHistory([]));
            } finally {
                dispatch(setIsHistoryLoading(false));
            }
        };

        handleGetInitialHistoryData();
        handleGetInitialProductsData();
    }, [dispatch]);

    const { setIsDark } = useTheme();

    useEffect(() => {
        setIsDark(true);
    }, [setIsDark]);

    return <></>;
};

export default InitialDataLoading;
