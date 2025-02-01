import axios from "axios";
import { API } from "./config";
import { store } from "../redux/store"; // You'll need to export your store

export const axiosInstance = axios.create({
    baseURL: API,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from Redux store
        const token = store.getState().auth.token;

        // If token exists, add it to the headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 unauthorized errors
        if (error.response?.status === 401) {
            store.dispatch({ type: 'LOGOUT' });
        }
        return Promise.reject(error);
    }
);