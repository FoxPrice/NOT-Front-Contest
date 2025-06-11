/**
 * Service for handling purchase history related API operations.
 * Provides methods to fetch user's purchase history and empty history states.
 * Implements a singleton pattern with static methods for better performance
 * and to avoid unnecessary instance creation.
 */
import { fetchInstance } from '../fetch';

import { ApiResponse } from '@/types/api-response';
import { HistoryItem } from '@/types/history-item';

export default class PurchaseHistoryService {
    /**
     * Fetches the complete purchase history.
     * This method is used to simulate or handle cases where the user has purchase history.
     *
     * @returns {Promise<ApiResponse<HistoryItem[]>>} A promise that resolves to an API response
     * containing an array of history items. Each item represents a purchase transaction
     * with its details. The response is wrapped in ApiResponse type which includes
     * metadata about the request status and any potential errors.
     *
     * @example
     * // Usage example:
     * const history = await PurchaseHistoryService.getPurchaseHistory();
     * if (history.success) {
     *     const purchases = history.data;
     *     // Process purchase history
     * }
     *
     * @throws {Error} If the network request fails or the response cannot be parsed
     */
    static getPurchaseHistory = async (): Promise<ApiResponse<HistoryItem[]>> => {
        return await fetchInstance('/history.json');
    };

    /**
     * Fetches an empty purchase history state.
     * This method is used to simulate or handle cases where the user has no purchase history.
     *
     * @returns {Promise<ApiResponse<[]>>} A promise that resolves to an API response
     * containing an empty array. The response is wrapped in ApiResponse type which includes
     * metadata about the request status and any potential errors.
     *
     * @example
     * // Usage example:
     * const emptyHistory = await PurchaseHistoryService.getNoPurchaseHistory();
     * if (emptyHistory.success) {
     *     // Handle empty history state
     * }
     *
     * @throws {Error} If the network request fails or the response cannot be parsed
     */
    static getNoPurchaseHistory = async (): Promise<ApiResponse<[]>> => {
        return await fetchInstance('/no_history.json');
    };
}
