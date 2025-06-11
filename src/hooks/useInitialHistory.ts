import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ApiResponse } from '@/types/api-response';
import { HistoryItem } from '@/types/history-item';

import PurchaseHistoryService from '@/api/services/purchase-history-service';
import { setIsHistoryLoading, setHistory, selectHistorySlice } from '@/slice/history-slice';

/**
 * Custom hook for initializing purchase history data.
 * Fetches history data on component mount if not already loaded.
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
 * // Use in a component to initialize history
 * function HistoryComponent() {
 *   useInitialHistory();
 *   return <div>...</div>;
 * }
 */
export const useInitialHistory = () => {
    // Get loading state and dispatch from Redux store
    const isHistoryLoaded = !useSelector(selectHistorySlice).isLoading;
    const dispatch = useDispatch();

    useEffect(() => {
        // Skip if history is already loaded (based on loading state)
        if (isHistoryLoaded) return;

        /**
         * Fetches initial purchase history data
         * Updates Redux store with results or empty array on error
         * Manages loading state through Redux
         */
        const handleGetInitialHistoryData = async () => {
            try {
                // Fetch history data from API
                const res: ApiResponse<HistoryItem[]> =
                    await PurchaseHistoryService.getPurchaseHistory();
                dispatch(setHistory(res.data));
            } catch {
                // Set empty array on error
                dispatch(setHistory([]));
            } finally {
                // Always update loading state to indicate completion
                dispatch(setIsHistoryLoading(false));
            }
        };

        // Trigger initial data fetch
        handleGetInitialHistoryData();
    }, [dispatch, isHistoryLoaded]);
};
