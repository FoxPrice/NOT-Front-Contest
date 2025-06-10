import { fetchInstance } from '../fetch';

import { ApiResponse } from '@/types/api-response';
import { HistoryItem } from '@/types/history-item';

export default class PurchaseHistoryService {
    static getPurchaseHistory = async (): Promise<ApiResponse<HistoryItem[]>> => {
        return await fetchInstance('/history.json');
    };

    static getNoPurchaseHistory = async (): Promise<ApiResponse<[]>> => {
        return await fetchInstance('/no_history.json');
    };
}
