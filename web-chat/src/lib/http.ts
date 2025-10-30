import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 15000,
    });

api.interceptors.response.use(
    (r) => r,
    (err) => {
        const msg = 
            err?.response?.data?.detail ?? err?.message ?? 'An unknown error occurred';
            return Promise.reject(new Error(msg));
    }
);

export default api;