// src/utils/api.js

const BASE_URL = 'http://localhost:8080/api'; // Change if deploying

export const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(data && { body: JSON.stringify(data) }),
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};
