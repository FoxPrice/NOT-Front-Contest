/**
 * Represents a transaction record in purchase history.
 * Contains essential transaction details for display and tracking.
 * @property {number} timestamp - Transaction timestamp in milliseconds
 * @property {number} id - Unique transaction identifier
 * @property {number} total - Transaction total amount
 * @property {string} currency - Transaction currency (e.g., "TON")
 */
export type HistoryItem = {
    timestamp: number;
    id: number;
    total: number;
    currency: string;
};
