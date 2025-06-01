// src/services/jobService.js

import { apiRequest } from '../utils/api';

export const jobService = {
    // === Job List APIs ===
    getAllJobs: async (token) => {
        return await apiRequest('/jobs/jobList', 'GET', null, token);
    },
    getSavedJobs: async (token) => {
        return await apiRequest('/jobs/savedJobs', 'GET', null, token);
    },
    getAppliedJobs: async (token) => {
        return await apiRequest('/jobs/appliedJobs', 'GET', null, token);
    },

    // === Posted Job APIs ===
    getPostedJobs: async (token) => {
        return await apiRequest('/jobs/postedJobs', 'GET', null, token);
    },
    postNewJob: async (data, token) => {
        return await apiRequest('/jobs/postJob', 'POST', data, token);
    },
    updateJob: async (data, token) => {
        return await apiRequest('/jobs/updateJob', 'PUT', data, token);
    },
    deleteJob: async (data, token) => {
        return await apiRequest('/jobs/deleteJob', 'DELETE', data, token);
    },

    // === Job Actions ===
    applyJob: async (data, token) => {
        return await apiRequest('/jobs/applyJob', 'PUT', data, token);
    },
    saveJob: async (data, token) => {
        return await apiRequest('/jobs/saveJob', 'PUT', data, token);
    },
    withdrawJob: async (data, token) => {
        return await apiRequest('/jobs/withdrawJob', 'PUT', data, token);
    },
};
