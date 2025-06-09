import axios from 'axios';

import baseHeaders from './baseheaders';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance = axios.create({
    withCredentials: false,
    baseURL: API_URL,
    headers: baseHeaders,
});
