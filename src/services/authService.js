import { postFetch } from './apiClient';

// Admin login
export const adminLogin = (credentials) => postFetch('/api/auth/login', credentials);
