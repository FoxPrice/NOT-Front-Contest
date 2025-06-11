import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ApiResponse } from '@/types/api-response';
import { HistoryItem } from '@/types/history-item';

import PurchaseHistoryService from '@/api/services/purchase-history-service';
import { setIsHistoryLoading, setHistory } from '@/slice/history-slice';

export const useInitialHistory = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleGetInitialHistoryData = async () => {
            try {
                const res: ApiResponse<HistoryItem[]> =
                    await PurchaseHistoryService.getNoPurchaseHistory();
                dispatch(setHistory(res.data));
            } catch {
                dispatch(setHistory([]));
            } finally {
                dispatch(setIsHistoryLoading(false));
            }
        };

        handleGetInitialHistoryData();
    }, [dispatch]);
}; 