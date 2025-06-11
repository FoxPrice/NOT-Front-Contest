/// <reference types="vite/client" />

interface RequestOptions extends RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
}

interface FetchError {
    status: number;
    statusText: string;
    data: unknown;
    headers: Record<string, string>;
}

const API_URL = import.meta.env.VITE_API_BASE_URL as string;

const createFetchInstance = () => {
    const defaultOptions: RequestOptions = {
        method: 'GET',
    };

    return async <T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
        const url = `${API_URL}${endpoint}`;

        if (options.method === 'GET' || !options.method) {
            delete options.body;
        }

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

            let data: T;
            const contentType = res.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                data = (await res.json()) as T;
            } else {
                data = (await res.text()) as T;
            }

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
            throw error;
        }
    };
};

export const fetchInstance = createFetchInstance();
