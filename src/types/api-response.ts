/**
 * Generic type for API responses.
 * Represents a standardized response format from the backend.
 * @template T - Type of the data payload
 * @property {boolean} ok - Indicates if the request was successful
 * @property {T} data - The response data payload
 * @property {string} [error] - Optional error message if request failed
 */
export type ApiResponse<T> = {
    ok: boolean;
    data: T;
    error?: string;
};
