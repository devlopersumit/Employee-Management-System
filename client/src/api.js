import axios from 'axios';

// Use relative URL in development (uses Vite proxy) or absolute URL in production
const isDevelopment = import.meta.env.DEV;
const baseURL = isDevelopment 
    ? '/api'  // Uses Vite proxy, avoids CORS
    : 'http://localhost:5000/api';  // Change to your production API URL

export const api = axios.create({
    baseURL: baseURL,
    withCredentials: true, // required to receive/send cookies for cross-origin requests
});
