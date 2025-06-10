import { fetchInstance } from '../fetch';

import { ApiResponse } from '@/types/api-response';
import { CatalogItem } from '@/types/catalog-item';

export default class CatalogService {
    static getCatalog = async (): Promise<ApiResponse<CatalogItem[]>> => {
        return await fetchInstance('/items.json');
    };
}
