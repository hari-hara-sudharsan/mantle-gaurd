import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for elite logging or auth tokens
api.interceptors.request.use(
    (config) => {
        // Add logic here if needed (e.g., auth tokens)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for centralized error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || 'A cyber-security breach occurred... just kidding, it is an API error.';
        console.error('[API Error]:', message);
        return Promise.reject(error);
    }
);

export default api;
