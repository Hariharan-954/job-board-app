import { apiRequest } from '../utils/api';

export const authService = {
    // User Login
    login: async (credentials) => {
        return await apiRequest('/auth/login', 'POST', {credentials});
    },
    verifyToken: async (token) => {
        return await apiRequest('/auth/verify-token', 'GET', null, token);
    },
};
