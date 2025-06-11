/// <reference types="vite/client" />

/**
 * Extended RequestInit interface that includes optional method, headers, and body.
 * Used to type the request options for fetch calls.
 */
interface RequestOptions extends RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
}

/**
 * Custom error interface for fetch requests.
 * Provides detailed information about failed requests including
 * HTTP status, response data, and headers.
 */
interface FetchError {
    status: number; // HTTP status code
    statusText: string; // HTTP status text
    data: unknown; // Response data
    headers: Record<string, string>; // Response headers
}

/**
 * Base URL for API requests, loaded from environment variables.
 * Must be defined in .env file as VITE_API_BASE_URL
 */
const API_URL = import.meta.env.VITE_API_BASE_URL as string;

/**
 * Creates a configured fetch instance with default options and error handling.
 * The instance provides a type-safe wrapper around the native fetch API
 * with consistent error handling and response parsing.
 *
 * @returns {Function} A fetch function that accepts an endpoint and options
 */
const createFetchInstance = () => {
    /**
     * Default request options applied to all fetch calls
     */
    const defaultOptions: RequestOptions = {
        method: 'GET',
    };

    /**
     * Type-safe fetch wrapper that handles common request patterns and errors
     *
     * @template T - The expected response type
     * @param {string} endpoint - API endpoint to call
     * @param {RequestOptions} options - Optional request configuration
     * @returns {Promise<T>} Promise resolving to the response data
     * @throws {FetchError} If the request fails or returns non-2xx status
     */
    return async <T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
        const url = `${API_URL}${endpoint}`;

        // Remove body for GET requests to prevent issues with some servers
        if (options.method === 'GET' || !options.method) {
            delete options.body;
        }

        // Merge default options with provided options
        const mergedOptions: RequestOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers,
            },
        };

        try {
            const res = await fetch(url, mergedOptions);

            // Parse response based on content type
            let data: T;
            const contentType = res.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                data = (await res.json()) as T;
            } else {
                data = (await res.text()) as T;
            }

            // Handle non-2xx responses
            if (!res.ok) {
                const error: FetchError = {
                    status: res.status,
                    statusText: res.statusText,
                    data: data,
                    headers: Object.fromEntries(res.headers.entries()),
                };
                throw error;
            }

            return data;
        } catch (error) {
            // Re-throw any errors for handling by the caller
            throw error;
        }
    };
};

/**
 * Exported fetch instance with default configuration.
 * Use this instance for all API calls to ensure consistent behavior.
 */
export const fetchInstance = createFetchInstance();
