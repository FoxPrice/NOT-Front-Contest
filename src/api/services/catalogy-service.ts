import { AxiosResponse } from 'axios';

import { axiosInstance } from '../axios';

import { ApiResponse } from '@/types/api-response';
import { CatalogItem } from '@/types/catalog-item';

export default class CatalogService {
    static getCatalog = async (): Promise<AxiosResponse<ApiResponse<CatalogItem[]>>> => {
        return await axiosInstance.get('/items.json');
    };
}
