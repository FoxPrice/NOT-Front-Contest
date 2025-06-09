import { AxiosResponse } from 'axios';

import { axiosInstance } from '../axios';

import { ApiResponse } from '@/types/api-response';
import { HistoryItem } from '@/types/history-item';

export default class PurchaseHistoryService {
    static getPurchaseHistory = async (): Promise<AxiosResponse<ApiResponse<HistoryItem[]>>> => {
        return await axiosInstance.get('/history.json');
    };

    static getNoPurchaseHistory = async (): Promise<AxiosResponse<ApiResponse<[]>>> => {
        return await axiosInstance.get('/no_history.json');
    };
}
