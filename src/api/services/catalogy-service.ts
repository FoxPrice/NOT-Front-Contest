/**
 * Service for handling catalog-related API operations.
 * Implements a singleton pattern with static methods for better performance
 * and to avoid unnecessary instance creation.
 */
import { fetchInstance } from '../fetch';

import { ApiResponse } from '@/types/api-response';
import { CatalogItem } from '@/types/catalog-item';

export default class CatalogService {
    /**
     * Fetches the complete catalog of items from the API.
     *
     * @returns {Promise<ApiResponse<CatalogItem[]>>} A promise that resolves to an API response
     * containing an array of catalog items. The response is wrapped in ApiResponse type
     * which includes metadata about the request status and any potential errors.
     *
     * @example
     * // Usage example:
     * const catalog = await CatalogService.getCatalog();
     * if (catalog.success) {
     *     const items = catalog.data;
     *     // Process catalog items
     * }
     *
     * @throws {Error} If the network request fails or the response cannot be parsed
     */
    static getCatalog = async (): Promise<ApiResponse<CatalogItem[]>> => {
        return await fetchInstance('/items.json');
    };
}
