const API_URL = import.meta.env.VITE_API_BASE_URL;

const createFetchInstance = () => {
    const defaultOptions = {
        method: 'GET',
    };

    return async (endpoint, options = {}) => {
        const url = `${API_URL}${endpoint}`;

        if (options.method === 'GET' || !options.method) {
            delete options.body;
        }

        const mergedOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers,
            },
        };

        try {
            const res = await fetch(url, mergedOptions);

            let data;
            const contentType = res.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
                data = await res.text();
            }

            if (!res.ok) {
                throw {
                    status: res.status,
                    statusText: res.statusText,
                    data: data,
                    headers: Object.fromEntries(res.headers.entries()),
                };
            }

            return data;
        } catch (error) {
            throw error;
        }
    };
};

export const fetchInstance = createFetchInstance();
